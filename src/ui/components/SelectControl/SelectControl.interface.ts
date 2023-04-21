export interface Options {
  value: string;
  label: string;
}
export interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  options?: Options[];
  errors?: any;
  control: any;
  helperText?: string;
}