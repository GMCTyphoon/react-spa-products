import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../../features/products/productsTypes';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaEdit } from 'react-icons/fa';
import { toggleLike } from '../../features/products/productsSlice';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onDelete: (productId: string) => Promise<void>;
  onEdit: (product: Product) => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await onDelete(product.id);
    } catch (err) {
      console.log(err)
      setDeleteError('Не удалось удалить продукт. Попробуйте снова.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(product); 
  };

  return (
    <div className={styles.card}>
      <Link to={`/products/${product.id}`} className={styles.cardLink}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
      </Link>
      <button
        className={`${styles.likeButton} ${product.isLiked ? styles.liked : ''}`}
        onClick={handleLikeClick}
        aria-label={product.isLiked ? 'Убрать лайк' : 'Поставить лайк'}
      >
        <FaHeart />
      </button>
      <button
        className={styles.editButton}
        onClick={handleEditClick}
        aria-label="Редактировать продукт"
      >
        <FaEdit />
      </button>
      <button
        className={styles.deleteButton}
        onClick={handleDeleteClick}
        aria-label="Удалить продукт"
        disabled={isDeleting}
      >
        {isDeleting ? 'Удаление...' : <FaTrash />}
      </button>
      {deleteError && <div className={styles.deleteError}>{deleteError}</div>}
    </div>
  );
};

export default React.memo(ProductCard);