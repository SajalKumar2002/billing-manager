import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { DataTable, Searchbar } from 'react-native-paper';
import { Context } from '../context/Product/ProductContext';
import { useNavigation } from '@react-navigation/native';


const ItemTable = () => {
    const navigation = useNavigation();
    const { state, deleteProduct } = useContext(Context);
    // console.log("state", state);

    const [itemList, setItemList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => setItemList(state), [state])

    const filteredItems = useCallback(() => {
        if (searchQuery === "") {
            setItemList(state);
        } else {
            const itemArray = state.filter((item) => (item.itemName).includes(searchQuery))
            setItemList(itemArray);
        }
    }, [searchQuery])

    useEffect(() => {
        filteredItems();
    }, [filteredItems])

    return (
        <>
            <Searchbar
                placeholder='Search'
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={{ backgroundColor: 'white' }}
            />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Sr. No.</DataTable.Title>
                    <DataTable.Title>Label</DataTable.Title>
                    <DataTable.Title>Print name</DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>
                {itemList.map((item, index) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate("Edit", { id: item.id})}>
                        <DataTable.Row>
                            <DataTable.Cell>{index + 1}</DataTable.Cell>
                            <DataTable.Cell>{item.itemName}</DataTable.Cell>
                            <DataTable.Cell>{item.itemPrintName}</DataTable.Cell>
                            <DataTable.Cell>
                                <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                                    <Ionicons name="trash-bin" size={24} color="black" />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </TouchableOpacity>
                ))}
            </DataTable>
        </>
    )
}

export default ItemTable