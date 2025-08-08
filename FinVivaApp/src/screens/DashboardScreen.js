import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function DashboardScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={style.title}>Olá, bem-vindo ao FinViva!</Text>
            <Text style={styles.subtitle}>Saúde Financeira</Text>

            <View style={styles.healthBox}>
                <Text style={styles.healthScore}>82</Text>
                <Text style={styles.healthLabel}>Saúde Financeira</Text>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card}>
                    <FontAwesome5 name="wallet" size={28} color="#22C55E" />
                    <Text style={styles.cardTitle}>Despesas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <MaterialIcons name='savings' size={28} color="#22C55E" />
                    <Text style={styles.cardTitle}>Guardar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <FontAwesome5 name="cart-line" size={28} color="#22C55E" />
                    <Text style={styles.cardTitle}>Gráficos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <MaterialIcons name='school' size={28} color="#22C55E" />
                    <Text style={styles.cardTitle}>Cursos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CadastroDespesa')}>
                    <FontAwesome5 name="wallet" size={28} color="#22C55E" />
                    <Text style={styles.cardTitle}>Despesa</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0F1D3D',
        flexGrow: 1,
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#E5E7EB',
        textAlign: 'center',
        marginBottom: 30,
    },
    healthBox: {
        backgroundColor: '#1F2A48',
        width: '100%',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        marginBottom: 30,
    },
    healthScore: {
        fontSize: 48,
        color: '#22C55E',
        fontWeight: 'bold',
    },
    healthLabel: {
        fontSize: 16,
        color: '#E5E7EB',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    card: {
        width: '47%',
        backgroundColor: '#1F2A48',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        color: '#ffffff',
        marginTop: 10,
        fontSize: 14,
        textAlign: 'center',
    },
});