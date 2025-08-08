import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const navigation = useNavigation();

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
            collection(db, "transactions"),
            where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTransactions(data);
            calculateBalance(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    constCalculateBalance = (data) => {
        const total = data.reduce((acc, item) => {
            return item.type === "income" ? acc + item.amount : acc - item.amount;
        }, 0);
        setBalance(total);
    };

    const renderItem = (item) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.description}</Text>
            <Text style={[styles.amount, { color: item.type === 'income' ? 'green' : 'red' }]}>R$ {item.amount.toFixed(2)}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#00bcd4" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>FinViva</Text>
            <Text style={styles.balanceLabel}>Saldo Total</Text>
            <Text style={styles.balance}>R$ {balance.toFixed(2)}</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTransaction')}>
                <MaterialIcons name="add-circle" size={40} color="#00bcd4" />
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Últimas transações</Text>
            <FlatList data={transactions.slice(0,5)} keyExtractor={(item) => item.id} renderItem={renderItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00bcd4',
        marginBottom: 10,
    },
    balanceLabel: {
        fontSize: 16,
        color: '#555',
    },
    balance:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    selectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 16,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        top: 45,
        right: 20,
        zIndex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;