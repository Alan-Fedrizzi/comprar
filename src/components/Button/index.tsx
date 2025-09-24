import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...otherProps }: Props) {
  return (
    // activeOpacity é a opacidade no active
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      {...otherProps}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
