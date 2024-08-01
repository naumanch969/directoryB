import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Business } from '@/interfaces'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/configs/firebase'
import { Colors } from '@/constants/Colors'
import Intro from './Intro'
import ActionButton from './ActionButton'
import About from './About'
import Review from './Review'

const BusinessDetail = () => {

    ///////////////////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////////////
    const { businessId } = useLocalSearchParams()

    ///////////////////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////////////
    const [business, setBusiness] = useState<Business | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    ///////////////////////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (business) return
        getBusinessById()
    }, [])

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////
    const getBusinessById = async () => {
        try {
            setBusiness(undefined)
            setLoading(true)

            const docRef = doc(db, 'BusinessLists', businessId as string)
            const document = await getDoc(docRef)

            if (!document.exists()) return console.error('No such document! ' + businessId)

            setBusiness({ id: document.id, ...document.data() } as Business)

            setLoading(false)
        }
        catch (err) {
            console.error(err)
        }
    }

    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <ScrollView>
            {
                loading
                    ?
                    <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: '60%' }} />
                    :
                    <View>
                        <Intro business={business as Business} />
                        <ActionButton business={business as Business} />
                        <About business={business as Business} />
                        <Review business={business as Business} />
                    </View>
            }
        </ScrollView>
    )
}

export default BusinessDetail