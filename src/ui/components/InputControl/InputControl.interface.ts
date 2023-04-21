export interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  type?: 'text' | 'password';
  errors?: any;
  control: any;
  keyboardType?: any;
  helperText?: string;
  isReadOnly?: boolean;
}