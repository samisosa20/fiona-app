import { Controller } from 'react-hook-form';
import { Select, FormControl, WarningOutlineIcon, CheckIcon, Container } from 'native-base';

// Interface
import { InputProps } from './SelectControl.interface';

const SelectControl = (props: InputProps) => {
  const { label, placeholder, errors, name, control, options, helperText } = props;

  return (
    <FormControl isInvalid={name in errors} marginBottom='4'>
      <FormControl.Label color='white'>{label}</FormControl.Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            selectedValue={value}
            minWidth='200'
            accessibilityLabel={placeholder}
            placeholder={placeholder}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size='5' />,
            }}
            _actionSheet={{ useRNModal: true}}
            mt={1}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            {options?.map(v => <Select.Item label={v.label} value={v.value}  key={v.value}/>)}
          </Select>
        )}
      />
      {helperText && <FormControl.HelperText>{helperText}</FormControl.HelperText>}
      {errors && errors[name] && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
          {errors[name]?.message}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default SelectControl;
