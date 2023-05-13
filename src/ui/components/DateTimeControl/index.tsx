import { Controller } from 'react-hook-form';
import { Platform } from 'react-native';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControl, WarningOutlineIcon, HStack } from 'native-base';
import dayjs from 'dayjs'

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
            {Platform.OS !== 'web' ? (
              <DateTimePicker
                onChange={(event, date) => onChange(date)}
                value={value}
                mode={mode ? mode : 'date'}
                textColor='white'
              />
            ) : (
              <MobileDateTimePicker
              onChange={(date) => onChange(date)}
              value={dayjs(value)}
              className='text-white'
              />
            )}
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
