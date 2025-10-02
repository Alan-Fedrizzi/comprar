import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";

export function Input({ ...otherProps }: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      placeholderTextColor="#74798b"
      {...otherProps}
    />
  );
}
