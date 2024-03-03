import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Button } from 'react-native-paper';

import BillForm from '../../components/BillForm';
import ProductsTable from '../../components/ProductsTable';
import TotalAmount from '../../components/TotalAmount';

import { Context } from '../../context/Bill/BillContext';

const EditBill = ({ navigation, route }) => {
  const { state, updateBill } = useContext(Context);

  const { id } = route.params;

  const initialBillData = {
    customerName: "",
    products: [],
    amount: "0"
  }

  const [bill, setBill] = useState(initialBillData);

  const [initialItemDetails, setInitialItemDetails] = useState({
    item: "",
    quantity: "1",
    unit: "",
    rate: "",
    price: ""
  })

  const initialiseBill = () => {
    setBill(
      state.find(bill => bill.id === id)
    )
  }

  const handleUpdateButton = () => {
    updateBill(bill, () => navigation.navigate('Home'));
  }

  const SaveButton = React.memo(({ bill }) => (
    <Button
      mode='text'
      disabled={bill.products.length === 0 || bill.customerName.length === 0}
      onPress={handleUpdateButton}
    >
      Save
    </Button>
  ))

  useEffect(() => {
    initialiseBill();
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SaveButton bill={bill} />
    })
  }, [bill])

  if (bill.customerName === '' && bill.products.length === 0) {
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.createViewStyles}>
      <BillForm
        bill={bill}
        setBill={setBill}
        initialItemDetails={initialItemDetails}
      />
      <ProductsTable
        bill={bill}
        setBill={setBill}
        setInitialItemDetails={setInitialItemDetails}
      />
      <TotalAmount products={bill.products} setBill={setBill} />
    </View>
  )
}

export default EditBill

const styles = StyleSheet.create({
  createViewStyles: {
    paddingHorizontal: 15,
  }
})