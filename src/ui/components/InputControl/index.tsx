import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Input, FormControl, WarningOutlineIcon, Pressable } from 'native-base';

// Interface
import { InputProps } from './InputControl.interface';

const InputControl = (props: InputProps) => {
  const { label, placeholder, type, errors, name, control, keyboardType, helperText, isReadOnly } = props;
  const [show, setShow] = useState(false);

  return (
    <FormControl isInvalid={name in errors} marginBottom='4'>
      <FormControl.Label color='white'>{label}</FormControl.Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            placeholder={placeholder}
            type={type}
            onChangeText={(val) => onChange(val)}
            h='38'
            borderRadius='8'
            value={value}
            keyboardType={keyboardType}
            isReadOnly={isReadOnly}
            InputRightElement={<Pressable onPress={() => setShow(!show)}></Pressable>}
          />
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

export default InputControl;
