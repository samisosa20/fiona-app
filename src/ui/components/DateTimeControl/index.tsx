import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, WarningOutlineIcon, HStack } from 'native-base';

// Interface
import { InputProps } from './DateTimeControl.interface';

const DateTimeControl = (props: InputProps) => {
  const { errors, name, control, helperText, label, mode } = props;

  return (
    <FormControl isInvalid={name in errors} marginBottom='4'>
      <FormControl.Label color='white'>{label}</FormControl.Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <HStack alignItems='center' space={4}>
            <DateTimePicker onChange={(event, date) => onChange(date)} value={value} mode={mode ? mode : 'date'}  textColor="white"/>
          </HStack>
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

export default DateTimeControl;
