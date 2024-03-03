import { StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Context } from '../context/Product/ProductContext';
import unitList from '../data/units';

const BillForm = ({ bill, setBill }) => {
    const { state } = useContext(Context);
    const initialItemDetails = {
        item: "",
        quantity: "1",
        unit: unitList[0].value,
        rate: "",
        price: ""
    }
    // Item Details is a object storing all the properties.
    // This represents all the values of a  single item
    // single or multiple items add upto a bill.
    const [itemDetails, setItemDetals] = useState(initialItemDetails)

    // bill: { customerName: "", products: [ {itemDetails},.... ], amount}

    const handleChangeItems = (name, value) => {
        setItemDetals((prevItem) => (
            {
                ...prevItem,
                [name]: value
            }
        ))
    }

    const handleAddItems = () => {
        const id = uuidv4();
        setBill((prevBill) => ({
            ...prevBill,
            products: [
                ...prevBill.products,
                {
                    id,
                    ...itemDetails
                }
            ]
        }))
        setItemDetals(initialItemDetails)
    }

    return (
        <>
            <TextInput
                label='Customer Name'
                style={styles.customerStyle}
                onChangeText={(value) => setBill((bill) => ({ ...bill, 'customerName': value }))}
                value={bill.customerName}
            />
            {/* following code is for item list only */}
            <>
                <Dropdown
                    search
                    searchPlaceholder="Search..."
                    data={state}
                    labelField='itemName'
                    valueField='itemPrintName'
                    searchField='label'
                    value={itemDetails.item}
                    onChange={(selectedItem) => handleChangeItems("item", selectedItem.itemPrintName)}
                    style={styles.dropdownStyle}
                />
                <View style={styles.flexContainer}>
                    <TextInput
                        mode='outlined'
                        label='Quantity'
                        maxLength={4}
                        value={itemDetails.quantity}
                        keyboardType='number-pad'
                        onChangeText={(value) => handleChangeItems("quantity", value)}
                        style={styles.back_white}
                    />
                    <Dropdown
                        data={unitList}
                        placeholder={itemDetails.unit}
                        labelField='label'
                        value={itemDetails.unit}
                        onChange={(itemUnit) => handleChangeItems("unit", itemUnit.value)}
                        style={styles.unitDropStyles}
                    />
                    <TextInput
                        mode='outlined'
                        label='Rate'
                        value={itemDetails.rate}
                        keyboardType='number-pad'
                        maxLength={6}
                        onChangeText={(value) => {
                            handleChangeItems("rate", value)
                            handleChangeItems("price", `${+value * +itemDetails.quantity}`)
                        }}
                        style={styles.back_white}
                    />
                </View>
                <TextInput
                    mode='outlined'
                    label='Price'
                    style={[styles.priceStyles, styles.back_white]}
                    value={itemDetails.price}
                    onChangeText={(value) => handleChangeItems('price', value)}
                />
                <Button
                    mode='text'
                    onPress={handleAddItems}
                    style={styles.buttonStyles}
                    disabled={Object.values(itemDetails).some(value => value.length === 0)}
                >Add Item</Button >
            </>
        </>
    )
}

export default React.memo(BillForm)

const styles = StyleSheet.create({
    dropdownStyle: {
        paddingHorizontal: 15,
        backgroundColor: 'white',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    back_white: {
        backgroundColor: 'white',
    },
    customerStyle: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    buttonStyles: {
        marginTop: 10,
    },
    unitDropStyles: {
        width: 100,
        backgroundColor: 'white',
        borderWidth: 0.7,
        borderColor: 'black',
        borderRadius: 4,
        padding: 5,
        marginTop: 6,
        marginHorizontal: 10,
    },
    priceStyles: {
        marginTop: 5,
        borderRadius: 4,
    },
})