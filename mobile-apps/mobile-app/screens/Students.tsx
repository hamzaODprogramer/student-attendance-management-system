import { useEffect, useState } from "react";
import tw from 'twrnc';
import { Appbar, Button, DataTable, PaperProvider, Avatar } from "react-native-paper";
import { ScrollView, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Alert, Text } from "react-native";
import { getEtudiants } from "../functions/FuncEtudiant/CRUD";
import LoadingTable from "../components/LoadingTable";
import { getSeance } from "../functions/FuncSeance/CRUD";
import SyncStorage from "sync-storage";
import { STATE } from "../enums/global";
import generatePDF from "../functions/genratePDF";

export default function Students({ navigation }: any) {
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([6]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [items, setItems] = useState<EtudiantItemType[]>([]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const [date, setDate] = useState<string>('');
    const [etudiants, setEtudiants] = useState<EtudiantType[]>([]);
    const [listItemsEtudiant, setListItemsEtudiant] = useState<EtudiantItemType[]>([]);
    const [cnes, setCnes] = useState<string[]>([]);
    const [seance, setSeance] = useState<SeanceType>({} as SeanceType);
    const [shouldSelect, setShouldSelect] = useState<boolean>(true);
    const [loadData,setLoadData] = useState<boolean>(false)
    useEffect(() => {
        if (date) {
            getListItemEtudiant();
        }
    }, [date]);

    const handleConfirm = (d: string) => {
        setDate(d);
        hideDatePicker();
    };

    const getListItemEtudiant = async () => {
        setLoadData(true)
        const test = (await getSeance(new Date(date).toISOString().split('T')[0])).result;
        const state = (await getSeance(new Date(date).toISOString().split('T')[0])).state;
        if (state == STATE.NOT_EXISTE) {
            setListItemsEtudiant([]);
            setShouldSelect(true);
        } else if (state == STATE.OK && test.enseignant && test.enseignant == SyncStorage.get('id')) {
            const presences = test.presentes;
            const etudiantsData = await getEtudiants();

            setEtudiants(etudiantsData.result);

            const updatedListItems = etudiantsData.result.filter((etudiant: EtudiantType) => etudiant.classe?.numero == SyncStorage.get('classeCameraNumero')).map((etudiant: EtudiantType) => ({
                key: etudiant._id,
                name: etudiant.image,
                calories: `${etudiant.prenom} ${etudiant.nom}`,
                fat: presences.includes(etudiant?.cne) ? 'présente' : 'absente',
                etat: presences.includes(etudiant?.cne) ? 'présente' : 'absente',
                cne: etudiant.cne,
                nom: etudiant.nom,
                prenom: etudiant.prenom
            }));
            setListItemsEtudiant(updatedListItems);
            setShouldSelect(false);
        } else {
            setShouldSelect(true);
        }
        setLoadData(false)
    };

    return (
        <PaperProvider>
            <View style={tw`px-3 pt-3 gap-3 flex flex-col`}>
                <Button loading={loadData} disabled={loadData} onPress={showDatePicker} mode="contained" style={[tw`rounded-md py-1`,loadData ? { backgroundColor: 'rgba(0,0,0,0.1)'} : { backgroundColor: 'navy' }]}>{loadData ? "obtenir la séance " : "Sélectionner la date de séance"}</Button>
                <Button disabled={shouldSelect} icon={"file-document"} textColor="navy" onPress={e => generatePDF(listItemsEtudiant)} mode="elevated" style={[tw`rounded-md py-1`, {}]}>Génerer le pdf</Button>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <View style={tw`w-full pt-[1] shadow-xl shadow-1`}>
                    <DataTable style={[tw`rounded-lg border-[0.5px] border-opacity-20 border-black border-solid shadow-md shadow-1`, { backgroundColor: '#f6f2f9' }]}>
                        <DataTable.Header>
                            <DataTable.Title textStyle={{ color: 'black' }}>image</DataTable.Title>
                            <DataTable.Title textStyle={{ color: 'black' }}>nom</DataTable.Title>
                            <DataTable.Title textStyle={{ color: 'black' }} numeric>etat</DataTable.Title>
                        </DataTable.Header>
                        {
                            shouldSelect
                                ? <View style={tw`flex justify-center items-center min-h-20`}><Text style={[tw`opacity-70 shadow-md`,{color:'navy'}]}>vous devez sélèctionner un séance existe</Text></View>
                                : <ScrollView style={[tw`min-h-[100] max-h-[100] pb-5`, {}]}>
                                    {
                                        listItemsEtudiant.length == 0
                                            ? <LoadingTable count={9} />
                                            :
                                            listItemsEtudiant.map((item) => (
                                                <DataTable.Row key={item.key}>
                                                    <DataTable.Cell><Avatar.Image size={42} source={{ uri: item.name }} /></DataTable.Cell>
                                                    <DataTable.Cell>{item.calories}</DataTable.Cell>
                                                    <DataTable.Cell numeric><Text style={tw`${item.fat == 'absente' ? 'text-red-700' : 'text-green-700'}`}>{item.fat}</Text></DataTable.Cell>
                                                </DataTable.Row>
                                            ))
                                    }
                                </ScrollView>
                        }
                    </DataTable>
                </View>
            </View>
        </PaperProvider>
    );
}
