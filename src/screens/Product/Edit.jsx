import React, { useContext } from 'react';
import { Context } from '../../context/Product/ProductContext';
import ProductForm from '../../components/ProductForm';

const Edit = ({ navigation, route }) => {
  const { id } = route.params;
  const { updateProduct } = useContext(Context);

  return (
    <ProductForm
      save={(value) => updateProduct(value, () => navigation.popToTop())}
      id={id}
    />
  )
}

export default Edit