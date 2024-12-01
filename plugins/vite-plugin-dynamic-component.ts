import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { createFilter } from '@rollup/pluginutils';
import MagicString from 'magic-string';

// ! 和tailwindcss 项目使用时请勿使用任何中文路径名

interface ComponentResolverOptions {
  /**
   * 需要处理的组件配置
   * @example
   * {
   *   form: {
   *     input: '@/components/form/input.vue',
   *     radio: '@/components/form/radio.vue',
   *   },
   *   button: {
   *     primary: '@/components/button/primary.vue',
   *   },
   * }
   */
  components: Record<string, Record<string, string>>
  /**
   * 平台配置
   * @default ['app', /^mp(-.*)?$/]
   */
  platforms?: (string | RegExp)[]
  /**
   * 需要处理的文件类型
   * @default ['*.vue', '*.nvue']
   */
  include?: string[]
  /**
   * 需要排除的文件
   */
  exclude?: string[]
  /**
   * 是否启用调试模式
   * @default false
   */
  debug?: boolean
  /**
   * 解析路径
   * @default process.cwd()
   */
  resolve?: string
}

// 调试日志相关函数
function createLogger(debug: boolean) {
  const DEBUG_FILE = 'component-resolver-debug.log';
  const SEP = '*'.repeat(72);

  if (!debug) {
    return {
      reset: () => { },
      log: () => { },
      logTitle: () => { },
    };
  }

  return {
    reset: () => {
      fs.writeFileSync(
        path.join(process.cwd(), DEBUG_FILE),
        `${SEP}\n*  ${new Date().toLocaleString()}\n${SEP}\n`,
      );
    },
    log: (...args: any[]) => {
      const msgs = args.map(msg =>
        typeof msg === 'string' ? msg : JSON.stringify(msg, null, 2),
      );
      fs.appendFileSync(
        path.join(process.cwd(), DEBUG_FILE),
        `${msgs.join(' ')}\n`,
      );
    },
    logTitle: (title: string) => {
      fs.appendFileSync(
        path.join(process.cwd(), DEBUG_FILE),
        `${SEP}\n*  ${title}\n${SEP}\n`,
      );
    },
  };
}

