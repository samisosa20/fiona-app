export interface Options {
  id: string;
  title: string;
}
export interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  options?: Options[];
  errors?: any;
  control: any;
  helperText?: string;
  autoCompleteFieldRef: any;
}