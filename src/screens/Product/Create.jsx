import React, { useContext } from 'react';
import { Context } from '../../context/Product/ProductContext';
import ProductForm from '../../components/ProductForm';

const Edit = ({ navigation }) => {
  const { addProduct } = useContext(Context);

  return (
    <ProductForm
      save={(value) => addProduct(value, () => navigation.popToTop())}
    />
  )
}

export default Edit
