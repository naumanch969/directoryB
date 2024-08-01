import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '@/constants/Colors'

const UserIntro = () => {

    const { user } = useUser()

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }} >

            <Image source={{ uri: user?.imageUrl }} style={{ width: 100, height: 100, borderRadius: 999 }} />
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >{user?.fullName}</Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }} >{user?.primaryEmailAddress?.emailAddress}</Text>

        </View>
    )
}

export default UserIntro