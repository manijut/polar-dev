import { IControls } from './interface';
import { OPTIONS_TAB } from './main-tabs/optionsTabSchema';
import { PLACEMENT_TAB } from './main-tabs/placementTabSchema';
import { PRINTER_TAB } from './main-tabs/printerTabSchema';
import { PRINT_SETTINGS_TAB } from './main-tabs/printSettingTabSchema';

export const CONTROLS: IControls = {
  component: {
    style: {
      default: {
        display: 'flex',
        'align-items': 'center',
        width: '100%',
        'column-gap': '5px',
      },
    },
    select: [
      {
        label: 'select printer',
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
        label: 'PRINT',
        disabled: false,
        onClick: () => {},
        ref: 'print_button',
        schema_type: 'button',
        ariaLabel: 'print',
        mui: { type: 'raised', color: 'primary' },
      },
    ],
  },
  tabs: [PLACEMENT_TAB, PRINT_SETTINGS_TAB, PRINTER_TAB, OPTIONS_TAB],
};
