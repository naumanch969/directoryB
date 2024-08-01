import { View, Text, Image, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Business } from '@/interfaces'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useUser } from '@clerk/clerk-expo'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/configs/firebase'

const Intro = ({ business }: { business: Business }) => {

    ///////////////////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////////////
    const router = useRouter()
    const { user } = useUser()

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////
    const onBack = () => {
        router.back()
    }
    const onLike = () => {
        // Add like to the business
    }
    const onDelete = () => {

        Alert.alert(
            'Do you want to Delete?',
            'This action can not be recovered. Once you delete your business, every information related to it will be removed. Are you sure you want to proceed?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteBusiness() },
            ])
    }

    const deleteBusiness = async () => {
        try {
            const businessDocRef = doc(db, 'BusinessLists', business.id as string);
            await deleteDoc(businessDocRef);
            router.back();
            ToastAndroid.show('Business Deleted', ToastAndroid.LONG);
        } catch (error) {
            ToastAndroid.show('Failed to delete business', ToastAndroid.LONG);
        }
    }


    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <View>

            <View style={{ position: 'absolute', zIndex: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 20 }} >
                <TouchableOpacity onPress={onBack} >
                    <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onLike} >
                    <Ionicons name="heart-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Image source={{ uri: business?.imageUrl }} style={{ width: '100%', height: 340 }} />

            <View style={{ paddingHorizontal: 20, paddingTop: 20, marginTop: -40, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} >
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={{ fontSize: 24, fontFamily: 'outfit-bold' }} >{business?.name}</Text>
                    {
                        user?.primaryEmailAddress?.emailAddress == business?.email &&
                        <TouchableOpacity onPress={onDelete} >
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    }
                </View>
                <Text style={{ fontSize: 18, fontFamily: 'outfit', color: Colors.GRAY }} >{business?.address}</Text>
            </View>

        </View>
    )
}

export default Intro