import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
// import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

type Props = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export function Filter({ status, isActive, ...otherProps }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          opacity: isActive ? 1 : 0.5,
        },
      ]}
      activeOpacity={0.8}
      {...otherProps}
    >
      {/* bibliotecas de ícones que o react tem out of the box */}
      {/* <AntDesign name="home" size={18} />
      <MaterialIcons name="home" size={18} /> */}
      {/* no projeto vamos usar o Lucide, que vmos instalar aqui no porjeto */}
      <StatusIcon status={status} />

      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
