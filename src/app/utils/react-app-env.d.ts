/// <reference types="react-scripts" />

declare type A = any;
declare type Guid = string;
declare type DateTime = string;
declare type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
declare type valueof<T> = T[keyof T];
declare interface Window {
  context?: any;
}
