import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { Input, Icon } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Logo from "../../../MyAssets/splash_logo.svg";
import { Badge } from "react-native-elements";
import { Props } from "../../types";
const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

const Plansearch = ({ navigation, route }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="chevron-left" size={40} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              marginLeft: 5,
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Search"
              placeholderTextColor="grey"
              style={[
                styles.searchBar,
                {
                  borderColor:
                    searchValue === "" ? "rgba(0,0,0, 0.2)" : "black",
                },
              ]}
              fontSize={20}
              value={searchValue}
              onChangeText={(value) => setSearchValue(value)}
            />
          </View>
        </View>
      </View>

      {/*<View style={styles.searchheader}>*/}
      {/*  <View style={styles.bar}>*/}
      {/*    <Input placeholder="Dob" style={styles.searchBar} />*/}
      {/*    <TouchableOpacity style={styles.searchbutton}>*/}
      {/*      <FontAwesome name="search" size={22} color="white" />*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*</View>*/}

      <ScrollView
        style={styles.resultscontainer}
        contentContainerStyle={styles.resultscontainerinner}
      >
        <View style={[styles.card]}>
          <Text style={{ margin: 10 }}>Some plan</Text>
        </View>

        <View style={styles.card}>
          <Text style={{ margin: 10 }}>Some plan</Text>
        </View>

        <View style={styles.card}>
          <Text style={{ margin: 10 }}>Some plan</Text>
        </View>
        <View style={styles.card}>
          <Text style={{ margin: 10 }}>Some plan</Text>
        </View>

        <View style={styles.card}>
          <Text style={{ margin: 10 }}>Some plan</Text>
        </View>
        <View style={styles.card}>
          <Text style={{ margin: 10 }}>Some plan</Text>
        </View>

        <View style={styles.card}>
          <Text style={{ margin: 10 }}>Some plan</Text>
        </View>
        <View style={styles.card}>
          <Text style={{ margin: 10 }}>Some plan</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  head: {
    height: y * 0.085,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingRight: 20,
    elevation: 5,
  },
  searchheader: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  bar: {
    flexDirection: "row",
    marginHorizontal: x * 0.1,
    marginVertical: 15,
  },
  searchbutton: {
    backgroundColor: "orange",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  searchBar: {
    paddingVertical: 5,
    color: "black",
    borderBottomWidth: 1,
  },
  resultscontainer: {
    flex: 1,
    width: x,
    // backgroundColor: "pink"
  },
  card: {
    width: x * 0.4,
    justifyContent: "flex-end",
    backgroundColor: "yellow",
    height: 250,
    borderRadius: 18,
    marginTop: 30,
    marginHorizontal: x * 0.025,
  },
  resultscontainerinner: {
    paddingHorizontal: x * 0.05,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default Plansearch;

// InputRightElement={
//     <Icon
//         as={<FontAwesome name="birthday-cake" size={35} color="grey" />}
//         _light={{ color: "grey" }}
//         size="sm"

//     />
// }
