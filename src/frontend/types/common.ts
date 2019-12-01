export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type InputKeyEvent = React.KeyboardEvent<HTMLInputElement>;
export interface Data {
  [key: string]: string | number | boolean | Data | Data[];
}
export interface Errors {
  [key: string]: string;
}

export interface DelProps {
  id: string;
  sessionUser?: string;
}

// export interface SessionData {
//   id?: number;
//   username?: string;
//   loggedIn: boolean;
// }
