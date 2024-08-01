import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Business } from '@/interfaces'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const ExploreBusinessList = ({ businessList }: { businessList: Business[] }) => {

    return (
        <ScrollView>

            <FlatList
                data={businessList}
                showsVerticalScrollIndicator={false}
                scrollEnabled
                renderItem={({ item, index }) => (
                    <ExploreBusinessList.BusinessCard key={index} business={item} />
                )}
                horizontal={false}
            />

            <View style={{ height: 200 }} />

        </ScrollView>
    )
}

export default ExploreBusinessList


ExploreBusinessList.BusinessCard = ({ business }: { business: Business }) => {

    const router = useRouter()

    const onPress = () => {
        console.log('businessId', business.id)
        router.push('/businessDetail/' + business?.id)
    }

    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#fff', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, marginTop: 10 }}>

            <Image source={{ uri: business?.imageUrl }} style={{ width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />

            <View style={{ padding: 10 }} >
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >{business.name}</Text>
                <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }} >{business.address}</Text>
            </View>

        </TouchableOpacity>
    )
}