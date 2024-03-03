import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Context } from '../../context/Product/ProductContext';
import ItemTable from '../../components/ItemTable';

const Home = ({ navigation }) => {
  const {
    getAllProducts
  } = useContext(Context);

  const CreateButton = React.memo(() => (
    <TouchableOpacity onPress={() => navigation.navigate('Create')}>
      <Feather name='plus' size={24} color='black' />
    </TouchableOpacity>
  ));

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <CreateButton />
    });
  }, [])

  useFocusEffect(
    useCallback(() => {
      getAllProducts()
    }, [])
  )

  return (
    <View style={styles.viewStyles}>
      <ItemTable />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  viewStyles: {
    margin: 10
  }
})