import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Context } from '../context/Bill/BillContext'
import { useNavigation } from '@react-navigation/native';

const BillTable = () => {
    const { state, deleteBill } = useContext(Context);
    const navigation = useNavigation();

    const handleDeleteBill = (id) => {
        deleteBill(id);
        // console.log("deleting bill", id);
    }

    return (
        <FlatList
            data={state}
            scrollEnabled
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Display', {
                        id: item.id
                    })
                }}>
                    <View style={styles.viewStyles}>
                        <View>
                            <Text style={styles.headerCustomer}>{item.customerName}</Text>
                            <Text>Amount: {item.amount}</Text>
                            <Text>Date: {item.date}</Text>
                        </View>
                        <View style={styles.binStyles}>
                            <TouchableOpacity onPress={() => handleDeleteBill(item.id)}>
                                <Ionicons name="trash-bin" size={32} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity >
            }
        />
    )
}

export default React.memo(BillTable);

const styles = StyleSheet.create({
    viewStyles: {
        borderWidth: 0.3,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerCustomer: {
        fontSize: 20,
    },
    binStyles: {
        paddingTop: 10
    },
    topBarStyles: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 0.4
    },
    dropdownStyles: {
        width: "75%",
        display: 'flex'
    }
})