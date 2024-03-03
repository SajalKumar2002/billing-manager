import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

const ProductsTable = ({ bill, setBill, editable, setInitialItemDetails }) => {
    const deleteProduct = (id) => {
        try {
            setBill(prevBill => ({
                ...prevBill,
                products: (prevBill.products).filter((item) => item.id !== id)
            }))
        } catch (error) {
            console.error(error);
        }
    }

    const handleClickItem = (item) => {
        setInitialItemDetails(item)
    }

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Sr. No.</DataTable.Title>
                <DataTable.Title>Product</DataTable.Title>
                <DataTable.Title>Quantity</DataTable.Title>
                <DataTable.Title>Rate</DataTable.Title>
                <DataTable.Title>Price</DataTable.Title>
                <DataTable.Title>{""}</DataTable.Title>
            </DataTable.Header>
            {(bill.products).map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleClickItem(item)} disabled={!editable} >
                    <DataTable.Row>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>{item.item}</DataTable.Cell>
                        <DataTable.Cell>{item.quantity + " " + item.unit}</DataTable.Cell>
                        <DataTable.Cell>{item.rate}</DataTable.Cell>
                        <DataTable.Cell>{item.price}</DataTable.Cell>
                        <DataTable.Cell>
                            <TouchableOpacity onPress={() => deleteProduct(item.id)} disabled={!editable}>
                                <Ionicons name="trash-bin" size={24} color="black" />
                            </TouchableOpacity>
                        </DataTable.Cell>
                    </DataTable.Row>
                </TouchableOpacity>
            ))}
        </DataTable>
    )
}

ProductsTable.defaultProps = {
    // products: []
    bill: {
        products: []
    },
    editable: true
}

export default React.memo(ProductsTable);
