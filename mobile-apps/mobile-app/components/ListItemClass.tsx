import React from 'react';
import { View, Text } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import listeItemStaticClassType from '../types/global';

export default function ListItemClass({ title, filiere }:listeItemStaticClassType) {
    const navigation = useNavigation();
    return (  
        <View style={tw`flex flex-row items-center bg-white rounded-2xl shadow-md`}>
            <View style={tw`mr-3`}>
                <IconButton icon={"google-classroom"} />  
            </View>
            <View style={tw`flex-1 py-3`}>
                <Text style={tw`font-medium`}>{title}</Text>
                <Text style={tw`text-sm text-black/50`}>{filiere}</Text>  
            </View>
        </View>
    );
}
