export const UI_SETTINGS_TAB = {
  visible: true,
  label: 'UI SETTINGS',
  content: {
    component: {
      style: {
        default: {
          display: 'flex',
          'flex-direction': 'column',
          'row-gap': '10px',
        },
      },
      class: [''],
      toggle: [
        {
          label: "Always show selected object's bounding box",
        },
        {
          label: 'Show camera helper control',
        },
        {
          label: 'Show hotkeys helper',
        },
        {
          label: 'Enable hotkeys',
        },
        {
          label: 'Show object dimension in mm',
        },
      ],
    },
  },
};
