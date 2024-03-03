import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Feather } from '@expo/vector-icons';

import { Context } from '../../context/Bill/BillContext';
import ProductsTable from '../../components/ProductsTable';

const DisplayBill = ({ route, navigation }) => {
  const { state } = useContext(Context);
  const { id } = route.params;
  const bill = state.find(bill => bill.id === id)

  const EditButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: id })} >
      <Feather name='edit-2' size={24} color='black' />
    </TouchableOpacity>
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <EditButton />
    })
  }, [])

  if (!bill) {
    return <Text>No Bill Found</Text>
  }

  return (
    <View>
      <Text style={styles.topBarStyles} >Customer: {bill.customerName} </Text>
      <ProductsTable bill={bill} editable={false} />
      <Text>Total Amount: ₹{bill.amount}</Text>
    </View>
  )
}

export default DisplayBill

const styles = StyleSheet.create({
  topBarStyles: {
    fontSize: 20,
    borderWidth: 0.3,
    borderColor: 'black',
    paddingLeft: 15,
    paddingVertical: 15,
    margin: 0
  },
})