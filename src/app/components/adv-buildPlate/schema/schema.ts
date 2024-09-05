import { UIState } from './interface';
import { VISUALS } from './visualsSchema';
import { CONTROLS } from './controlsSchema';

export const initialState: UIState = {
  schema: [
    {
      visuals: VISUALS,
      controls: CONTROLS,
    },
  ],
  error: null,
};
