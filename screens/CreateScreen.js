import axios from "axios";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity,View,} from "react-native";
import { useSelector } from "react-redux";
import { API, API_CREATE } from "../constants/API";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import * as ImagePicker from 'expo-image-picker';

export default function CreateScreen({ navigation }) {
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPref.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };
  const [image, setImage] = useState(null);   
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  async function savePost() {
    const post = {
      title: title,
      content: content,
      image: image,
    };
    try {
      console.log(token);
      const response = await axios.post(API + API_CREATE, post, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      navigation.navigate("Index", { post: post });
    } catch (error) {
      console.log(error);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };











  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
      {image && <Image source={{ uri:image }} style={{ width: 330, height: 200 }} />}
        <Text style={[additionalStyles.label, styles.text]}>G-BLOG TITLE:</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>
          G-BLOG CONTENT:
        </Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={savePost}
        >
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button,{ marginTop: 20}]}
          onPress={pickImage}>

          <Text style={styles.buttonText}>UPLOAD</Text>
          </TouchableOpacity>

      </View>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    fontFamily: "Aldo-Pro",   
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 15,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
  },

});