import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { styles } from "./styles";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

const ITEMS = Array.from({ length: 100 }).map((value, index) => String(index));

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

        {/* FlatList - renderiza somente os itens que aparecem na tela, melhor para performance (já tem scroll) */}
        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Item
              data={{
                status: FilterStatus.DONE,
                desciption: item,
              }}
              onChangeStatus={() => console.log("alterar status..")}
              onRemove={() => console.log("remover..")}
            />
          )}
        />

        {/* ScrollView - renderiza todos os itens de uma só vez, mesmo os que não estão aparecendo na tela, ruim para perfomance */}
        {/* <ScrollView>
          {ITEMS.map((value) => (
            <Item
              data={{
                status: FilterStatus.DONE,
                desciption: "Café",
              }}
              onChangeStatus={() => console.log("alterar status..")}
              onRemove={() => console.log("remover..")}
              key={value}
            />
          ))}
        </ScrollView> */}
      </View>
    </View>
  );
}
