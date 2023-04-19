import { Controller } from 'react-hook-form';
import {Switch} from 'react-native';
import { FormControl, WarningOutlineIcon, HStack } from 'native-base';

// Interface
import { InputProps } from './SwitchControl.interface';

const SwitchControl = (props: InputProps) => {
  const { type, errors, name, control, helperText } = props;

  return (
    <FormControl isInvalid={name in errors} marginBottom='4'>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <HStack alignItems='center' space={4}>
            <Switch value={value} onValueChange={(v) => onChange(v)}/>
            {type === 'active' && <FormControl.Label color='white'>{value ? 'Activo' : 'Inactivo'}</FormControl.Label>}
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

export default SwitchControl;
