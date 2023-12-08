import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import Button from "../components/Button";
import * as FileSystem from "expo-file-system";

const CheckStock = () => {
  const [formData, setFormData] = useState("");
  const [isExist, setIsExist] = useState("");

  const PortChange = (text) => {
    setFormData(text);
  };

  const HandlePress = async () => {
    try {
      const requestPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple(
            [
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ],
            {
              title: "You need to provide access to the file system",
              message:
                "Inventory App needs access to your storage " +
                "so you can save and read CSV files.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (
            granted["android.permission.WRITE_EXTERNAL_STORAGE"] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted["android.permission.READ_EXTERNAL_STORAGE"] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            // Use documentDirectory to get the root directory for files
            const fileUri = `${FileSystem.documentDirectory}Inventory.csv`;

            // Read existing file content
            let existingContent = "";
            try {
              existingContent = await FileSystem.readAsStringAsync(fileUri);
            } catch (readError) {
              console.warn("Error reading file:", readError);
            }

            // Parse existing content as CSV
            const existingDataArray = existingContent
              .split("\n")
              .map((row) => row.split(","));

            // Check if formData already exists
            const isExisting = existingDataArray.some(
              (row) => row[1] === formData
            );

            if (isExisting) {
              setIsExist(formData + " is Existed in the stock");
            } else {
              setIsExist(formData + " is Not Existe in the stock");
            }
          }
        } catch (err) {
          console.warn(err);
        }
      };

      requestPermission();
    } catch (error) {
      console.error("Error handling press:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/Lear.png")}
        style={Styles.image}
      />
      <View style={Styles.container}>
        <Text>port number</Text>
        <TextInput
          onChangeText={PortChange}
          value={formData}
          style={Styles.input}
        />
      </View>
      <View style={Styles.container}>
        <Button onPress={HandlePress}>Test</Button>
      </View>
      <View style={Styles.container}>
        <Text>{isExist}</Text>
      </View>
    </View>
  );
};

export default CheckStock;
const Styles = StyleSheet.create({
  image: {
    width: "80%",
    height: "80%",
    marginHorizontal: "10%",
    marginTop: 32,
    height: "25%",
  },
  dropdown: {
    marginHorizontal: "10%",
    marginBottom: 22,
  },
  input: {
    padding: 8,
    borderColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  container: {
    marginHorizontal: "10%",
  },
});
