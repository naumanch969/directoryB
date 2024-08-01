import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { getDocs, query } from 'firebase/firestore'
import { CategoryCollection } from '@/configs/firebase'
import { useRouter } from 'expo-router'
import { Category } from '@/interfaces'

const CategoryList = ({ explore = false, onCategorySelect }: { explore?: boolean, onCategorySelect?: any }) => {

    ///////////////////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////////////
    const router = useRouter()

    ///////////////////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////////////
    const [categories, setCategories] = useState<Category[]>([])

    ///////////////////////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (categories?.length > 0) return
        getCategoriesList()
    }, [])

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////
    const getCategoriesList = async () => {
        try {
            setCategories([])
            const q = query(CategoryCollection)
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach(doc => {
                setCategories(pre => [...pre, doc.data() as Category])
            })

        }
        catch (err) {
            console.error(err)
        }
    }


    ///////////////////////////////////////////////////////////////////// COMPONENTS ////////////////////////////////////////////////////////////////////
    const CategoryItem = ({ item }: { item: Category }) => {

        const onPress = () => {
            if (explore) {
                onCategorySelect(item?.name)
            }
            else {
                router.push('/businessList/' + item?.name)
            }
        }

        return (
            <TouchableOpacity onPress={onPress} style={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 10 }} >
                <View style={{ backgroundColor: Colors.ICON_BG, borderRadius: 999, padding: 10 }} >
                    <Image source={{ uri: item?.imageUrl }} style={{ width: 40, height: 40 }} />
                </View>
                <Text style={{ fontSize: 12, fontFamily: 'outfit-medium', marginTop: 5 }} >{item?.name}</Text>
            </TouchableOpacity>
        )
    }

    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <View>

            {
                !explore &&
                <View style={{ padding: 20, paddingBottom: 10, marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }} >Category</Text>
                    <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-medium' }} >View All</Text>
                </View>
            }

            <FlatList
                data={categories}
                style={{ marginHorizontal: explore ? 0 : 20 }}
                renderItem={({ item, index }: { item: Category, index: number }) => (
                    <CategoryItem key={index} item={item as Category} />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default CategoryList