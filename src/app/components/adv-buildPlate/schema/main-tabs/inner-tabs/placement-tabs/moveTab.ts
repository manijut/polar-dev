export const MOVE_TAB = {
  visible: true,
  label: 'Move (W)',
  content: {
    component: {
      style: {
        default: {
          padding: '14px',
          display: 'flex',
          'flex-direction': 'column',
          'overflow-x': 'hidden',
          'row-gap': '10px',
        },
        slider: {},
      },
      slider: [
        {
          label: 'X-AXIS',
          labelClass: 'red-color',
          input: [
            {
              type: 'number',
              label: null,
              style: {
                display: 'flex',
                'justify-content': 'end',
              },
            },
          ],
          value: 100,
          options: {
            floor: 0,
            ceil: 200,
          },
          style: {
            display: 'flex',
            'flex-direction': 'column',
            'row-gap': '5px',
          },
        },
        {
          label: 'Y-AXIS',
          labelClass: 'green-color',
          input: [
            {
              type: 'number',
              label: null,
              style: {
                display: 'flex',
                'justify-content': 'end',
              },
            },
          ],
          value: 100,
          options: {
            floor: 0,
            ceil: 200,
          },
          style: {
            display: 'flex',
            'flex-direction': 'column',
            'row-gap': '5px',
          },
        },
        {
          label: 'Z-AXIS',
          labelClass: 'blue-color',
          input: [
            {
              type: 'number',
              label: null,
              style: {
                display: 'flex',
                'justify-content': 'end',
              },
            },
          ],
          value: 100,
          options: {
            floor: 0,
            ceil: 200,
          },
          style: {
            display: 'flex',
            'flex-direction': 'column',
            'row-gap': '5px',
          },
        },
      ],
    },
  },
};
