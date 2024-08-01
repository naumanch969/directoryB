import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { query, getDocs } from 'firebase/firestore'
import { SliderCollection } from '../../configs/firebase'
import { Slider as TSlider } from '@/interfaces'

const Slider = () => {

    ///////////////////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////////////
    const [sliderList, setSliderList] = useState<TSlider[]>([])

    ///////////////////////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (sliderList?.length > 0) return
        getSliderList()
    }, [])

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////
    const getSliderList = async () => {
        try {
            setSliderList([])
            const q = query(SliderCollection)
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                setSliderList(pre => [...pre, doc.data() as TSlider])
            })

        }
        catch (err) {
            console.error(err)
        }
    }

    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <View>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, paddingLeft: 20, paddingTop: 20, marginBottom: 5 }} >#Special for you</Text>
            <FlatList
                data={sliderList}
                style={{ marginHorizontal: 20 }}
                renderItem={({ item, index }) => (
                    <Image
                        key={index}
                        style={{ width: 300, height: 150, borderRadius: 15, marginRight: 15 }}
                        source={{ uri: item.imageUrl }}
                    />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Slider