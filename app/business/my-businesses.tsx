import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { getDocs, query, where } from 'firebase/firestore'
import { BusinessCollection } from '@/configs/firebase'
import { Business } from '@/interfaces'
import ExploreBusinessList from '@/components/Explore/BusinessList'
import { useNavigation } from 'expo-router'
import { Colors } from '@/constants/Colors'

const MyBusinesses = () => {

    ///////////////////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////////////
    const { user } = useUser()
    const navigation = useNavigation()

    ///////////////////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////////////
    const [businesses, setBusinesses] = useState<Business[]>([])
    const [loading, setLoading] = useState(false)

    ///////////////////////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        navigation.setOptions({ headerTitle: 'My Business', headerShown: true, headerStyle: { backgroundColor: Colors.PRIMARY, color: '#fff' } })
        user && getMyBusinesses()
    }, [])

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////    
    const getMyBusinesses = async () => {
        try {
            setLoading(true)
            setBusinesses([])

            const q = query(BusinessCollection, where('email', '==', user?.primaryEmailAddress?.emailAddress))
            const snapshot = await getDocs(q)

            snapshot.forEach(doc => {
                setBusinesses(pre => ([...pre, { id: doc.id, ...doc.data() } as Business]))
            })

            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <View style={{ padding: 20 }} >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }} >My Business</Text>

            <FlatList
                data={businesses}
                onRefresh={getMyBusinesses}
                refreshing={loading}
                renderItem={({ item, index }) => (
                    <ExploreBusinessList.BusinessCard business={item} key={index} />
                )}
            />

            <View style={{ height: 400 }} />

        </View>
    )
}

export default MyBusinesses