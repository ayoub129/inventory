// import the react native components
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const DropDown = ({ getTeamData }) => {
  // the dropdown isshowen or not and the active filter state
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([
    { name: "team 1", isActive: true },
    { name: "team 2", isActive: false },
    { name: "team 3", isActive: false },
  ]);

  // check on which filter we will use and close the dropdown
  const activeFilterHandler = (item) => {
    setData((prevState) => {
      prevState.map((dataItem) => ({
        ...dataItem,
        isActive: dataItem.name === item.name,
      }));
    });
    getTeamData(item.name);
    setShowDropdown(false);
  };

  return (
    <View>
      <Pressable
        style={[
          styles.flexView,
          { flexDirection: isRtl === "ar" ? "row-reverse" : "row" },
          ({ pressed }) => pressed && styles.pressed,
        ]}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text
          style={[
            styles.text,
            {
              marginRight: isRtl === "ar" ? 0 : 5,
              marginLeft: isRtl === "ar" ? 5 : 0,
            },
          ]}
        >
          {data.map((d) => d.isActive === true && d.name)}
        </Text>
        <View style={styles.iconContainer}>
          {showDropdown ? (
            <MaterialIcons name="arrow-drop-up" size={20} color="black" />
          ) : (
            <MaterialIcons name="arrow-drop-down" size={20} color="black" />
          )}
        </View>
      </Pressable>
      {showDropdown && (
        <FlatList
          style={[
            styles.list,
            {
              width: isRtl === "ar" ? "50%" : "75%",
              marginLeft: isRtl === "ar" ? "53%" : 0,
            },
          ]}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <Pressable onPress={() => activeFilterHandler(itemData.item)}>
              {
                <Text
                  style={[
                    styles.listItem,
                    itemData.item.name ===
                      data.map((d) => d.isActive === true && d.name) &&
                      styles.activeListItem,
                  ]}
                >
                  {itemData.item.name}
                </Text>
              }
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

export default DropDown;
const styles = StyleSheet.create({
  text: {
    marginTop: 8,
  },
  iconContainer: {
    backgroundColor: "#e2e2e2",
    marginTop: 8,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  flexView: {
    alignItems: "center",
  },
  list: {
    backgroundColor: "#fff",
    borderRadius: 6,
    marginTop: 8,
  },
  listItem: {
    margin: 2,
    padding: 12,
    borderRadius: 14,
  },
  activeListItem: {
    backgroundColor: "#eee",
  },
});
