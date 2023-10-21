import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Text, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import InputIcon from '../../components/auth/InputIcon';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; 
import FirebaseApp from '../../helpers/FirebaseApp';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';

const Register = ({ navigation }) => {

    // Set Variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);

    // Set Functions
    const handleRegisterPress = () => {

        // Dismiss keyboard
        Keyboard.dismiss();

        // Checks if terms and conditions is checked
        if (!isChecked) {

            // Show notif
            ToastAndroid.showWithGravity('Agree on terms and conditions to sign up', ToastAndroid.LONG, ToastAndroid.TOP);

            return false;
        }

        // Register User
        createUserWithEmailAndPassword(FirebaseApp.auth(), email, password).then(async (userCredential) => {

            // Signed up 
            const user = userCredential.user;

            // Set firestore instance
            const db = FirebaseApp.firestore();

            // Add Document
            await addDoc(collection(db, 'users'), {
                user_id: userCredential.user.uid,
                username: username,
                first_name: firstName,
                last_name: lastName,
                address: address,
                email: email
            });
            
            // Show notif
            ToastAndroid.showWithGravity('Registered', ToastAndroid.LONG, ToastAndroid.TOP);

            // Go to login screen
            setTimeout(() => {
                navigation.navigate('Login');
            }, 1000);
        })
        .catch((error) => {

            // Show notif
            ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.TOP);
        });
    }

    return (  
        <KeyboardAvoidingView style={styles.container}>

            {/* Back */}
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <FontAwesome name={'chevron-left'} style={styles.backIcon}/>
            </TouchableOpacity>

            <KeyboardAvoidingView behavior={'height'} style={styles.body}>

                {/* Header */}
                <Text style={styles.headerText}>Sign Up</Text>

                {/* Fields */}
                <InputIcon icon={'user'} placeholder={'Username'} value={username} setValue={setUsername} />
                <InputIcon icon={'user'} placeholder={'First Name'} value={firstName} setValue={setFirstName} />
                <InputIcon icon={'user'} placeholder={'Last Name'} value={lastName} setValue={setLastName} />
                <InputIcon icon={'map-pin'} placeholder={'Address'} value={address} setValue={setAddress} />
                <InputIcon icon={'envelope-o'} placeholder={'Email'} value={email} setValue={setEmail} isSlimIcon={false} />
                <InputIcon icon={'lock'} placeholder={'Password'} value={password} setValue={setPassword} isSecure={true}/>

                <View style={styles.terms}>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}/>
                    <Text style={{fontSize: 12, textAlign: 'center', width: '80%'}}>Check here to indicate that you have read and agree to the terms and conditions.</Text>
                </View>


                {/* Create Account */}
                <TouchableOpacity style={styles.register} onPress={handleRegisterPress}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <Text style={{fontSize: 12}}>Forgot Password?</Text>
                
            </KeyboardAvoidingView>
        
            <View style={styles.foot}>
                <View style={{flexDirection: 'row'}}>
                    {/* Don't have any account yet */}
                    <Text style={{fontSize: 12, marginRight: 5}}>Already have an account?</Text>
                    <Text style={{fontSize: 12, textDecorationLine: 'underline', color: '#389F4F'}} onPress={() => navigation.navigate('Login')}>Sign In</Text>
                </View>
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        height: 33,
        width: 33,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 40,
        borderWidth: 3,
        borderColor: '#097C31',
        borderRadius: 20
    },
    backIcon: {
        fontSize: 17,
        color: '#f8AF21',
        paddingRight: 2
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    foot: {
        marginBottom: 70
    },
    headerWrapper: {
        marginLeft: 'auto'
    },  
    headerImage: {
        height: 122,
        width: 122
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: -20,
        marginBottom: 10,
        alignSelf: 'flex-start'
    },
    terms: {
        flexDirection: 'row',
        width: 250,
        marginBottom: 15
    },
    checkbox: {
        marginRight: 10,
    },
    register: {
        height: 42,
        width: 185,
        backgroundColor: '#389F4F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 19,
        textTransform: 'uppercase'
    }
});

export default Register;