import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import DropDown from "../components/DropDown";
import Button from "../components/Button";
import * as FileSystem from "expo-file-system";

const Serial = () => {
  const [formData, setFormData] = useState({
    Team: "",
    Part_Number: "",
    Serial_number: "",
    Date: "",
    Time: "",
  });

  const PortChange = (text) => {
    setFormData((prevState) => ({
      ...prevState,
      Part_Number: text,
    }));
  };

  const SerialChange = (text) => {
    setFormData((prevState) => ({
      ...prevState,
      Serial_number: text,
    }));
  };

  const getTeamData = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      Team: data,
    }));
  };

  const HandlePress = async () => {
    try {
      setFormData((prevState) => ({
        ...prevState,
        Date: new Date().toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
        Time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      // convert to CSV by data
      const convertToCSV = (data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        const header = Object.keys(dataArray[0]).join(",");
        const rows = dataArray.map((item) => Object.values(item).join(","));
        return `${header}\n${rows.join("\n")}`;
      };

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

            // Check if the file is empty or contains headers
            const isFileEmpty = existingContent.trim() === "";
            const containsHeaders =
              existingContent.startsWith(
                "Team,Part_Number,Serial_number,Date,Time"
              ) ||
              existingContent.includes(
                "\nTeam,Part_Number,Serial_number,Date,Time"
              );

            // Append new data without headers if they are already present
            const newDataWithoutHeaders = convertToCSV(formData)
              .split("\n")
              .slice(1)
              .join("\n");

            const updatedContent =
              isFileEmpty || !containsHeaders
                ? `${existingContent}${convertToCSV(formData)}`
                : `${existingContent}\n${newDataWithoutHeaders}`;

            try {
              await FileSystem.writeAsStringAsync(fileUri, updatedContent);
              console.log("File updated or created successfully.");
            } catch (writeError) {
              console.error("Error writing to file:", writeError);
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
      <View style={Styles.dropdown}>
        <Text>Team</Text>
        <DropDown getTeamData={getTeamData} />
      </View>
      <View style={Styles.container}>
        <Text>port number</Text>
        <TextInput
          onChangeText={PortChange}
          value={formData.Part_Number.toString()}
          style={Styles.input}
        />
      </View>
      <View style={Styles.container}>
        <Text>Serial number</Text>
        <TextInput
          onChangeText={SerialChange}
          value={formData.Serial_number}
          style={Styles.input}
        />
      </View>
      <View style={Styles.container}>
        <Button onPress={HandlePress}>Save</Button>
      </View>
    </View>
  );
};

export default Serial;
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
