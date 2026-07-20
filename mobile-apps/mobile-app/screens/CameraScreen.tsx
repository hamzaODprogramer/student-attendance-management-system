import {StatusBar} from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Button, Alert, Image} from 'react-native'
import {Camera , CameraView, CameraCapturedPicture} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker';
import { IconButton, TouchableRipple } from 'react-native-paper';
import tw from 'twrnc'
import * as FS from "expo-file-system"
import uploadClasseImage from '../functions/uploadClasseImage';
import Spinner from 'react-native-loading-spinner-overlay';

export default function CameraScreen({navigation}:any) {
  // Camera codeC
  const [image,setImage] = useState('file://')
  const [loadImage,setLoadImage] = useState(false);

  let camera : Camera
  const [startCamera,setStartCamera] = React.useState(false)
  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    if(status === 'granted'){
      setStartCamera(true)
    }else{
      Alert.alert("Access denied")
    }
  }


  useEffect(()=>{
    __startCamera()
  },[])

  const takePhoto = async () => {
    
    if(startCamera){
      const photo : CameraCapturedPicture = await camera.takePictureAsync({base64:true})
      setStartCamera(false)
      setLoadImage(true)
      const cloudinaryUrl = await uploadClasseImage(photo.uri)

      
      setImage(cloudinaryUrl)
      setStartCamera(false)

      navigation.navigate('Result',{
        imageUrl : cloudinaryUrl
      })
      setLoadImage(false)
    }
  }

  const uriToBase64 = async (uri : any) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };


  return (
    <View style={styles.container}>
      {startCamera ? (
        <>
          <CameraView
            ref={(r :any) => {
              camera = r
            }}
            style={{flex: 1,width:"100%" , justifyContent:"flex-end"}}
          >
            <View style={[tw`w-full rounded-full  flex mb-8 h-[25] justify-center items-center`,{}]}>
                <TouchableRipple borderless style={[tw`flex rounded-full border-2 border-solid w-[22] h-[22]  border-white flex-col justify-center items-center`]} rippleColor="rgba(0, 0, 0, .32)" onPress={e=>takePhoto()}>
                    <View style={[tw`w-20 h-20 flex justify-center items-center opacity-70  bg-white  rounded-full`,{}]}>
                    </View>
                </TouchableRipple>
            </View>
          </CameraView>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner
            visible={loadImage}
            textContent={'Attendez ...'}
            textStyle={styles.spinnerTextStyle}
            size={70}
            overlayColor="rgba(0,0,0,0.6)"
          />
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
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

function alert(arg0: string) {
  throw new Error('Function not implemented.')
}