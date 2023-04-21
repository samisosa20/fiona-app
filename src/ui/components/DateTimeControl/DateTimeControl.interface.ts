export interface InputProps {
  label: string;
  name: string;
  errors?: any;
  control: any;
  helperText?: string;
  mode?: 'date' | 'time' | 'datetime';
}