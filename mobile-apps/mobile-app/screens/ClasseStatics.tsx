import { SafeAreaView, Text, View } from "react-native"
import { Button, IconButton, PaperProvider } from "react-native-paper"
import tw from 'twrnc'
import { LineChart } from 'react-native-chart-kit'
import {useFonts,Poppins_500Medium,Poppins_300Light} from '@expo-google-fonts/poppins'
import React, { useEffect, useState } from "react"
import { getCountStudents, getStaticsStudents } from "../functions/FuncClasse/CRUD"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SyncStorage from "sync-storage"

export default function ClasseStatic(){
    let [fontsLoaded] = useFonts({Poppins_500Medium,Poppins_300Light})
    const [date, setDate] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = async (d: string) => {
        setDate(new Date(d).toISOString().split('T')[0]);
        hideDatePicker();
    };

    /************************* STATE VALUE **************************/
    const [countStudents,setCountStudents] = useState<number>(0)
    const [absences,setAbsences] = useState<number[]>([0,0,0,0,0,0,0])

    useEffect(()=>{
        const fetchCountStudents = async () => {
            const nb = await getCountStudents()
            setCountStudents(nb)
        };fetchCountStudents()
    },[])

    useEffect(()=>{
        const fetchStaticAbsence = async () => {
            const abs : number[] = await getStaticsStudents(date)
            setAbsences(abs)
        };fetchStaticAbsence()
    },[date])

    return <>
    <PaperProvider >
        <View>
            <View style={tw`rounded-xl shadow-sm flex flex-row items-center mx-3 px-7 mt-5 bg-white`}>
                <View style={tw`mr-auto`}>
                    <Text style={[tw`text-lg  font-extralight`,{fontFamily:'Poppins_500Medium',color:'navy'}]}>Etudiants</Text>
                    <Text style={tw`text-black/55 font-extrabold text-[5]`}>{ countStudents }</Text>
                </View>
                <IconButton iconColor="navy" icon={"account-group"} size={50}/>
            </View>
            <View style={tw`rounded-xl shadow-sm flex flex-row items-center mx-3 px-7 mt-3 bg-white`}>
                <View style={tw`mr-auto`}>
                    <Text style={[tw`text-lg  font-extralight`,{fontFamily:'Poppins_500Medium',color:'navy'}]}>Enseignant</Text>
                    <Text style={tw`text-black/55 font-extrabold text-[5]`}>{ (SyncStorage.get('name'))}</Text>
                </View>
                <IconButton iconColor="navy" icon={"account-tie"} size={50}/>
            </View>
            <SafeAreaView style={tw`w-full flex flex-col justify-center items-center mt-8`}>
                <View style={tw`w-full pl-4`}>
                    <Text style={[tw`text-lg opacity-60`,{fontFamily:'Poppins_500Medium'}]}>Nombre des absence par jour</Text>
                </View>
                <LineChart 
                    data={{
                        labels : ['lun','mar','mer','jeu','ven','sam','dim'],
                        datasets : [{
                            data : absences
                        }]
                    }}
                    width={335}
                    height={200}
                    bezier
                    
                    chartConfig={{
                        backgroundGradientFrom:'white',
                        backgroundGradientTo:'white',
                        color : () => `navy`,
                        decimalPlaces : 0,
                        verticalLabelsHeightPercentage:0,
                        strokeWidth:2,
                    
                    }}
                    style={{borderRadius:20,marginTop:-10,paddingTop:20,paddingBottom:10}}
                    withInnerLines={false}
                    withOuterLines={false}
                /> 
                <DateTimePickerModal 
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <Button buttonColor="navy" style={tw`w-[93%] rounded-xl py-1 mt-5`} mode="contained" onPress={showDatePicker}>
                    sélectionner une date
                </Button>
            </SafeAreaView>
        </View>
        </PaperProvider>
    </>
}