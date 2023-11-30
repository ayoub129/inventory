import { View, Text } from "react-native";
import React, { useState } from "react";

const CheckStock = () => {
  const [Serial_Number, setSerial_Number] = useState("");
  const [err, setErr] = useState("");

  const SerialChange = (text) => {
    setSerial_Number(text);
  };

  const CheckExist = async () => {
    const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/inventory.csv`;
    if (!filePath) {
      setErr("File Not Exist");
    } else if (!Serial_Number) {
      setErr("Port Number is Required");
    } else {
      const parseCSV = (csvString) => {
        const lines = csvString.trim().split("\n");
        const headers = lines[0].split(",");

        const data = lines.slice(1).map((line) => {
          const values = line.split(",");
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {});
        });

        return data;
      };

      const existingData = await RNFS.readFile(filePath);
      const parsedData = parseCSV(existingData);

      const result = parsedData.find(
        (item) => item.Part_Number === Serial_Number
      );

      if (result) {
        setErr("Port Number is Already Existed 1");
      } else {
        setErr("No result Found");
      }
    }
  };

  return (
    <View>
      <Image
        source={require("../assets/images/lear.png")}
        style={Styles.image}
      />
      <View>
        <Text>port number</Text>
        <TextInput onChangeText={SerialChange} value={Serial_Number} />
      </View>
      <Button onPress={CheckExist}>Search</Button>
    </View>
  );
};

export default CheckStock;
