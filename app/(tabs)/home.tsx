import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Header, Slider, CategoryList, PopularBusinesses } from '@/components'

const Home = () => {
  return (
    <ScrollView >

      <Header />
      <Slider />
      <CategoryList />
      <PopularBusinesses />

      <View style={{ height: 20 }} />

    </ScrollView>
  )
}

export default Home