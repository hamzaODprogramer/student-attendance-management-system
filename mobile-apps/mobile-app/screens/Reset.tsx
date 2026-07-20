import { View , StyleSheet, StatusBar, Image , Text } from "react-native"
import tw from 'twrnc'

import { TextInput , Button } from 'react-native-paper';
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { resetAccount } from "../functions/FuncEnseignant/CRUD";
import { STATE } from "../enums/global";
import { useToast } from "react-native-toast-notifications";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Reset({navigation}:any){
    const toast = useToast()
    const [email,setEmail] = useState<string>('')
    const [loadSend,setLoadSend] = useState<boolean>(false)
    const [sended,setSended] = useState<boolean>(false)
    const recoverAccount = async () => {
        setLoadSend(true)
        const data : dataResponse = await resetAccount(email)
        if(data.state == STATE.OK){
            toast.show("les information a étè envoyer à votre email",{
                type: "success",
                placement: "bottom",
                duration: 4000,
                animationType: "slide-in",
                successIcon : <MaterialIcons name="check" size={20} color="white" />
            })
            setSended(true)
        }else if(data.state == STATE.NOT_EXISTE){
            toast.show("Cet email n'existe pas",{
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
        <StatusBar barStyle={"light-content"} />
        <View style={tw`flex w-full bg-white h-full mt-[-40px]  flex-col  justify-center items-center`}>
            <Image style={styles.imageLogoLogin} source={require('../assets/est.png')}/>
            <View style={styles.ConainerInputs}>
                <TextInput
                    mode="outlined"
                    style={styles.Input}
                    label="Email de récuperation"
                    theme={{colors : {primary : "navy"}}}
                    value={email}
                    onChangeText={setEmail}
                />
                {
                    sended
                    ?   <Button icon="keyboard-backspace" style={[styles.Button, loadSend && { backgroundColor: 'rgba(0,0,0,0.1)' }]} mode="contained" onPress={() => navigation.navigate('Login')} >
                            {"Routeur au page d'authentication"}
                        </Button>
                    :   <Button loading={loadSend} disabled={loadSend} style={[styles.Button, loadSend && { backgroundColor: 'rgba(0,0,0,0.1)' }]} mode="contained" onPress={() => recoverAccount()}>
                            {"réinitialiser"}
                        </Button>
                }
                
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    imageLogoLogin : {
        resizeMode : 'contain',
        width:360,
        marginTop : -90
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
        backgroundColor : 'navy',
        borderRadius : 14,
        paddingVertical : 4,
        fontSize : 20
        
    }
})