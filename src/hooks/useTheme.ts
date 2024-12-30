import type { ConfigProviderThemeVars } from 'wot-design-uni';
import { ThemeModeEnum } from '@/enums/appEnum';
import { ref } from 'vue';

const theme = ref<ThemeModeEnum>(ThemeModeEnum.LIGHT);
const themeVars = ref<ConfigProviderThemeVars>();

export function useTheme(vars?: ConfigProviderThemeVars) {
  vars && (themeVars.value = vars);

  function toggleTheme(mode?: ThemeModeEnum) {
    theme.value = mode || (theme.value === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT);
  }

  return {
    theme,
    themeVars,
    toggleTheme,
  };
}
