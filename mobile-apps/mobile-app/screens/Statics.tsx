import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Searchbar, TouchableRipple } from "react-native-paper";
import { useFonts, Poppins_500Medium, Poppins_300Light } from '@expo-google-fonts/poppins';
import tw from 'twrnc';
import ListItemClass from "../components/ListItemClass";
import LoadingClass from "../components/LoadingClass";
import { getClasses } from "../functions/FuncClasse/CRUD";
import SyncStorage from "sync-storage";

export default function Statics({navigation}:any) {
    const [expanded, setExpanded] = useState(true);
    let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_300Light });
    const handlePress = () => setExpanded(!expanded);

    /****************************** STATE VALUES ******************************/
    const [classes, setClasses] = useState<ClasseType[]>([]);
    const [loadClasses, setLoadClasses] = useState<boolean>(true);
    const [filterClasse,setFilterClasse] = useState<string>('')
    useEffect(() => {
        const fetchClasses = async () => {
            const result = await getClasses();
            setClasses(result.result);
            setLoadClasses(false);
        }
        fetchClasses();
    }, []);

    return (
        <>
            <Appbar.Header mode="small">
                <Appbar.Content titleStyle={{ fontFamily: 'Poppins_500Medium' }} title="Statistiques" mode="large" color="navy" style={{ marginLeft: 19 }} />
                <Appbar.Action icon={"logout"} iconColor="navy" />
            </Appbar.Header>
            <View>
                <Searchbar
                    style={tw`mx-3 mt-3`}
                    placeholder="Recherche sur la classe"
                    onChangeText={setFilterClasse}
                    value={filterClasse}

                />
                <ScrollView style={tw`pb-3 mb-3 mx-3 mt-3`}>
                {
                    loadClasses
                    ? <LoadingClass />
                    : classes.filter((classe:ClasseType)=>classe.numero?.includes(filterClasse)).map((classe:ClasseType,index:any)=>{
                        return <TouchableRipple 
                                    borderless 
                                    style={tw`rounded-2xl w-full mb-2`} 
                                    onPress={() => { SyncStorage.set('ClasseStatic',classe._id) ; navigation.navigate('ClasseStatic') }}
                                    rippleColor="rgba(0, 0, 0, .32)"
                                    key={index}
                                >
                                    <ListItemClass key={index} title={classe.numero || '...'} filiere={classe.filiere?.nom || '...'}/>
                                </TouchableRipple>
                    })
                }
                </ScrollView>
            </View>
        </>
    );
}
