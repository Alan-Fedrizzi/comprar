import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function Home() {
  return (
    <View style={styles.container}>
      {/* não precisamos especificar qual imagem vamos usar (2x ou 3x), o react native decide baseado no dispositivo
      https://reactnative.dev/docs/images */}
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Entrar" />
      </View>

      <View style={styles.content}>
        {/* isActive já entende que é isActive={true} */}
        {/* <Filter status={FilterStatus.PENDING} isActive />
        <Filter status={FilterStatus.DONE} isActive={false} /> */}
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter status={status} isActive key={status} />
          ))}

          <TouchableOpacity style={styles.clearButton} activeOpacity={0.8}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
