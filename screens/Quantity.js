import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import DropDown from "../components/DropDown";
import Button from "../components/Button";
import RNFetchBlob from "react-native-fetch-blob";

const Quantity = () => {
  const [formData, setFormData] = useState({
    Team: "",
    Part_Number: 25,
    Quantity: "",
    Date: "",
    Time: "",
  });

  const PortChange = (text) => {
    setFormData((prevState) => ({
      ...prevState,
      Part_Number: text,
    }));
  };

  const QuantityChange = (text) => {
    setFormData((prevState) => ({
      ...prevState,
      Quantity: text,
    }));
  };

  const getTeamData = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      Team: data,
    }));
  };

  const HandlePress = () => {
    setFormData((prevState) => ({
      ...prevState,
      Date: new Date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      Time: new Date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    // convert to CSV by data
    const convertToCSV = (data) => {
      // Headers of the CSV File
      const header = Object.keys(data[0]).join(",");
      // Data Handling
      const rows = data.map((item) => Object.values(item).join(","));
      return `${header}\n${rows.join("\n")}`;
    };

    async function exportToCSV(data) {
      const csvData = convertToCSV(data);

      // Create a file path
      const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/inventory2.csv`;

      const fileExists = await RNFS.exists(filePath);

      if (!fileExists) {
        // Write the CSV data to a file
        RNFetchBlob.fs
          .writeFile(filePath, csvData, "utf8")
          .then(() => {
            // CSV file created successfully, you can do further actions like sharing or displaying a success message.
            console.log("CSV file created successfully:", filePath);
          })
          .catch((error) => {
            console.error("Error creating CSV file:", error);
          });
      } else {
        // Append new data to the file
        await RNFS.appendFile(filePath, csvData, "utf8");
      }
    }

    exportToCSV(formData);
  };

  return (
    <View>
      <Image
        source={require("../assets/images/lear.png")}
        style={Styles.image}
      />
      <View>
        <Text>Team</Text>
        <DropDown getTeamData={getTeamData} />
      </View>
      <View>
        <Text>port number</Text>
        <TextInput onChangeText={PortChange} value={formData.Part_Number} />
      </View>
      <View>
        <Text>Serial Number</Text>
        <TextInput onChangeText={QuantityChange} value={formData.Quantity} />
      </View>
      <Button onPress={HandlePress}>Save</Button>
    </View>
  );
};

export default Quantity;
const Styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
