import {
  BASIC_TAB,
  QUALITY_TAB,
  STRENGTH_TAB,
  SUPPORT_TAB,
  OTHERS_TAB,
} from './inner-tabs/innerTabImports';

export const PRINT_SETTINGS_TAB = {
  visible: true,
  label: 'PRINT SETTINGS',
  content: {
    component: {
      style: {
        default: {
          display: 'flex',
          'align-items': 'center',
          padding: '8px',
          'justify-content': 'space-between',
        },
        btn: {
          display: 'flex',
          'column-gap': '5px',
        },
      },
      select: [
        {
          label: 'Configurations',
          options: ['printer1', 'printer2', 'printer3'],
          selected: '',
          ariaLabel: '',
          ngModel: '',
          trigger: '',
          optionsFormat: '',
          style: {
            width: '500px',
          },
        },
      ],
      button: [
        {
          label: '',
          disabled: false,
          onClick: () => {},
          ref: 'print_setting_tab_buttons',
          schema_type: 'button',
          icon: 'delete_forever',
          ariaLabel: 'loadObjectFromQueue',
          tooltip: 'Delete slicing config',
          mui: { type: 'mini_fab', color: 'warn' },
        },
        {
          label: '',
          disabled: false,
          onClick: () => {},
          ref: 'print_setting_tab_buttons',
          schema_type: 'button',
          icon: 'content_copy',
          ariaLabel: 'removeObject',
          tooltip: 'Duplicate and save config',
          mui: { type: 'mini_fab', color: 'primary' },
        },
        {
          label: '',
          disabled: false,
          onClick: () => {},
          ref: 'print_setting_tab_buttons',
          schema_type: 'button',
          icon: 'save',
          ariaLabel: 'duplicateObject',
          tooltip: 'Save config change',
          mui: { type: 'mini_fab', color: 'primary' },
        },
      ],
      orca_config: {
        input: [{}],
        select: [{}],
      },
    },
    tabs: [BASIC_TAB, QUALITY_TAB, STRENGTH_TAB, SUPPORT_TAB, OTHERS_TAB],
  },
};
