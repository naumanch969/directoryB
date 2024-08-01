import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { Colors } from '@/constants/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking"

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

  useWarmUpBrowser();
  ///////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });


  ///////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({ redirectUrl: Linking.createURL("/home", { scheme: "myapp" }) });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  ///////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////
  return (
    <View style={style.mainContainer} >

      <View style={style.imageContainer} >
        <Image source={require('../assets/images/login.png')} style={style.image} />
      </View>

      <View style={style.textContainer} >
        <Text style={style.text} >Your Ultimate <Text style={{ color: Colors.PRIMARY }}>Community Business Directory</Text> App</Text>
        <Text style={style.subText} >Find your favorite business near you and post your own business to your community</Text>
        <TouchableOpacity style={style.button} onPress={onPress} >
          <Text style={style.buttonText} >Let's get started</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default LoginScreen

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#fff'
  },
  image: {
    width: 220,
    height: 380,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: '#000'
  },
  textContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    fontFamily: 'outfit-bold',
    marginTop: -20,
    backgroundColor: '#fff',
    paddingVertical: 10
  },
  subText: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.GRAY,
    fontFamily: 'outfit',
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 999,
    marginTop: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'outfit'
  }
})