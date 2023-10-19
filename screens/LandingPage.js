import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const LandingPage = ({ navigation }) => {  
    return (  
        <View style={styles.container}>
            {/* Header */}
            <Image source={require('../assets/logos/normal.png')} style={styles.headerImage}></Image>
            <Text style={styles.headerText}>Hello Customer</Text>
            <Text style={styles.headerDescription}>Choose an option</Text>

            {/* Options */}
            <TouchableOpacity style={styles.register}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

        </View>
    );
}  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-80%'
    },
    headerImage: {
        height: 122,
        width: 122
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginVertical: 10
    },
    headerDescription: {
        fontSize: 14,
        marginVertical: 15
    },
    register: {
        height: 48,
        width: 224,
        backgroundColor: '#097C31',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 20,
        elevation: 5
    },
    login: {
        height: 48,
        width: 224,
        backgroundColor: '#4EBC67',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        elevation: 5
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
        textTransform: 'uppercase'
    }
});

export default LandingPage;