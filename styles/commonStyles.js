import { TextInput, View } from "react-native";

export const commonStyles = {

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#34657f",
    justifyContent:"center",
    
  },

  button: {
    backgroundColor: '#2069e0',
    borderRadius: 55,
    width: "50%",
    alignItems: "center",
    fontFamily: "Aldo-Pro",
  },

  buttonText: {  
    fontSize: 20, 
    margin: 10,
    color: 'white',
    fontFamily: "Aldo-Pro",
    alignItems: "center",

  },

  title: {
    fontSize: 50, 
    textAlign: 'center',
    fontFamily: "Aldo-Pro",
    color: 'white',    
  },

  content: {
    fontSize: 20,
    fontFamily: "Aldo-Pro",
    
  },

  text: {
    color: "white",
    fontFamily: "Aldo-Pro",
    textAlign: "center",

  },
  textInput:{
    fontFamily: "Aldo-Pro",
    fontSize: 20,
    textAlign:"center",
    color: 'white',
    
  } ,
  
  switchText:{
    fontFamily:"Aldo-Pro",
    fontSize: 30,
    textAlign:"center",
    color: 'white',
  }
}
  
export const lightStyles = {
  
  text: {
    color: "black",
    fontFamily: "Aldo-Pro",
    fontSize: 30,
  },

  header: {
    backgroundColor: "#00205b",
    height: 100,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 40,
    color: "white",
    fontFamily: "Aldo-Pro",
  },

  headerTint: "white",
};


export const darkStyles = {
  container: {
    flex: 1,
    backgroundColor: "black",

  },

  text: {
    color: "white",
    fontFamily: "Aldo-Pro",
    fontSize: 30,
  },
  header: {
    backgroundColor: "#00205b",
    height: 100,
    shadowColor: "white",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 40,
    fontFamily:"Aldo-Pro",
    alignItems: "center",
    color: "white"
   
  },
  headerTint: "#00205b"
}