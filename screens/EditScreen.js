import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, StyleSheet, Text, View, TextInput, TextEdit, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { API, API_CREATE, API_POSTS, } from "../constants/API";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";
import * as ImagePicker from 'expo-image-picker';



export default function EditScreen({ navigation, route }) {
  // const [post, setPost] = useState({ title: "", content: "" });
  //const [put, setPost] = useState({ title: "", content: "" });

  const [image, setImage] = useState(null);   
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPref.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };


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



  useEffect(() => {
    // getPost();
    const post = route.params.post;
    setTitle(post.title)
    setContent(post.content)
    setImage(post.image)
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
      {image && <Image source={{ uri:image }} style={{ width: 340, height: 200 }} />}
        <Text style={[styles.text, additionalStyles.label]}>AIRLINES:</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />


        <Text style={[styles.text,additionalStyles.label, ]}>
          AIRCRAFT:
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

        <Text style={styles.buttonText}>UPLOAD PHOTO</Text>
          </TouchableOpacity>
      
      </View>
    </View>
    );
    

  async function savePost() {
    const post = {
      title: title,
      content: content,
    };
    const id = route.params.post.id
    try {
      console.log(token);
      const response = await axios.put(API + API_POSTS + "/" + id, post, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      navigation.navigate("Index");
    } catch (error) {
      console.log(error);
    }
  }

  // return (
  //   <View style={styles.container}>
  //     <Text style={[styles.title, styles.text, { margin: 40 }]}>
  //       {post.title}
  //     </Text>
  //     <Text style={[styles.title, styles.text, { margin: 20 }]}>
  //       {post.content}
  //     </Text>
  //   </View>
  // );

  // return (
  //   <View style={styles.container}>
  //     <Text style={[styles.text, styles.title, { marginTop: 20 }]}>
  //        Edit Screen
  //      </Text>
  //   </View>
  // );
}

//const styles = StyleSheet.create({});

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: "Aldo-Pro",
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 15,
    color: "white",
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5,
    color: "white"
    
  },

});