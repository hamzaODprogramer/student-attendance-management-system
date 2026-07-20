import {StatusBar} from 'expo-status-bar'
import React, { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image} from 'react-native'
import {Camera, CameraCapturedPicture} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';
import * as FS from "expo-file-system"

export default function App() {
  const [image,setImage] = useState('file://')
  let camera : Camera
  const [startCamera,setStartCamera] = React.useState(false)
  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    if(status === 'granted'){
      setStartCamera(true)
    }else{
      alert("Access denied")
    }
  }

  const takePhoto = async () => {
    if(startCamera){
      const photo : CameraCapturedPicture = await camera.takePictureAsync({base64:true})
      Alert.alert(photo.uri)
      setImage(photo.base64)
      setStartCamera(false)
    }
  }

  const uriToBase64 = async (uri : any) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };


  const __startPickImageFromGallery = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(status === 'granted'){
      const result = await ImagePicker.launchImageLibraryAsync({
        base64 : true,
        allowsEditing : false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })
      if (!result.canceled) {
        if(result.assets[0].type == "image"){
          setImage(result.assets[0].base64+'')
        }else{
          let base64Cible = await uriToBase64(result.assets[0].uri)
          setImage(base64Cible)
        }
      } 
    }
  }

  const getPersences = async () => {
    const response = await fetch('http://192.168.1.111:3000/getPersences',{
      method : 'POST',
      headers : { "Content-Type" : "application/json" },
      body : JSON.stringify({ image : image })
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        
          <Camera
            ref={(r :any) => {
              camera = r
            }}
            style={{flex: 1,width:"100%" , justifyContent:"flex-end"}}
          >
            <Button title='take a photo' onPress={()=>takePhoto()} />
          </Camera>
        
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={__startPickImageFromGallery}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              marginTop : 10
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take from gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>getPersences()}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              marginTop : 10
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Test Api
            </Text>
          </TouchableOpacity>
          <Image width={400} height={400} source={{uri:`data:image/jpeg;base64,${image}`}}  alt='image not upload yet'/>

        </View>
      )}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
function alert(arg0: string) {
  throw new Error('Function not implemented.')
}

