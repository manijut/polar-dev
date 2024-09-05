export const REQUEST_TAB = {
  visible: true,
  label: 'REQUEST',
  content: {
    component: {
      style: {
        default: {},
      },
      classes: {
        main: 'md-padding',
        innerMain: 'row vert-padding',
        subInnerMain: 'col-xs-12 col-sm-6',
      },
      select: [
        {
          label: 'Material',
          options: ['printer1', 'printer2', 'printer3'],
          selected: '',
          ariaLabel: '',
          ngModel: '',
          trigger: '',
          optionsFormat: '',
          style: {
            width: '500px',
          },
          class: 'md-block',
        },
      ],
      input: [{}, {}],
    },
  },
};
