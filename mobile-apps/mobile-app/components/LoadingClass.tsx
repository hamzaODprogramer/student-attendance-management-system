import SkeletonContent from 'react-native-skeleton-content';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';
export default function LoadingClass() {
    return <>
        <View role="status" style={tw`max-w-sm animate-pulse`}>
            <View style={tw`h-13 bg-gray-300 rounded-xl w-full dark:bg-gray-700  mb-4`}></View>
            <View style={tw`h-13 bg-gray-300 rounded-xl w-full dark:bg-gray-700  mb-4`}></View>
            <View style={tw`h-13 bg-gray-300 rounded-xl w-full dark:bg-gray-700  mb-4`}></View>
            <View style={tw`h-13 bg-gray-300 rounded-xl w-full dark:bg-gray-700  mb-4`}></View>
            <View style={tw`h-13 bg-gray-300 rounded-xl w-full dark:bg-gray-700  mb-4`}></View>
            <View style={tw`h-13 bg-gray-300 rounded-xl w-full dark:bg-gray-700  mb-4`}></View>
        </View>
    </>
}