export default function componentResolver(options: ComponentResolverOptions): Plugin {
  const {
    components,
    platforms = ['app', /^mp(-.*)?$/],
    include = ['*.vue', '*.nvue'],
    exclude,
    debug = false,
    resolve = process.cwd(),
  } = options;

  // 检查是否需要转换为 v-if/v-else-if 结构
  const shouldTransform = platforms.some((platform) => {
    if (platform instanceof RegExp) {
      return platform.test(process.env.UNI_PLATFORM || '');
    }
    return platform === process.env.UNI_PLATFORM;
  });

  const logger = createLogger(debug);
  const filter = createFilter(
    include.map(pattern => pattern.replace('*', '**/*')),
    exclude,
    { resolve },
  );

  return {
    name: 'vite-plugin-component-resolver',
    enforce: 'pre',

    buildStart() {
      logger.reset();
    },

    transform(code: string, id: string) {
      if (!filter(id)) { return; }

      // 检查是否包含需要处理的动态组件
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      const componentRegex = /(<component\s*)([^>]*?)(>[\s\S]*?<\/component>|\/>)/g;
      if (!componentRegex.test(code)) { return; }

      // 只有确认需要转换时才记录文件信息
      logger.logTitle(`Transform: ${id}`);

      const ms = new MagicString(code);
      let hasChanges = false;
      const usedComponents: Record<string, string> = {};

      code = code.replace(componentRegex, (match, start, attrs, end) => {
        let cementingName = '';
        let slotContent = '';

        // 提取 cementing 属性
        attrs = attrs.replace(/cementing="(.*?)"/, (_, name) => {
          cementingName = name;
          return '';
        });

        // 提取插槽内容，确保正确处理结束标签
        if (end.startsWith('>')) {
          const endTagIndex = end.lastIndexOf('</component>');
          slotContent = end.slice(1, endTagIndex); // 直接截取到结束标签前
        }

        // 移除已存在的 is 属性
        attrs = attrs.replace(/:is="[^"]*"/g, '').replace(/is="[^"]*"/g, '');
        attrs = attrs.trim();

        if (!cementingName || !components[cementingName]) {
          return match;
        }

        const cmps = components[cementingName];
        hasChanges = true;

        // 收集需要导入的组件
        Object.entries(cmps).forEach(([cmpName, importPath]) => {
          const componentKey = `${cementingName}_${cmpName}`;
          usedComponents[componentKey] = importPath;
        });

        if (shouldTransform) {
          // 在指定平台下使用 v-if/v-else-if 方式
          const transformedComponents = Object.entries(cmps).map(([cmpName, _], index) => {
            const componentKey = `${cementingName}_${cmpName}`;
            const directive = index === 0 ? 'v-if' : 'v-else-if';
            return `<${componentKey} ${attrs} ${directive}="$isCementing(cmp, '${cmpName}')">${slotContent}</${componentKey}>`;
          });
          return transformedComponents.join('\n');
        } else {
          const isAttr = `:is="$registeredComponents[$resolveCementing(cmp, '${cementingName}')]"`;
          return `<component ${attrs} ${isAttr}>${slotContent}</component>`;
        }
      });

      if (!hasChanges) { return; }

      // 处理脚本部分
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      code = code.replace(/(<script.*?>)(.*?)(<\/script>)/gs, (match, openScript, content, closeScript) => {
        const ms = new MagicString(content);
        const isSetup = openScript.includes('setup') || content.includes('<script setup');

        // 添加导入语句到最前面
        const imports = Object.entries(usedComponents)
          .map(([name, source]) => `import ${name} from '${source}';`)
          .join('\n');
        ms.prepend(`${imports}\n\n`);

        if (isSetup) {
          // Setup API: 在所有 import 语句之后添加辅助方法
          const lastImportIndex = content.lastIndexOf('import');
          const insertPosition = lastImportIndex !== -1
            ? content.indexOf(';', lastImportIndex) + 1
            : 0;

          const helperMethods = shouldTransform
            ? `\nconst $isCementing = (is, name) => {
        if (is.name) is = is.name
        return name === is?.replace?.(/-(\\w)/g, (_, c) => c.toUpperCase())
      };\n`
            : `\nconst $resolveCementing = (is, type) => {
        if (is.name) is = is.name
        const name = is?.replace?.(/-(\\w)/g, (_, c) => c.toUpperCase());
        return type + '_' + name;
      };

      const $registeredComponents = {
        ${Object.entries(usedComponents)
          .map(([name]) => `${name}`)
          .join(',\n  ')}
      };\n`;

          ms.appendRight(insertPosition, helperMethods);
        } else {
          // Options API: 添加组件注册和辅助方法
          const componentNames = Object.keys(usedComponents);
          const componentsDeclaration = `\ncomponents: {\n  ${componentNames.join(',\n  ')}\n},`;

          const helperMethod = shouldTransform
            ? `
  methods: {
    $isCementing(is, name) {
      if (is.name) is = is.name
      return name === is?.replace?.(/-(\\w)/g, (_, c) => c.toUpperCase())
    }
  },`
            : `
  methods: {
    $resolveCementing(is, type) {
      if (is.name) is = is.name
      const name = is?.replace?.(/-(\\w)/g, (_, c) => c.toUpperCase());
      return type + '_' + name;
    }
  },`;

          // 在 export default 后添加
          const exportDefaultIndex = content.indexOf('export default');
          if (exportDefaultIndex !== -1) {
            ms.appendRight(
              exportDefaultIndex + 'export default {'.length,
              `${componentsDeclaration}\n${helperMethod}\n`,
            );
          }
        }

        return `${openScript}${ms.toString()}${closeScript}`;
      });

      logger.log('Transformed code:', code);
      return { code, map: ms.generateMap() };
    },
  };
}
