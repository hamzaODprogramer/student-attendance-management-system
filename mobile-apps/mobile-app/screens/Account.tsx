import { View , Text, Alert,StyleSheet,Image, ImageBackground  } from "react-native";
import { IconButton,TextInput,Button, TouchableRipple , Appbar, Icon, Portal, PaperProvider, Dialog } from "react-native-paper";
import tw from 'twrnc'
import {useFonts,Poppins_500Medium,Poppins_600SemiBold,Poppins_300Light} from '@expo-google-fonts/poppins'
import { useEffect, useState } from "react";
import { getEnseignant, sendReclamation, updateEnseignant } from "../functions/FuncEnseignant/CRUD";
import SyncStorage from "sync-storage";
import { STATE } from "../enums/global";
import { useToast } from 'react-native-toast-notifications'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function Account({navigation}:any){
    let [fontsLoaded] = useFonts({Poppins_600SemiBold,Poppins_500Medium,Poppins_300Light})
    const toast = useToast()

    const [visible, setVisible] = useState(false);
    const hideDialog = () => setVisible(false);

    const [modeSave,setModeSave] = useState<boolean>(false)
    const [enseignant,setEnseignant] = useState<EnseignantType>({} as EnseignantType)
    const [loadUpdate,setLoadUpdate] = useState<boolean>(false)
    const [refrech,setRefrech] = useState<boolean>(false)
    /*********************************** STATE VALUE *****************************************/
    const [nom,setNom] = useState<string>('')
    const [prenom,setPrenom] = useState<string>('')
    const [image,setImage] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [telephone,setTelephone] = useState<string>('')
    const [content,setContent] = useState<string>('')
    const [loadSend,setLoadSend] = useState<boolean>(false)

    useEffect(()=>{
        const fetchEnseignant = async () => {
            setPrenom(((await getEnseignant(SyncStorage.get('id'))).result?.prenom))
            setNom(((await getEnseignant(SyncStorage.get('id'))).result?.nom))
            setEmail(((await getEnseignant(SyncStorage.get('id'))).result?.email))
            setImage(((await getEnseignant(SyncStorage.get('id'))).result?.image))
            setTelephone(((await getEnseignant(SyncStorage.get('id'))).result?.telephone))
        };fetchEnseignant()
    },[refrech])

    const modifyEnseignant = async () => {
        setLoadUpdate(true)
        const data : dataResponse = await updateEnseignant({nom,prenom,email,telephone} as EnseignantType)
        if(data.state == STATE.OK){
            setModeSave(!modeSave)
            toast.show("Le compte a été mis à jour avec succès",{
                type: "success",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                successIcon : <MaterialIcons name="check" size={20} color="white" />
            })
        }else if(data.state == STATE.UNKNOW){
            setModeSave(!modeSave)
            toast.show("Le compte n'a pas été mis à jour",{
                type: "warning",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                warningIcon : <MaterialIcons name="warning-amber" size={20} color="white" />
            })
        }else{
            setModeSave(!modeSave)
            toast.show("Une erreur s'est produite dans systéme",{
                type: "danger",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                dangerIcon : <MaterialIcons name="error" size={20} color="white" /> 
            })
        }
        setRefrech(!refrech)
        setLoadUpdate(false)
    }

    const defaultImage = require('../assets/user.jpg');
    const imageSource = image.length > 0 ? { uri: image } : defaultImage;

    const envoyerReclamation = async () => {
        setLoadSend(true)
        setVisible(false)
        const data : dataResponse = await sendReclamation({content})
        if(data.state == STATE.OK){
            toast.show("La reclamation a été envoyée avec succès",{
                type: "success",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                successIcon : <MaterialIcons name="check" size={20} color="white" />
            })
        }else if(data.state == STATE.ERROR){
            toast.show("La réclamation n'a pas été envoyée avec succès",{
                type: "warning",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                warningIcon : <MaterialIcons name="warning-amber" size={20} color="white" />
            })
        }else{
            toast.show("Une erreur s'est produite dans systéme",{
                type: "danger",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                dangerIcon : <MaterialIcons name="error" size={20} color="white" /> 
            })
        }
        setLoadSend(false)
    }

    return <>
        <PaperProvider>
            <Appbar.Header  mode="small">
                <Appbar.Content titleStyle={{fontFamily:'Poppins_500Medium'}} title="Compte Personnel" mode="large" color="navy" style={{marginLeft:19}} />
                <Appbar.Action onPressIn={e=>navigation.navigate('Login')} icon={"logout"} iconColor="navy"/>
            </Appbar.Header>
            <ImageBackground blurRadius={2} style={tw`w-full flex h-52 justify-center items-center relative`}  source={require('../assets/bgest.jpg')}>

            </ImageBackground>
            <View style={tw`flex w-full rounded-t-[20] bg-white top-40 h-full  absolute flex-col  items-center`}>
                <View style={tw`w-full over flex justify-center items-center`}>
                    <View style={tw`rounded-full w-36 h-36 border-white border-solid`}>
                        <Image style={styles.imageLogoLogin} source={imageSource}/>
                    </View>
                </View>
                <View style={tw`w-[90%] mt-[-50] gap-3`}>
                    {
                        !modeSave 
                        ? <>
                            <View style={tw`flex  bg-white rounded-2xl shadow-md flex-row  items-center`}>
                                <IconButton icon={"account"} />
                                <Text style={tw`ml-5`}>{nom.length>0 ? nom+' '+prenom : '...............'}</Text>
                            </View>
                        </>
                        : <>
                            <View style={tw`flex  bg-white rounded-2xl shadow-md flex-row  items-center`}>
                                <IconButton icon={"account"} />
                                <View style={tw`w-[36%]`}>
                                    <TextInput value={nom}  onChangeText={setNom} placeholder="nom" mode="outlined" style={tw`ml-5 h-10 w-full`}/>
                                </View>
                                <View style={tw`w-[36%] ml-2`}>
                                    <TextInput value={prenom} onChangeText={setPrenom} placeholder="prénom" mode="outlined" style={tw`ml-5 h-10 w-full`}/>
                                </View>
                            </View>
                        </>
                    }
                    {
                        !modeSave 
                        ? <>
                            <View style={tw`flex  bg-white rounded-2xl shadow-md flex-row  items-center`}>
                                <IconButton icon={"email"} />
                                <Text style={tw`ml-5`}>{email.length>0 ? email : '...............'}</Text>
                            </View>
                        </>
                        : <>
                            <View style={tw`flex  bg-white rounded-2xl shadow-md flex-row  items-center`}>
                                <IconButton icon={"email"} />
                                <TextInput value={email} onChangeText={setEmail} placeholder="email" mode="outlined" style={tw`ml-5 h-10 w-[75%]`}/>
                            </View>
                        </>
                    }
                    {
                        !modeSave  
                        ? <>
                            <View style={tw`flex  bg-white rounded-2xl shadow-md flex-row  items-center`}>
                                <IconButton icon={"phone"} />
                                <Text style={tw`ml-5`}>{telephone.length>0 ? telephone : '...............'}</Text>
                            </View>
                        </>
                        : <>
                            <View style={tw`flex  bg-white rounded-2xl shadow-md flex-row  items-center`}>
                                <IconButton icon={"phone"} />
                                <TextInput value={telephone} onChangeText={setTelephone} placeholder="telephone" mode="outlined" style={tw`ml-5 h-10 w-[75%]`}/>
                            </View>
                        </>
                    }
                    {
                        modeSave
                        ?<Button icon={'content-save'} loading={loadUpdate} onPress={e=>modifyEnseignant()} mode="elevated" style={tw`py-1`}>Enregistrer</Button>
                        :<Button icon={'account-edit'} onPress={e=>setModeSave(!modeSave)} mode="elevated" style={tw`py-1`}>Modifier le compte</Button>
                    }
                    {
                    !modeSave && <Button loading={loadSend} disabled={loadSend} onPress={()=>setVisible(true)} icon="clipboard" mode="elevated" style={tw`py-1`}>
                                    envoyer une réclamation  
                                 </Button>
                    }
                </View>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Icon icon="clipboard" color="mediumpurple" size={35} />
                    <Dialog.Title style={styles.title}>Envoyer un réclamation au admin : </Dialog.Title>
                    <Dialog.Content>
                    <TextInput
                        label="Réclamation"
                        mode="outlined"
                        multiline
                        numberOfLines={5}
                        value={content}
                        onChangeText={setContent}
                    />
                    </Dialog.Content>
                    <Dialog.Actions style={tw`mr-auto`}>
                        <Button onPress={() => envoyerReclamation()}>envoyer</Button>
                        <Button onPress={() => setVisible(false)}>fermer</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </PaperProvider>
    </>
}

const styles = StyleSheet.create({
    imageLogoLogin : {
        marginTop : -75,
        width : '100%',
        height:'100%',
        borderRadius : 100,
        borderColor : 'white',
        borderWidth: 5,
        borderStyle : 'solid'
    },
    ConainerInputs : {
        gap : 20,
        marginTop : 10
    },
    Input : {
        borderRadius : 20,
        width : 300,
        color : 'navy'
    },
    Button : {
        backgroundColor : 'navy',
        borderRadius : 14,
        paddingVertical : 4,
        fontSize : 20
    },
    title: {
        fontSize : 17,
        marginTop : 10,
        fontWeight : 'bold',
        color : 'mediumpurple'
    },
})