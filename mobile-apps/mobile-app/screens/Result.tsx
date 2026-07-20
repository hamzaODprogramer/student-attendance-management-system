import { ScrollView, Text, View } from "react-native";
import { Divider, IconButton } from "react-native-paper";
import tw from 'twrnc'
import { Button, DataTable, PaperProvider,Avatar } from "react-native-paper"
import { useEffect, useState } from "react";
import getPresences from "../functions/FuncEtudiant/getPresences";
import { getEtudiants } from "../functions/FuncEtudiant/CRUD";
import SyncStorage from "sync-storage";
import LoadingTable from "../components/LoadingTable";
import generatePDF from "../functions/genratePDF";
import { addSeance } from "../functions/FuncSeance/CRUD";
export default function Result({navigation,route}:any){
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([6]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );
  
    const [items,setItems] = useState<EtudiantItemType[]>([]);
     
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);
    
    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    /******************************** STATE VALUE **********************************/
    const [urlImage,setUrlImage] = useState<string>('')
    const [etudiantsPresente,setEtudiantsPresente] = useState<EtudiantType[]>([])
    
    const [etudiants,setEtudiants] = useState<EtudiantType[]>([])
    const [listItemsEtudiant,setListItemsEtudiant] = useState<EtudiantItemType[]>([])
    const [cnes,setCnes] = useState<string[]>([])


    useEffect(() => {
        const { imageUrl } = route.params;
        const getListItemEtudiant = async () => {
            const presences = await getPresences(imageUrl);
            const etudiantsData = await getEtudiants();
    
            setCnes(presences.cnes);
            setEtudiants(etudiantsData.result);
    
            const updatedListItems = etudiantsData.result.filter((etudiant:EtudiantType)=>etudiant.classe?.numero == SyncStorage.get('classeCameraNumero')).map((etudiant: EtudiantType,index:any) => ({
                key: etudiant._id,
                name: etudiant.image,
                calories: `${etudiant.prenom} ${etudiant.nom}`,
                fat: presences.cnes.includes(etudiant.cne) ? 'présente' : 'absente',
                etat : presences.cnes.includes(etudiant.cne) ? 'présente' : 'absente',
                cne : etudiant.cne,
                nom : etudiant.nom,
                prenom : etudiant.prenom
            }));
            setListItemsEtudiant(updatedListItems);


            const data : dataResponse = await addSeance({
                date : ((new Date()).toISOString().split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$2-$3')),
                heure : (new Date().toISOString().split('T')[1].split('.')[0]),
                id_class : SyncStorage.get('classeCameraId'),
                id_ens : SyncStorage.get('id'),
                cnes : presences.cnes,
                count : updatedListItems.length || 30
            })

            console.log('data : ',data.state)
        };
        getListItemEtudiant();
    }, []);
    

    return <>
        <PaperProvider>
            <View style={[tw``,{}]}>
                <View style={[tw`mx-2 rounded-xl mt-3 bg-white shadow-1 shadow-md`,{backgroundColor:'#f6f2f9'}]}>
                    <View style={[tw`flex-row items-center`,{}]}>
                        <View style={[tw`flex-row items-center`,{}]}>
                            <IconButton style={tw`opacity-70`} iconColor="navy" icon="google-classroom"/>
                            <Text style={[tw`text-[4] mb-1 font-medium opacity-70`,{color:'navy'}]}>Classe</Text>
                        </View>
                        <Text style={[tw`ml-11 text-black/75 text-[4] mb-1`,{}]}>{SyncStorage.get('classeCameraNumero')}</Text>
                    </View>

                    
                </View>
                <Button  disabled={listItemsEtudiant.length == 0} icon={"file-document"} textColor="navy" onPress={e=>generatePDF(listItemsEtudiant)} mode="elevated" style={[tw`rounded-md py-1 mx-2 mt-2`,{shadowColor:12}]}>Génerer le pdf</Button>
                <View style={tw`w-full px-2 pt-2 shadow-xl shadow-1`}>
                    <DataTable style={[tw`rounded-lg border-[0.5px] border-opacity-20 border-black border-solid shadow-md shadow-1`,{backgroundColor:'#f6f2f9'}]}>
                        <DataTable.Header>
                            <DataTable.Title textStyle={{color:'black'}} style={{}}>image</DataTable.Title>
                            <DataTable.Title textStyle={{color:'black'}} >nom</DataTable.Title>
                            <DataTable.Title textStyle={{color:'black'}} numeric>etat</DataTable.Title>
                        </DataTable.Header>
                        <ScrollView style={[tw`max-h-[102] min-h-[102] pb-5`,{}]}>
                            {
                                listItemsEtudiant.length == 0
                                ? <LoadingTable count={9}/>
                                :
                                listItemsEtudiant.map((item) => (
                                    <DataTable.Row key={item.key}>
                                        <DataTable.Cell><Avatar.Image size={42} source={{ uri: item.name }} /></DataTable.Cell>
                                        <DataTable.Cell >{item.calories}</DataTable.Cell>
                                        <DataTable.Cell numeric><Text style={tw`${item.fat=='absente' ? 'text-red-700' : 'text-green-700'}`}>{item.fat}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            }
                        </ScrollView>
                        
                    </DataTable>
                </View>
            </View>
        </PaperProvider>
    </>
}