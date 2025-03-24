import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import PageContent from '../components/PageContent/PageContent';
import ProductsList from '../components/ProductsList/ProductsList';

const ProductsPage: React.FC = () => {
  useFetchProducts();

  return (
    <PageContent title="Продукты">
      <ProductsList />
    </PageContent>
  );
};

export default ProductsPage;