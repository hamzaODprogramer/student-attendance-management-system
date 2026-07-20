import { View , StyleSheet, StatusBar, Image , Text, ImageBackground } from "react-native"
import tw from 'twrnc'
import { useEffect, useState } from 'react'
import { TextInput , Button } from 'react-native-paper';
import { Link } from "@react-navigation/native";
import login from "../functions/FuncAuthentication/login";
import { STATE } from "../enums/global";
import { useToast } from 'react-native-toast-notifications'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SyncStorage from "sync-storage";
export default function Login({navigation}:any){
    /********************** STATE VALUES ******************************/
    const [username,setUsername] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [loadLogin,setLoadLogin] = useState<boolean>(false)
    const toast = useToast()

    useEffect(()=>{
        async function initStorage() : Promise<void> {
            await SyncStorage.init()
        }
        initStorage()
    },[])

    const authenticate = async () => {
        setLoadLogin(true)
        const data : dataResponse = await login(username,password)

        if(data.state == STATE.OK){
            navigation.navigate('Screens')
        }else if(data.state == STATE.UNAUTHORIZED){
            toast.show("nom d'utilisateur ou mot de passe incorrect",{
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
        setLoadLogin(false)
    }

    return <>
        <StatusBar barStyle={"light-content"} />
        <ImageBackground style={tw`w-full flex h-52 justify-center items-center relative`}  source={require('../assets/bgest.jpg')}>

        </ImageBackground>
        <View style={tw`flex w-full rounded-t-[10] bg-white top-43 h-full  absolute flex-col  items-center`}>
            <Image style={styles.imageLogoLogin} source={require('../assets/est.png')}/>
            <View style={styles.ConainerInputs}>
                <TextInput
                    mode="outlined"
                    style={styles.Input}
                    label="Nom d'utilisateur"
                    theme={{colors : {primary : "navy"}}}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    mode="outlined"
                    style={styles.Input}
                    label="Mot de passe"
                    theme={{colors : {primary : "navy"}}}
                    value={password}
                    onChangeText={setPassword}
                />
                <Button loading={loadLogin} disabled={loadLogin} style={[styles.Button, loadLogin && { backgroundColor: 'rgba(0,0,0,0.1)' }]} mode="contained" onPress={() => authenticate()}>
                    {"connexion"}
                </Button>

                <Link style={{textAlign:'center',color:'navy'}} to={"/Reset"}>Mot de passe perdu ?</Link>
            </View>
        </View>        
    </>
}

const styles = StyleSheet.create({
    imageLogoLogin : {
        resizeMode : 'contain',
        width:360,
        marginTop : -90,
    },
    ConainerInputs : {
        gap : 20,
        marginTop : -100
    },
    Input : {
        borderRadius : 20,
        width : 300,
        color : 'navy'
    },
    Button : {
        backgroundColor: 'navy',
        borderRadius : 14,
        paddingVertical : 4,
        fontSize : 20
    }
})