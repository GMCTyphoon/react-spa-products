import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import ProductCard from '../ProductCard/ProductCard';
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter';
import EditProductForm from '../EditProductForm/EditProductForm';
import { Product } from '../../features/products/productsTypes';
import Pagination from '../Pagination/Pagination';
import styles from './ProductsList.module.css';

const ITEMS_PER_PAGE = 3; // Количество продуктов на странице

const ProductsList: React.FC = () => {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { deleteProduct, editProduct } = useFetchProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = items;

    if (showFavorites) {
      result = result.filter((product) => product.isLiked);
    }

    return result.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, showFavorites, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = async (updatedProduct: Product) => {
    try {
      await editProduct(updatedProduct);
      setEditingProduct(null);
    } catch (err) {
      console.error('Ошибка при редактировании продукта:', err);
      setEditError('Не удалось сохранить изменения');
      throw err;
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, showFavorites]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div>
      <div className={styles.filters}>
        <SearchAndFilter
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          categories={[
            'all',
            ...new Set(items.map((product) => product.category)),
          ]}
        />
        <div className={styles.toggleFavorites}>
          <button
            onClick={() => setShowFavorites(false)}
            className={!showFavorites ? styles.activeFilter : ''}
          >
            Все продукты
          </button>
          <button
            onClick={() => setShowFavorites(true)}
            className={showFavorites ? styles.activeFilter : ''}
          >
            Избранное
          </button>
        </div>
      </div>
      {editingProduct ? (
        <EditProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
          error={editError}
        />
      ) : (
        <>
          <div className={styles.list}>
            {paginatedProducts.length === 0 ? (
              <div className={styles.noProducts}>
                {showFavorites
                  ? 'В избранное ничего не добавлено.'
                  : 'Продукты не найдены.'}
              </div>
            ) : (
              paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={deleteProduct}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className={styles.paginationWrapper}
          />
        </>
      )}
    </div>
  );
};

export default ProductsList;
