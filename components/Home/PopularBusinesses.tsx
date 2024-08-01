import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { getDocs, limit, query } from 'firebase/firestore'
import { BusinessCollection, db } from '@/configs/firebase'
import { Ionicons } from '@expo/vector-icons'
import { Business } from '@/interfaces'
import { useRouter } from 'expo-router'

const PopularBusinesses = () => {

    ///////////////////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////////////
    const router = useRouter()

    ///////////////////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////////////
    const [businesses, setBusinesses] = useState<Business[]>([])

    ///////////////////////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (businesses?.length > 0) return
        getCategoriesList()
    }, [])

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////
    const getCategoriesList = async () => {
        try {
            setBusinesses([])
            const q = query(BusinessCollection, limit(10))
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach(doc => {
                console.log(doc?.data())
                setBusinesses(pre => [...pre, { id: doc?.id, ...doc?.data() } as Business])
            })

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
            <TouchableOpacity onPress={onPress} style={{ padding: 8, marginRight: 10, backgroundColor: '#fff', borderRadius: 15 }} >
                <Image source={{ uri: item.imageUrl }} style={{ width: 220, height: 130, borderRadius: 10, }} />
                <View style={{ marginTop: 6 }} >
                    <Text style={{ fontSize: 16, fontFamily: 'outfit-bold' }} >{item.name}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'outfit', color: Colors.GRAY }} >{item.address}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }} >
                            <Ionicons name="star" size={20} color={Colors.STAR} />
                            <Text style={{ fontFamily: 'outfit' }} >4.5</Text>
                        </View>
                        <Text style={{ fontFamily: 'outfit', backgroundColor: Colors.PRIMARY, color: '#fff', fontSize: 10, borderRadius: 5, padding: 3 }} >{item.category}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <View>
            <View style={{ padding: 20, paddingBottom: 10, marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }} >Popular Business</Text>
                <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit' }} >View All</Text>
            </View>

            <FlatList
                data={businesses}
                style={{ marginHorizontal: 20 }}
                renderItem={({ item, index }: { item: Business, index: number }) => (
                    <BusinessItem key={index} item={item as Business} />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default PopularBusinesses