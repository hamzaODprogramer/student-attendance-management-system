import {StatusBar} from 'expo-status-bar'
import React, { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image} from 'react-native'
import {Camera, CameraCapturedPicture} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  // Camera code 
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

  // Gallery Code

  const __startPickImageFromGallery = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(status === 'granted'){
      const result = await ImagePicker.launchImageLibraryAsync({
        base64 : true,
        allowsEditing : false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  }

  // worked utl = http://192.168.1.8:4000/api/test


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
            onPress={e=>getData()}
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