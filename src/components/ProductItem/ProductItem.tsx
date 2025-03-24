import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css';

interface ProductItemProps {
  productId: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ productId }) => {
  useFetchProducts(); 
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const product = items.find((p) => p.id === productId);

  if (loading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!product) {
    return <div className={styles.error}>Продукт не найден</div>;
  }

  return (
    <div className={styles.item}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h1 className={styles.title}>{product.title}</h1>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>Цена: ${product.price}</p>
      <Link to="/products" className={styles.button}>
        Вернуться к списку продуктов
      </Link>
    </div>
  );
};

export default ProductItem;