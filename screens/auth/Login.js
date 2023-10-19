import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Login = ({ navigation }) => {  
    return (  
        <View style={styles.container}>

            <View style={styles.body}>
                {/* Header */}
                <View style={styles.headerWrapper}>
                    <Image source={require('../../assets/logos/normal.png')} style={styles.headerImage}></Image>
                </View>
                <Text style={styles.headerText}>Login</Text>

                {/* Fields */}
                <View style={styles.inputIconWrapper}>
                    <FontAwesome name={'user-circle-o'} style={styles.inputIconUsername}/>
                    <TextInput style={styles.input} placeholder={'Username'}/>
                </View>
                <View style={styles.inputIconWrapper}>
                    <FontAwesome name={'lock'} style={Object.assign(styles.inputIconPassword)}/>
                    <TextInput style={styles.input} placeholder={'Password'}/>
                </View>

                {/* Login */}
                <TouchableOpacity style={styles.login}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <Text style={{fontSize: 12}}>Forgot Password?</Text>
            </View>

            <View style={styles.foot}>
                <View style={{flexDirection: 'row'}}>
                    {/* Don't have any account yet */}
                    <Text style={{fontSize: 12, marginRight: 5}}>Don't have any account yet?</Text>
                    <Text style={{fontSize: 12, textDecorationLine: 'underline', color: '#389F4F'}}>Sign Up</Text>
                </View>
            </View>

        </View>
    );
}

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
    inputIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#389F4F',
        borderRadius: 5,
        marginBottom: 20,
        width: 300,
        elevation: 10
    },
    inputIconUsername: {
        width: 35,
        fontSize: 31,
        marginHorizontal: 10,
        color: '#389F4F'
    },
    inputIconPassword: {
        width: 35,
        fontSize: 31,
        marginHorizontal: 10,
        paddingLeft: 5,
        color: '#389F4F'
    },
    input: {
        height: 45,
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