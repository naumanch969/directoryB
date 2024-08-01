import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'

const MenuList = () => {

  const router = useRouter()
  const { signOut } = useAuth()

  const menuList = [
    { id: 1, 'name': 'Add Business', icon: 'add', path: '/business/add-business', color: Colors.PRIMARY },
    { id: 2, 'name': 'My Business', icon: 'business', path: '/business/my-businesses', color: Colors.PRIMARY },
    { id: 3, 'name': 'Share App', icon: 'share', path: 'share', color: Colors.PRIMARY },
    { id: 4, 'name': 'Logout', icon: 'log-out', path: 'logout', color: 'red' },
  ]

  const onMenuClick = (item: any) => {
    if (item.path == 'logout') {
      signOut()
    }
    else if (item.path == 'share') {
      Share.share({ message: 'Download the DirectoryB by DevX - Download URL' })
    }
    else {
      console.log('\n\n\n\n\n\n\nitem', item.path, '\n\n\n\n\n\n\n')
      router.push(item.path)
    }
  }

  return (
    <View style={{ marginTop: 10 }} >

      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{ padding: 10, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: item.color, borderRadius: 15, margin: 10, backgroundColor: '#fff' }}
          >
            <Ionicons name={item.icon as any} size={32} color={item.color} />
            <Text style={{ flex: 1, fontFamily: 'outfit', fontSize: 16 }} >{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ fontFamily: 'outfit', textAlign: 'center', marginTop: 150, color: Colors.GRAY }} >Product of DevX @2024</Text>

    </View>
  )
}

export default MenuList