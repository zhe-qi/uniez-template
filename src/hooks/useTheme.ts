import type { ConfigProviderThemeVars } from 'wot-design-uni';
import { ref } from 'vue';
import { ThemeModeEnum } from '@/enums/appEnum';

const theme = ref<GetEnumType<typeof ThemeModeEnum>>(ThemeModeEnum.LIGHT);
const themeVars = ref<ConfigProviderThemeVars>();

export function useTheme(vars?: ConfigProviderThemeVars) {
  vars && (themeVars.value = vars);

  function toggleTheme(mode?: GetEnumType<typeof ThemeModeEnum>) {
    theme.value = mode || (theme.value === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT);
  }

  return {
    theme,
    themeVars,
    toggleTheme,
  };
}
