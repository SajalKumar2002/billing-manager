import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { Context } from '../context/Product/ProductContext';

const ProductForm = ({ save, id }) => {
    const { state } = useContext(Context);

    const [item, setItem] = useState({
        itemName: "",
        itemPrintName: ""
    })

    useEffect(() => {
        if (id !== "") {
            const [stateItem] = state.filter((item) => item.id === id)
            if (stateItem) {
                setItem(stateItem)
            }
        } else {
            setItem({
                itemName: "",
                itemPrintName: ""
            })
        }
    }, [])


    const handleChange = (name, value) => {
        setItem({
            ...item,
            [name]: value
        })
    }

    return (
        <>
            <Text style={styles.headerStyles}>Create Product</Text>
            <View style={styles.productStyles}>
                <TextInput
                    label='Enter Product Name'
                    mode='outlined'
                    value={item.itemName}
                    onChangeText={(value) => handleChange("itemName", value)}
                />
                <TextInput
                    label='Enter Print Name'
                    mode='outlined'
                    value={item.itemPrintName}
                    onChangeText={(value) => handleChange("itemPrintName", value)}
                />
            </View>
            <Button
                onPress={() => save(item)}
                disabled={item.itemName === "" || item.itemPrintName === ""}
            >Save</Button>
        </>
    )
}

ProductForm.defaultProps = {
    id: ""
}

export default ProductForm;

const styles = StyleSheet.create({
    modalContainerStyle: {
        backgroundColor: 'white',
        width: '80%',
        paddingVertical: 60,
        paddingHorizontal: 15,
        alignSelf: 'center',
        display: 'flex',
        borderRadius: 15,
    },
    headerStyles: {
        fontSize: 20,
        alignSelf: 'center',
        marginVertical: 10
    },
    productStyles: {
        marginHorizontal: 15
    }
})