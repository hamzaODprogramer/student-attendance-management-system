import { View } from "react-native";
import tw from 'twrnc'
export default function LoadingTable({ count }: { count: number }){
  return <>
    {
        <View style={tw`w-full flex flex-col justify-center items-center pt-3`}>
            {
                Array.from({ length: count }, (_, index) => index + 1).map((number) => (
                    <View
                        key={number}
                        style={tw`h-10 bg-gray-200 rounded-xl w-[95%] dark:bg-gray-700 mb-4 mx-5`}
                        ></View>
                    ))
            }
        </View>
    }
  </>
}