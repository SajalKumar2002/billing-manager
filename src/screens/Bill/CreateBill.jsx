import { StyleSheet, View, Text } from 'react-native'
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { Button } from 'react-native-paper';

import { Context } from '../../context/Bill/BillContext';

import ProductsTable from '../../components/ProductsTable';
import BillForm from '../../components/BillForm';
import TotalAmount from '../../components/TotalAmount';

const CreateBill = ({ navigation }) => {
  const { addBill } = useContext(Context)

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

  const saveProducts = () => {
    addBill(bill, () => navigation.pop());
  };

  const SaveButton = React.memo(({ bill }) => (
    <Button
      mode='text'
      disabled={bill.products.length === 0 || bill.customerName.length === 0}
      onPress={saveProducts}
    >
      Save
    </Button>
  ))

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SaveButton bill={bill} />
    });
  }, [bill]);

  return (
    <View style={styles.createViewStyles}>
      <BillForm
        setBill={setBill}
        bill={bill}
        initialItemDetails={initialItemDetails}
      />
      <ProductsTable
        setBill={setBill}
        bill={bill}
        setInitialItemDetails={setInitialItemDetails}
      />
      <TotalAmount products={bill.products} setBill={setBill} />
    </View>
  )
}

export default CreateBill;

const styles = StyleSheet.create({
  createViewStyles: {
    paddingHorizontal: 15,
  }
})
