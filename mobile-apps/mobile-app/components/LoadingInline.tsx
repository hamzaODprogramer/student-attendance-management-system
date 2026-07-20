import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

const LoadingInline = ({ count }: { count: number }) => {
    return (
        <>
        {Array.from({ length: count }, (_, index) => index + 1).map((number) => (
            <View
            key={number}
            style={tw`h-8 bg-gray-300 rounded-xl w-full dark:bg-gray-700 mb-4`}
            ></View>
        ))}
        </>
    );
};

export default LoadingInline
