import { View, Text, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Business } from '@/interfaces'
import { Rating } from 'react-native-ratings'
import { TextInput } from 'react-native-gesture-handler'
import { Colors } from '@/constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/configs/firebase'
import { useUser } from '@clerk/clerk-expo'

const Review = ({ business }: { business: Business }) => {

    const { user } = useUser()

    const [rating, setRating] = useState(4)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        try {
            if (!input || !rating) return;

            const review = {
                comment: input,
                rating,
                userName: user?.fullName,
                userImage: user?.imageUrl,
                userEmail: user?.primaryEmailAddress?.emailAddress
            };

            const businessReviews = business?.reviews || [];

            setLoading(true);

            const docRef = doc(db, 'BusinessLists', business?.id as string);
            await updateDoc(docRef, { reviews: arrayUnion(review, ...businessReviews) });

            ToastAndroid.show('Review submitted successfully', ToastAndroid.TOP);

            setInput('');
            setRating(4);

            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }


    return (
        <View style={{ backgroundColor: '#fff', padding: 20 }} >
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >Review</Text>

            <View>
                <Rating
                    showRating={false}
                    imageSize={20}
                    onFinishRating={(rating: number) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder='Write a review'
                    numberOfLines={4}
                    value={input}
                    onChangeText={value => setInput(value)}
                    style={{ borderWidth: 1, padding: 10, borderRadius: 10, borderColor: Colors.GRAY, textAlignVertical: 'top' }}
                />

                <TouchableOpacity
                    disabled={!input || loading}
                    style={{ marginTop: 10, padding: 10, backgroundColor: Colors.PRIMARY, borderRadius: 6 }}
                    onPress={onSubmit}
                >
                    <Text style={{ fontFamily: 'outfit', color: '#fff', textAlign: 'center' }} >
                        {loading ? 'Submitting...' : 'Submit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={business?.reviews || []}
                renderItem={({ item, index }) => (
                    <View key={index} style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', padding: 10, borderWidth: 1, borderColor: Colors.GRAY, borderRadius: 15, marginTop: 10 }} >
                        <Image source={{ uri: item?.userImage }} style={{ width: 50, height: 50, borderRadius: 999 }} />
                        <View>
                            <Text style={{ fontFamily: 'outfit-bold' }} >{item?.userName}</Text>
                            <Rating imageSize={20} ratingCount={item?.rating} style={{ alignItems: 'flex-start' }} />
                            <Text>{item?.comment}</Text>
                        </View>
                    </View>
                )}
            />

        </View>
    )
}

export default Review