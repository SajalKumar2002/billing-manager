import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useEffect } from 'react';

import { Feather } from '@expo/vector-icons';

import { Context as BillContext } from '../../context/Bill/BillContext';
import { Context as ProductContext } from '../../context/Product/ProductContext';

import BillTable from '../../components/BillTable'

const Home = ({ navigation }) => {
  const { state, getAllBills } = useContext(BillContext);
  const { getAllProducts } = useContext(ProductContext);

  useEffect(() => {
    getAllBills();
    getAllProducts();
  }, [state])

  const HeaderButton = React.memo(() => (
    <TouchableOpacity onPress={() => navigation.navigate('Create')} >
      <Feather name='plus' size={30} />
    </TouchableOpacity>
  ))

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton />
    })
    // console.log("home", state);
  }, [navigation])

  return (
    <BillTable />
  )
}

export default Home

const styles = StyleSheet.create({})