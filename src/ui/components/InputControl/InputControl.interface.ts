export interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  type?: 'text' | 'password';
  errors?: any;
  control: any;
}
