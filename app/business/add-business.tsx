import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { addDoc, doc, getDocs, query, setDoc } from 'firebase/firestore'
import { BusinessCollection, CategoryCollection, db, storage } from '@/configs/firebase'
import { Business } from '@/interfaces'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useUser } from '@clerk/clerk-expo'
import DropDownPicker from 'react-native-dropdown-picker'

const AddBusiness = () => {

    ///////////////////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////////////
    const navigation = useNavigation()
    const router = useRouter()
    const { user } = useUser()

    ///////////////////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////////////////
    const [image, setImage] = useState('')
    const [categories, setCategories] = useState<{ label: string, value: string }[]>([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [about, setAbout] = useState('')
    const [website, setWebsite] = useState('')
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('')
    const [open, setOpen] = useState(false);
  
    ///////////////////////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        navigation.setOptions({ headerTitle: 'Add New Business', headerShown: true })
        getCategoryList()
    }, [])

    ///////////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////
    const getCategoryList = async () => {
        try {
            setCategories([])

            const q = query(CategoryCollection)
            const snapshot = await getDocs(q)

            snapshot.forEach(doc => {
                setCategories(pre => [...pre, { label: doc.data().name, value: doc.data().name }])
            })
        } catch (error) {
            console.error(error)
        }
    }

    const onSubmit = async () => {

        if (!category) return Alert.alert('Error', 'Category is required.');
        if (!name) return Alert.alert('Error', 'Name is required.');
        if (!address) return Alert.alert('Error', 'Address is required.');
        if (!contact) return Alert.alert('Error', 'Contact is required.');
        if (!about) return Alert.alert('Error', 'About is required.');
        if (!website) return Alert.alert('Error', 'Website is required.');

        const fileName = Date.now().toString() + '.jpg'
        const response = await fetch(image)
        const blob = await response.blob()

        const imageRef = ref(storage, `business-app/${fileName}`)

        console.log('this')

        setLoading(true)
        uploadBytes(imageRef, blob)
            .then(async (snapshot) => {
                console.log('Uploaded a blob or file!', snapshot)
            })
            .then(() => {

                getDownloadURL(imageRef).then((url: string) => {
                    saveBusinessDetail(url)
                    console.log('url', url)
                })

            })
            .catch(() => {
                setLoading(false)
            })

    }

    const saveBusinessDetail = async (imageUrl: string) => {
        const input: Business = {
            name,
            address,
            contact,
            about,
            website,
            imageUrl,
            category,
            userName: user.fullName,
            email: user?.primaryEmailAddress.emailAddress,
            userImage: user?.imageUrl,
            reviews: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await addDoc(BusinessCollection, input);
        setLoading(false)
        ToastAndroid.show('Business Added Successfully', ToastAndroid.TOP)
        router.push('/business/my-businesses')
    }

    const onUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }


    ///////////////////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////////////
    return (
        <ScrollView style={{ padding: 20 }} >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }} >Add New Business</Text>
            <Text style={{ fontFamily: 'outfit', color: Colors.GRAY }} >Fill all details in order to add new business.</Text>

            {
                image
                    ?
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                    :
                    <TouchableOpacity onPress={onUploadImage} style={{ marginTop: 20 }} >
                        <Image source={require('@/assets/images/camera.png')} style={{ width: 100, height: 100, }} />
                    </TouchableOpacity>
            }

            <View>
                <TextInput
                    placeholder='Name'
                    onChangeText={(text) => setName(text)}
                    style={{ padding: 10, borderWidth: 1, borderRadius: 5, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY, fontFamily: 'outfit' }}
                />
                <TextInput
                    placeholder='Address'
                    onChangeText={(text) => setAddress(text)}
                    style={{ padding: 10, borderWidth: 1, borderRadius: 5, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY, fontFamily: 'outfit' }}
                />
                <TextInput
                    placeholder='Contact'
                    onChangeText={(text) => setContact(text)}
                    style={{ padding: 10, borderWidth: 1, borderRadius: 5, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY, fontFamily: 'outfit' }}
                />
                <TextInput
                    placeholder='Website'
                    onChangeText={(text) => setWebsite(text)}
                    style={{ padding: 10, borderWidth: 1, borderRadius: 5, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY, fontFamily: 'outfit' }}
                />
                <TextInput
                    placeholder='About'
                    onChangeText={(text) => setAbout(text)}
                    multiline={true}
                    numberOfLines={5}
                    style={{ textAlignVertical: 'top', padding: 10, borderWidth: 1, borderRadius: 5, fontSize: 17, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY, fontFamily: 'outfit', height: 100 }}
                />
                <View style={{ borderWidth: 1, borderRadius: 5, backgroundColor: '#fff', marginTop: 10, borderColor: Colors.PRIMARY }}>
                    <DropDownPicker
                        open={open}
                        value={category}
                        items={categories}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setCategories}
                        placeholder="Category"
                        placeholderStyle={{ color: Colors.GRAY }}
                        style={{ width: '100%', height: 50, borderWidth: 0, borderColor: Colors.PRIMARY, zIndex: 1000 }}
                    />
                </View>
            </View>

            <View style={{ marginTop: 20 }} >
                <TouchableOpacity disabled={loading} onPress={onSubmit} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15 }} >
                    {
                        loading
                            ?
                            <ActivityIndicator size='large' color='#fff' />
                            :
                            <Text style={{ textAlign: 'center', fontFamily: 'outfit', color: '#fff' }} >
                                Add New Business
                            </Text>
                    }
                </TouchableOpacity>
            </View>

            <View style={{ height: 50 }} />

        </ScrollView>
    )
}

export default AddBusiness