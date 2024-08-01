import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {

    const { user } = useUser()

    return (
        <View style={{ padding: 20, paddingTop: 40, backgroundColor: Colors.PRIMARY, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} >

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }} >
                <Image style={{ width: 45, height: 45, borderRadius: 999 }} source={{ uri: user?.imageUrl }} />
                <View style={{}} >
                    <Text style={{ color: '#fff' }} >Welcome, </Text>
                    <Text style={{ fontSize: 19, fontFamily: 'outfit-medium', color: '#fff' }} >{user?.fullName}</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#fff', padding: 10, marginBottom: 10, marginTop: 15, borderRadius: 8 }} >
                <Ionicons name="search" size={24} color={Colors.PRIMARY} />
                <TextInput placeholder='Search...' style={{ fontFamily: 'outfit', fontSize: 16 }} />
            </View>

        </View>
    )
}

export default Header