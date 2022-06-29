import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather as Icon } from '@expo/vector-icons';

import Database from './Database';

export default function AppForm({ route, navigation }) {

    //const id = route.params ? route.params.id : undefined;
    const [id, setId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');

    useEffect(() => {
        if(!route.params) return;
        setId(route.params.id);
        setDescricao(route.params.descricao);
        setQuantidade(route.params.quantidade.toString());
    }, [route])

    function handleDescriptionChange(descricao) {
        setDescricao(descricao);
    }

    function handleQuantityChange(quantidade) {
        setQuantidade(quantidade);
    }

    async function handleButtonPress() {
        const listItem = {descricao, quantidade: parseInt(quantidade)};

        Database.saveItem(listItem, id)
            .then(response => {
                setId('');
                setDescricao('');
                setQuantidade('');
                navigation.navigate("AppList", listItem);
            })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Item para comprar</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={handleDescriptionChange}
                    placeholder="o que está faltando em casa?"
                    clearButtonMode="always" 
                    value={descricao}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleQuantityChange}
                    placeholder="digite a quantidade"
                    keyboardType={'numeric'}
                    clearButtonMode="always"
                    value={quantidade.toString()}
                />
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <View style={styles.buttonContainer}>
                        <Icon name="save" color="white" size={22} />
                        <Text style={styles.buttonText}>Salvar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <StatusBar styles='light' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D93600',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderToprightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#FFFFFF'
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    button: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
})

