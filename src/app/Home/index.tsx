import { View, Image } from "react-native";
import { styles } from "./styles";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* não precisamos especificar qual imagem vamos usar (2x ou 3x), o react native decide baseado no dispositivo
      https://reactnative.dev/docs/images */}
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
    </View>
  );
}
