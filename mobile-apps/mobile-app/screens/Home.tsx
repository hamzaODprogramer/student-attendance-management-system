import { View , Text, ImageBackground, ScrollView, TouchableOpacity  } from "react-native";
import { IconButton, MD3Colors, TouchableRipple , Appbar , PaperProvider, Portal, Dialog, Button, Divider } from "react-native-paper";
import tw from 'twrnc'
import {useFonts,Poppins_500Medium,Poppins_600SemiBold} from '@expo-google-fonts/poppins'
import { useCallback, useEffect, useRef, useState } from "react";
import ListItemClass from "../components/ListItemClass";
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { getClasses } from "../functions/FuncClasse/CRUD";
import LoadingClass from "../components/LoadingClass";
import SyncStorage from "sync-storage";
import * as ImagePicker from 'expo-image-picker';
import uploadClasseImage from "../functions/uploadClasseImage";
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet , Alert } from "react-native";
import { useToast } from 'react-native-toast-notifications'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function Home({navigation}:any){
    const toast = useToast()

    let [fontsLoaded] = useFonts({})
    const [visible, setVisible] = useState(false);
    const [loadImage,setLoadImage] = useState(false);

    const showDialog = () => setVisible(true);
   
    const hideDialog = () => {setVisible(false);navigation.navigate('Students')};
    

    const [visible1, setVisible1] = useState(false);

    const showDialog1 = () => setVisible1(true);
  
    const hideDialog1 = () => {setVisible1(false)};

    /****************************** STATE VALUES ******************************/
    const [classes,setClasses] = useState<ClasseType[]>([])
    const [loadClasses,setLoadClasses] = useState<boolean>(true)

    useEffect(()=>{
        sheetRef.current?.close()
        const fetchClasses = async () => { setClasses((await getClasses()).result); setLoadClasses(false)}
        fetchClasses()
    },[])


    const __startPickImageFromGallery = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        setLoadImage(true)
        if(status === 'granted'){
            const result = await ImagePicker.launchImageLibraryAsync({
                base64 : true,
                allowsEditing : false,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            })
            setLoadImage(false)
            if (!result.canceled) {
                setLoadImage(true)
                const cloudinaryUrl = await uploadClasseImage(result.assets[0].uri)
                navigation.navigate('Result',{
                    imageUrl : cloudinaryUrl
                })
                setLoadImage(false)
            }else{
                toast.show("Une erreur s'est produite dans systéme",{
                type: "danger",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                dangerIcon : <MaterialIcons name="error" size={20} color="white" /> 
            })
            }
        }else{
            toast.show("Une erreur s'est produite dans systéme",{
                type: "danger",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                dangerIcon : <MaterialIcons name="error" size={20} color="white" /> 
            })
        }
    }

    const sheetRef = useRef<BottomSheetMethods>(null);

    return <>

        <Appbar.Header  mode="small">
            <Appbar.Content titleStyle={{ fontFamily: 'Poppins_500Medium' }} title="Acceuil" mode="large" color="navy" style={{marginLeft:19}} />
            <Appbar.Action onPressIn={e=>navigation.navigate('Login')} icon={"logout"} iconColor="navy"/>
        </Appbar.Header>
        <PaperProvider>
            <Spinner
                visible={loadImage}
                textContent={'Attendez ...'}
                textStyle={styles.spinnerTextStyle}
                size={70}
                overlayColor="rgba(0,0,0,0.6)"
            />
            <View style={tw`flex flex-col justify-center items-center h-full gap-y-6 `}>
                <TouchableRipple style={tw`w-[88%]  h-[200px] rounded-full`} rippleColor="rgba(0, 0, 0, .32)" onPress={e=>showDialog()}>
                    <ImageBackground  borderRadius={20} source={require('../assets/bgstudents.jpg')} style={tw`w-full h-full overflow-hidden rounded-3xl`}>
                        <View style={[{overflow:'hidden',paddingHorizontal:15,paddingVertical:20,position:'absolute',width:'100%',bottom:0,backgroundColor:'linear-gradient(120deg,rgba(0, 0, 0, 0.55),transparent)'}]}>
                            <View style={tw`flex flex-col`}>
                                <Text style={[tw`text-white text-lg`,{}]}>Liste des étudiants</Text>
                                <Text style={[tw`text-white text-sm font-light`,{fontFamily:'Poppins_300Light'}]}>Afficher les listes d'étudiants</Text>
                            </View>
                            <IconButton
                                style={[tw`absolute`,{right:19,top:10}]}
                                icon="arrow-right-circle"
                                iconColor={MD3Colors.primary90}
                                size={42}
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
                    </ImageBackground>
                </TouchableRipple>
                <TouchableRipple style={tw`w-[88%]  h-[200px] rounded-full`} rippleColor="rgba(0, 0, 0, .32)" onPress={e=>showDialog1()}>
                    <ImageBackground  borderRadius={20} source={require('../assets/bgdetect.jpg')} style={tw`w-full h-full overflow-hidden rounded-3xl`}>
                        <View style={[{overflow:'hidden',paddingHorizontal:15,paddingVertical:20,position:'absolute',width:'100%',bottom:0,backgroundColor:'linear-gradient(120deg,rgba(0, 0, 0, 0.55),transparent)'}]}>
                            <View style={tw`flex flex-col`}>
                                <Text style={[tw`text-white text-lg`,{}]}>Détecter l'absence</Text>
                                <Text style={[tw`text-white text-sm font-light`,{fontFamily:'Poppins_300Light'}]}>Utilisez la caméra pour détecter</Text>
                            </View>
                            <IconButton
                                style={[tw`absolute`,{right:19,top:10}]}
                                icon="arrow-right-circle"
                                iconColor={MD3Colors.primary90}
                                size={42}
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
                    </ImageBackground>
                </TouchableRipple>
            </View>

            <Portal>
                <Dialog  visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Sélectionner un classe</Dialog.Title>
                    <Dialog.Content style={tw`w-[100%] p-0`}>
                        <ScrollView style={tw`pb-3 mb-3 mx-3 mt-3 h-72`}>
                            {
                                loadClasses
                                ? <LoadingClass />
                                : classes.map((classe:ClasseType,index:any)=>{
                                    return <TouchableRipple 
                                                key={index}
                                                borderless 
                                                style={tw`rounded-2xl w-full mb-2`} 
                                                onPress={() => {SyncStorage.set('classeCameraNumero',classe.numero);SyncStorage.set('classeCameraId',classe._id);sheetRef.current?.open();hideDialog()}} 
                                                rippleColor="rgba(0, 0, 0, .32)"
                                            >
                                                <ListItemClass key={index} title={classe.numero || '...'} filiere={classe.filiere?.nom || '...'}/>
                                            </TouchableRipple>
                                })
                            }
                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>fermer</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Portal>
                <Dialog  visible={visible1} onDismiss={hideDialog1}>
                    <Dialog.Title>Sélectionner un classe</Dialog.Title>
                    <Dialog.Content style={tw`w-[100%] p-0`}>
                        <ScrollView style={tw`pb-3 mb-3 mx-3 mt-3 h-72`}>
                            {
                                loadClasses
                                ? <LoadingClass />
                                : classes.map((classe:ClasseType,index:any)=>{
                                    return <TouchableRipple 
                                                key={index}
                                                borderless 
                                                style={tw`rounded-2xl w-full mb-2`} 
                                                onPress={() => {SyncStorage.set('classeCameraNumero',classe.numero);SyncStorage.set('classeCameraId',classe._id);sheetRef.current?.open();hideDialog1()}} 
                                                rippleColor="rgba(0, 0, 0, .32)"
                                            >
                                                <ListItemClass key={index} title={classe.numero || '...'} filiere={classe.filiere?.nom || '...'}/>
                                            </TouchableRipple>
                                })
                            }
                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {hideDialog1()}}>fermer</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <BottomSheet ref={sheetRef} style={tw`h-32`}>
                <TouchableRipple onPress={()=>navigation.navigate('CameraScreen')}>
                    <View style={[tw`flex-row pl-4 items-center`,{}]}>
                        <IconButton icon="camera" iconColor="navy" size={30}/>
                        <Text style={[tw`text-lg opacity-70`,{color:'navy'}]}>Prendre une photo</Text>
                    </View>
                </TouchableRipple>
                <Divider />
                <TouchableRipple onPress={()=>__startPickImageFromGallery()}>
                    <View style={[tw`flex-row pl-4 items-center`,{}]}>
                        <IconButton icon="view-gallery" iconColor="navy" size={30}/>
                        <Text style={[tw`text-lg opacity-70`,{color:'navy'}]}>Galerie de photos</Text>
                    </View>
                </TouchableRipple>
                <Divider />
                <TouchableRipple onPress={()=>sheetRef.current?.close()}>
                    <View style={[tw`flex-row pl-4 items-center`,{}]}>
                        <IconButton icon="close" iconColor="navy" size={30}/>
                        <Text style={[tw`text-lg opacity-70`,{color:'navy'}]}>Annuler</Text>
                    </View>
                </TouchableRipple>
            </BottomSheet>
        </PaperProvider>
    </>
}
const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.9)'
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
  });