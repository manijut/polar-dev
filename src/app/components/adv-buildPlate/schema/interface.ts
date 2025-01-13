export interface SelectComponent {
  label: string;
  options: string[];
  selected: string;
  ariaLabel: string;
  ngModel: string;
  trigger: string;
  optionsFormat: string;
  style?: object;
  class?: string;
}

export interface ButtonComponent {
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

export interface ComponentStyle {
  default: object;
  [key: string]: object;
}

export interface Component {
  style: ComponentStyle;
  select?: SelectComponent[];
  button?: ButtonComponent[];
  input?: object[];
  classes?: {
    main: string;
    innerMain: string;
    subInnerMain: string;
    [key: string]: string;
  };
  orca_config?: {
    input: object[];
    select: object[];
  };
}

export interface TabContent {
  component?: Component;
  tabs?: Tab[];
}

export interface Tab {
  visible: boolean;
  label: string;
  content: TabContent;
}

export interface Controls {
  component: Component;
  tabs: Tab[];
}

export interface UISchema {
  visuals: object;
  controls: Controls;
}

export interface UIState {
  schema: UISchema[];
  error: string | null;
}
