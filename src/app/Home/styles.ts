import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    // não especificamos unidade, reactive native decide conforme dispositivo, android usa dp e ios usa points, que são independente de densidade de px
    height: 34,
    width: 134,
  },
});
