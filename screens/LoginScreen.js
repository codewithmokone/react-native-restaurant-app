import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth, db } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { setUserDetails } from '../redux/slices/userDetailsSlice';
import { collection, doc, getDoc } from 'firebase/firestore';

function LoginScreen() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userId, setUserId] = useState();

    const navigation = useNavigation()

    const dispatch = useDispatch()

    // Handles user login
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            let userId = user.uid
            setUserId(userId)
            dispatch(setUser(userId))
        } catch (err) {
            console.log('Error login in ', err)
        }
    }

    const fetchUserInfo = async () => {

        console.log("Signed in user: ", userId)
        
        if (userId) {
            try {
                const userCollection = collection(db, 'users');
                const userDocRef = doc(userCollection, userId);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    // console.log("Logged In Screen: ", userData)
                    dispatch(setUserDetails(userData));
                } else {
                    console.log('Failed to get user infromation');
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.heading} >
                    <Text style={{ fontSize: 25, color: 'white' }}>Login to Account</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 40 }}>
                    <Text>Haven't registered? </Text>
                    <Pressable
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: 'blue' }}>Sign Up</Text>
                    </Pressable>
                </View>
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter your email"
                        onChangeText={text => setEmail(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder=" Enter your password"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Pressable style={{ width: 310, height: 40, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={handleLogin}>
                        <Text style={{ color: 'green', fontSize: 20 }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#52A63C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        marginBottom: 20
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    loginNavLink: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    inputSection: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        height: 45,
        marginBottom: 15,
    },
});