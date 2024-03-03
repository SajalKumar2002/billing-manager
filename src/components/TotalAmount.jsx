import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const TotalAmount = ({ products, setBill }) => {
    const totalAmount = products.reduce((total, product) => {
        return total + +product.price
    }, 0)

    useEffect(() => {

        setBill((prevItem) => ({
            ...prevItem,
            amount: totalAmount
        }))
    }, [products])

    return (
        <View>
            <Text>Total Amount: {totalAmount}</Text>
        </View>
    )
}

TotalAmount.defaultProps = {
    products: []
}

export default React.memo(TotalAmount)