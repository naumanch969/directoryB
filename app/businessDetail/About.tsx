import { View, Text } from 'react-native'
import React from 'react'
import { Business } from '@/interfaces'
import { Colors } from '@/constants/Colors'

const About = ({ business }: { business: Business }) => {
    return (
        <View style={{ padding: 20, paddingTop: 0, backgroundColor: '#fff' }} >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >About</Text>
            <Text style={{ fontFamily: 'outfit', lineHeight: 25, color: Colors.GRAY }} >{business?.about}</Text>
        </View>
    )
}

export default About