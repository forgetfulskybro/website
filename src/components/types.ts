export interface Theme {
  name: string;
  primary: string;
  color?: string;
}

export interface MenuItem {
  small: string;
  large: string;
}

export interface NavItem {
  name: string;
  class: string;
  src: string;
  path: string;
}
