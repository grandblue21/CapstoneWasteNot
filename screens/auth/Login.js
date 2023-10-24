import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Image, Text, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import InputIcon from '../../components/auth/InputIcon';
import FirebaseApp from '../../helpers/FirebaseApp';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

const Login = ({ navigation }) => {

    // Set Variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Set Functions
    const handleLoginPress = async () => {

        // Dismiss keyboard
        Keyboard.dismiss();

        // Set Firebase App Instance
        const FBApp = new FirebaseApp();

        // Signed in 
        const q = query(collection(FBApp.firestore(), 'users'), where('username', '==', username), limit(1));
        const userSnapshot = await getDocs(q);

        let user;

        // Get User
        userSnapshot.forEach((doc) => user = doc.data());

        // No such user exist
        if (!user) {

            // Empty password
            setPassword('');

            // Show notif
            ToastAndroid.showWithGravity('Invalid login attempt', ToastAndroid.LONG, ToastAndroid.TOP);

            return false;
        }

        // Sign In
        signInWithEmailAndPassword(FBApp.auth(), user.email, password).then((userCredential) => {
            
            // Show notif
            ToastAndroid.showWithGravity('Welcome back, ' + [user.first_name, user.last_name].join(' '), ToastAndroid.LONG, ToastAndroid.TOP);
        })
        .catch((error) => {

            // Empty password
            setPassword('');

            // Show notif
            ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.TOP);
        });
    }

    return (  
        <KeyboardAvoidingView style={styles.container}>

            <View behavior={'height'} style={styles.body}>

                {/* Header */}
                <View style={styles.headerWrapper}>
                    <Image source={require('../../assets/logos/normal.png')} style={styles.headerImage}></Image>
                </View>
                <Text style={styles.headerText}>Login</Text>

                {/* Fields */}
                <InputIcon icon={'user-circle-o'} placeholder={'Username'} value={username} setValue={setUsername}  isSlimIcon={false} />
                <InputIcon icon={'lock'} placeholder={'Password'} value={password} setValue={setPassword} isSecure={true} />

                {/* Login */}
                <TouchableOpacity style={styles.login} onPress={handleLoginPress}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <Text style={{fontSize: 12}}>Forgot Password?</Text>

            </View>

            <View style={styles.foot}>
                <View style={{flexDirection: 'row'}}>
                    {/* Don't have any account yet */}
                    <Text style={{fontSize: 12, marginRight: 5}}>Don't have any account yet?</Text>
                    <Text style={{fontSize: 12, textDecorationLine: 'underline', color: '#389F4F'}} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
                </View>
            </View>

        </KeyboardAvoidingView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-60%'
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    login: {
        height: 40,
        width: 258,
        backgroundColor: '#389F4F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Login;