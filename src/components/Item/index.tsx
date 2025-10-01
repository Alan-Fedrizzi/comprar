import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";

import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

type ItemData = {
  status: FilterStatus;
  desciption: string;
};

type Props = {
  data: ItemData;
  onRemove: () => void;
  onChangeStatus: () => void;
};

export function Item({ data, onRemove, onChangeStatus }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onChangeStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.desciption}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
}
