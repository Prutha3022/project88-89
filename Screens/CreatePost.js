import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      dropdownHeight: 40,
      post_id : this.props.post.key,
      post_data : this.props.post.value,
      light_theme:true,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async addStory(){
    
    if(this.state.title && this.state.description && this.state.story && this.state.moral){
    
      let storyData = {
        previewImage: this.state.previewImage,
        caption: this.state.caption,
        description: this.state.description,
        story: this.state.story,
        moral: this.state.moral,
        author: firebase.auth().currentUser.displayName,
        create_on:new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes:0,
      }

    await firebase
      .database()
      .ref('/posts/'+Math.random()
      .toString(36).slice(2))
      .set(storyData)
      .then(function (snapshot){})
    this.props.setUpdateToTrue();
    this.props.navigation.navigate('Feed')
    } else{
      Alert.alert("Error", "All Fields are required",[{text:'OK', onPress:()=> console.log("OK Pressed")}],
      {cancelable: false})  
    }

    fetchUser = () => {
      let theme;
      firebase
        .database()
        .ref('/users/' + firebase.auth().currentUser.uid)
        .on('value', function (snapshot) {
          theme = snapshot.val().current_theme;
        });
      this.setState({ light_theme: theme === 'light' ? true : false });
    };
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        image_1: require("../assets/story_image_1.jpg"),
        image_2: require("../assets/story_image_2.jpg"),
        image_3: require("../assets/story_image_3.jpg"),
        image_4: require("../assets/story_image_4.jpg"),
        image_5: require("../assets/story_image_5.jpg")
      };
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Post</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}
              ></Image>
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "Image 1", value: "image_1" },
                    { label: "Image 2", value: "image_2" },
                    { label: "Image 3", value: "image_3" },
                    { label: "Image 4", value: "image_4" },
                    { label: "Image 5", value: "image_5" }
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  dropDownStyle={{ backgroundColor: "#2f345d" }}
                  labelStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  onChangeItem={item =>
                    this.setState({
                      previewImage: item.value
                    })
                  }
                />
              <TextInput
                style={styles.inputFont}
                onChangeText={title => this.setState({ title })}
                placeholder={"Caption"}
                placeholderTextColor="white"
              />
              <View style={styles.submitButton}>
                <Button
                  onPress={() => {
                    this.addStory;
                  }}
                  title="Submit"
                  color="#841584"
                />
               </View>
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  
});
