import { View, Text, SafeAreaView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { CategoryList } from '@/components'
import { getDocs, query, where } from 'firebase/firestore'
import { BusinessCollection } from '@/configs/firebase'
import { Business } from '@/interfaces'
import ExploreBusinessList from '@/components/Explore/BusinessList'

const Explore = () => {

  /////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////
  const [selectedCategory, setSelectedCategory] = useState('')
  const [businessList, setBusinessList] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)

  /////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////////
  useEffect(() => {
    setLoading(true)
    getBusinessListByCateogry().then(() => setLoading(false))
  }, [selectedCategory])

  /////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////
  const getBusinessListByCateogry = async () => {
    try {
      setBusinessList([])
      // const q = query(BusinessCollection, where('category', '==', ''))
      const q = query(BusinessCollection)
      const snapshot = await getDocs(q)
      snapshot.forEach(doc => {
        setBusinessList(pre => [...pre, { id: doc?.id, ...doc.data() } as Business])
      });

    } catch (error) {
      console.error(error)
    }
  }
  const onCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  /////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////
  return (
    <SafeAreaView style={{ padding: 20, }} >

      <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }} >Explore More</Text>

      {/* <SearchBar/> */}
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#fff', padding: 10, marginBottom: 10, marginTop: 15, borderRadius: 8, borderWidth: 1, borderColor: Colors.PRIMARY }} >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Search...' style={{ fontFamily: 'outfit', fontSize: 16 }} />
      </View>

      <CategoryList explore={true} onCategorySelect={(category: string) => onCategorySelect(category)} />

      {
        loading
          ?
          <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: '60%' }} />
          :
          <ExploreBusinessList businessList={businessList} />
      }

    </SafeAreaView>
  )
}

export default Explore