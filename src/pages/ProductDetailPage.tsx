import React from 'react';
import { useParams } from 'react-router-dom';
import PageContent from '../components/PageContent/PageContent';
import ProductItem from '../components/ProductItem/ProductItem';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContent title="Детали продукта">
      <ProductItem productId={id || ''} />
    </PageContent>
  );
};

export default ProductDetailPage;
