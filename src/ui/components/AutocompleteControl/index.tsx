import { Controller } from 'react-hook-form';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { FormControl, WarningOutlineIcon, Text, View, ChevronDownIcon, CloseIcon } from 'native-base';

// Interface
import { InputProps } from './AutocompleteControl.interface';
import { Platform } from "react-native";

const AutocompleteControl = (props: InputProps) => {
  const { label, errors, name, control, options, helperText, autoCompleteFieldRef, zIndex } = props;

  return (
    <FormControl isInvalid={name in errors} marginBottom='4' style={[Platform.select({ ios: { zIndex: zIndex ?? 2 } })]}>
      <FormControl.Label color='white'>{label}</FormControl.Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <AutocompleteDropdown
            controller={controller => {autoCompleteFieldRef.current = controller}}
            debounce={600}
            clearOnFocus={false}
            closeOnBlur={false}
            closeOnSubmit={false}
            onSelectItem={(item) => onChange(item)}
            dataSet={options}
            inputContainerStyle={{
              backgroundColor: 'transparent',
              borderColor: '#525252',
              borderWidth: 1,
            }}
            textInputProps={{
              placeholder: 'Escribe aqui...',
              autoCorrect: false,
              autoCapitalize: 'none',
              placeholderTextColor: '#737373',
              style: {
                color: '#ffffff',
                fontSize: 12,
              },
            }}
            inputHeight={35}
            ChevronIconComponent={<ChevronDownIcon size={6} color="muted.400" />}
            ClearIconComponent={<CloseIcon size={4} color="muted.400" />}
            renderItem={(item, text) => <View style={{paddingVertical: 8, paddingLeft: 12}}>
              <Text style={{ color: '#000', fontWeight: '600' }}>{item.title?.split("\n ")[0]}</Text>
              {item.title?.split("\n ")[1] && <Text style={{ color: '#000', paddingLeft: 8}}>{item.title?.split("\n ")[1]}</Text>}
            </View>}
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

export default AutocompleteControl;
