import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { Business } from '@/interfaces'
import { BusinessCollection } from '@/configs/firebase'
import { getDocs, limit, query, where } from 'firebase/firestore'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const BussinessListByCategory = () => {

    ///////////////////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////////////
    const navigation = useNavigation()
    const router = useRouter()
    const { category } = useLocalSearchParams()

    ///////////////////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////////////
    const [businesses, setBusinesses] = useState<Business[]>([])
    const [loading, setLoading] = useState(false)

    ///////////////////////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        navigation.setOptions({ headerShown: true, headerTitle: category })
    }, [])

    useEffect(() => {
        if (businesses?.length > 0) return
        getBusinessList()
    }, [])

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////
    const getBusinessList = async () => {
        try {
            setBusinesses([])
            setLoading(true)
            // const q = query(BusinessCollection, where('category', '==', category))
            const q = query(BusinessCollection, limit(10))
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach(doc => {
                setBusinesses(pre => [...pre, { id: doc?.id, ...doc?.data() } as Business])
            })

            setLoading(false)
        }
        catch (err) {
            console.error(err)
        }
    }

    ///////////////////////////////////////////////////////////////////// COMPONENTS ////////////////////////////////////////////////////////////////////
    const BusinessItem = ({ item }: { item: Business }) => {

        const onPress = () => {
            router.push('/businessDetail/' + item?.id)
        }

        return (
            <TouchableOpacity onPress={onPress} style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, marginTop: 5, marginBottom: 10, backgroundColor: '#fff', borderRadius: 15 }} >
                <Image source={{ uri: item.imageUrl }} style={{ width: 120, height: 120, borderRadius: 10, }} />
                <View style={{ flex: 1 }} >
                    <Text style={{ fontSize: 17, fontFamily: 'outfit-bold' }} >{item.name}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'outfit', color: Colors.GRAY }} >{item.address}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }} >
                        <Ionicons name="star" size={20} color={Colors.STAR} />
                        <Text style={{ fontFamily: 'outfit' }} >4.5</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <View>
            {
                loading
                    ?
                    <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: '60%' }} />
                    :
                    <FlatList
                        data={businesses}
                        style={{ marginHorizontal: 15 }}
                        renderItem={({ item, index }: { item: Business, index: number }) => (
                            <BusinessItem key={index} item={item as Business} />
                        )}
                        ListEmptyComponent={() => (
                            <Text style={{ marginTop: '20%', fontSize: 20, fontFamily: 'outfit-bold', color: Colors.GRAY, textAlign: 'center' }} >No Business found.</Text>
                        )}
                        onRefresh={getBusinessList}
                        refreshing={loading}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
            }
        </View>
    )
}

export default BussinessListByCategory