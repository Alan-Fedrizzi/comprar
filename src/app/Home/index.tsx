import { useState, useEffect } from "react";
import {
  Alert,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { styles } from "./styles";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

// const ITEMS = [
//   {
//     id: "1",
//     status: FilterStatus.DONE,
//     description: "Comprar café... quiero café...",
//   },
//   {
//     id: "2",
//     status: FilterStatus.PENDING,
//     description: "fazer coisas..",
//   },
//   {
//     id: "3",
//     status: FilterStatus.DONE,
//     description: "Comprar e tal..",
//   },
//   {
//     id: "4",
//     status: FilterStatus.PENDING,
//     description: "lavanderia",
//   },
// ];

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAddItems() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    // setItems((prevState) => [...prevState, newItem]);
    await itemsStorage.add(newItem);
    // abaixo, voltamos o filtro para pending, o que vai disparar o useEffect, e varregar os itens pendentes, isso funciona só qd estamos em comprados e adicionamos um item
    // para garantir, deixamos getItemsByStatus
    await getItemsByStatus();
    setFilter(FilterStatus.PENDING);
    Alert.alert("Adicionar", `Adicionado ${description}`);
    setDescription("");
  }

  async function getItemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      await itemsStorage.remove(id);
      await getItemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover o item.");
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos os itens?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => onClear(),
      },
    ]);
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await getItemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Alterar Item", "Não foi possível alterar o status do item.");
    }
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Limpar", "Não foi possível limpar a lista.");
    }
  }

  useEffect(() => {
    // itemsStorage.get().then(response => console.log(response));
    getItemsByStatus();
  }, [filter]);

  return (
    <View style={styles.container}>
      {/* não precisamos especificar qual imagem vamos usar (2x ou 3x), o react native decide baseado no dispositivo
      https://reactnative.dev/docs/images */}
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={description} // para funcionar o clear
          onChangeText={setDescription}
          // onChangeText={(value) => setDescription(value)}
        />

        <Button title="Acicionar" onPress={handleAddItems} />
      </View>

      <View style={styles.content}>
        {/* isActive já entende que é isActive={true} */}
        {/* <Filter status={FilterStatus.PENDING} isActive />
        <Filter status={FilterStatus.DONE} isActive={false} /> */}
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              status={status}
              isActive={status === filter}
              key={status}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity
            style={styles.clearButton}
            activeOpacity={0.8}
            onPress={handleClear}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList - renderiza somente os itens que aparecem na tela, melhor para performance (já tem scroll) */}
        <FlatList
          // data={[]}
          // data={ITEMS}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onChangeStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item cadastrado</Text>
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
