import { REQUEST_TAB, UI_SETTINGS_TAB } from './inner-tabs/innerTabImports';

export const OPTIONS_TAB = {
  visible: true,
  label: 'OPTIONS',
  content: {
    tabs: [REQUEST_TAB, UI_SETTINGS_TAB],
  },
};
