interface SelectComponent {
  label: string;
  options: string[];
  selected: string;
  ariaLabel: string;
  ngModel: string;
  trigger: string;
  optionsFormat: string;
  style?: object;
}

interface ButtonComponent {
  label: string;
  disabled: boolean;
  onClick: () => void;
  ref: string;
  ariaLabel: string;
  icon?: string;
  schema_type: string;
  tooltip?: string;
  mui: { type: string; color: string };
}

interface TabContent {
  controls?: any;
}

interface Tab {
  visible: boolean;
  label: string;
  content: TabContent;
}

export interface IControls {
  component: {
    style: any;
    select: SelectComponent[];
    button: ButtonComponent[];
  };
  tabs: Tab[];
}

interface UISchema {
  visuals: object;
  controls: IControls;
}

export interface UIState {
  schema: UISchema[];
  error: string | null;
}
