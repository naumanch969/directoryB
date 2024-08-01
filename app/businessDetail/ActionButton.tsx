import { View, Text, FlatList, TouchableOpacity, Linking, Image, Share, ScrollView } from 'react-native'
import React from 'react'
import { Business } from '@/interfaces'

const ActionButton = ({ business }: { business: Business }) => {

    ///////////////////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////////////
    const buttons = [
        { id: 1, name: 'Call', icon: require('@/assets/images/call.png'), url: 'tel:' + business?.contact },
        { id: 2, name: 'Location', icon: require('@/assets/images/location.png'), url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address },
        { id: 3, name: 'Website', icon: require('@/assets/images/website.png'), url: business?.website },
        { id: 4, name: 'Share', icon: require('@/assets/images/share.png'), url: business?.website },
    ]

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////
    const onPress = (item: any) => {
        if (item?.name === 'Share') {
            Share.share({ message: `${business?.website}\nAddress:\n${business.address}\n Find more details on DirectoryB by devx.studio` })
        } else {
            Linking.openURL(item?.url)
        }
    }

    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#fff', padding: 20 }} >
            <FlatList
                data={buttons}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} onPress={() => onPress(item)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <Image source={item.icon as any} style={{ width: 35, height: 35 }} />
                        <Text style={{ fontFamily: 'outfit', textAlign: 'center', marginTop: 3 }} >{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    )
}

export default ActionButton
