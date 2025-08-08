import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker, Switch } from 'react-native';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CadastroDespesaScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('Essenciais');
    const [vencimento, setVencimento] = useState('');
    const [lembrete, setLembrete] = useState(true);
    const [obs, setObservacao] = useState('');

    const salvarDespesa =  async () => {
        if(!nome || !valor || !vencimento) {
            Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
            return;
        }

    try {
        await addDoc(collection(db, 'despesas'), {
            nome,
            valor: parseFloat(valor),
            categoria,
            vencimento: Timestamp.fromDate(new Date(vencimento)),
            lembrete,
            obs,
            criadoEm: Timestamp.now(),
        });
        Alert.alert('Sucesso','Despesa cadastrada com sucesso!');
        navigation.goBack();
        } catch (e) {
            Alert.alert('Erro', e.message);
        } 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nova Despesa</Text>
            <TextInput placeholder="Nome da Despesa" style={styles.input} value={nome} onChangeText={setNome}/>
            <TextInput placeholder="Valor" style={styles.input} value={valor} onChangeText={setValor} keyboardType="decimal-pad" />
            <TextInput placeholder="Data de Vencimento (AAAA-MM-DD)" style={styles.input} value={vencimento} onChangeText={setVencimento} />

            <View style={styles.row}>
                <Text style={styles.label}>Lembrete</Text>
                <Switch value={lembrete} onValueChange={setLembrete} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Categoria</Text>
                <Picker selectedValue={categoria} onValueChange={setCategoria} style={styles.picker}>
                    <Picker.Item label="Essenciais" value="Essenciais" />
                    <Picker.Item label="Variáveis" value="Variáveis" />
                    <Picker.Item label="Lazer" value="Lazer" />
                    <Picker.Item label="Outros" value="Outros" />
                </Picker>
            </View>

            <TextInput placeholder="Observações" style={styles.input} value={obs} onChangeText={setObservacao} multiline />

            <TouchableOpacity style={styles.button} onPress={salvarDespesa}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{ flex: 1, padding: 20, backgroundColor: '#0F1D3D'},
    title: { fontSize: 24, color: '#22C55E', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 15 },
    button: { backgroundColor: '#22C55E', padding: 15, borderRadius: 10 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    label: { color: '#fff', fontSize: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    picker: { backgroundColor: '#fff', flex: 1, marginLeft: 10, borderRadius: 8 },
});