import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
}; 

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container }>
          
          <View  style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }>

            <Image
              source = {require('../assets/image_7.jpg')}
              style = {styles.postImage}>
            </Image>

            <View style = {styles.titleContainer}>
                
                <Text style={
                    this.state.light_theme
                      ? styles.storyTitleTextLight
                      : styles.storyTitleText
                  }>
                    {this.props.post.caption}
                </Text>
            </View>

            <View style ={styles.actionContainer}>
                <View style = {styles.likeButton}>
                  <Ionicons name = {'heart'}  size = {RFValue(30)} color = {'white'} />
                    <Text style = {styles.likeText}> 12k </Text>
                </View>
            </View>

            <Image
              source = {require('../assets/image_6.jpg')}
              style = {styles.postImage}>
            </Image>

            <View style = {styles.titleContainer}>
                
                <Text style = {styles.postCaptionText}>
                    {this.props.post.caption}
                </Text>
            </View>

            <View style ={styles.actionContainer}>
                <View style = {styles.likeButton}>
                  <Ionicons name = {'heart'}  size = {RFValue(30)} color = {'white'} />
                    <Text style = {styles.likeText}> 12k </Text>
                </View>
            </View>

            <Image
              source = {require('../assets/image_5.jpg')}
              style = {styles.postImage}>
            </Image>

            <View style = {styles.titleContainer}>
                
                <Text style={
                    this.state.light_theme
                      ? styles.storyTitleTextLight
                      : styles.storyTitleText
                  }>
                    {this.props.post.caption}
                </Text>
            </View>

            <View style ={styles.actionContainer}>
                <View style = {styles.likeButton}>
                  <Ionicons name = {'heart'}  size = {RFValue(30)} color = {'white'} />
                    <Text style = {styles.likeText}> 12k </Text>
                </View>
            </View>

          </View>
           
          <Image
              source = {require('../assets/image_4.jpg')}
              style = {styles.postImage}>
            </Image>

            <View style = {styles.titleContainer}>
                
                <Text style={
                    this.state.light_theme
                      ? styles.storyTitleTextLight
                      : styles.storyTitleText
                  }>
                    {this.props.post.caption}
                </Text>
            </View>

            <View style ={styles.actionContainer}>
                <View style = {styles.likeButton}>
                  <Ionicons name = {'heart'}  size = {RFValue(30)} color = {'white'} />
                    <Text style = {styles.likeText}> 12k </Text>
                </View>
            </View>

          <Text style={{ color: "white" }}>Post Card!</Text>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  postImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  postCaptionText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
