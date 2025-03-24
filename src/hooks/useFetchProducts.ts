import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setProducts,
  setLoading,
  setError,
  removeProduct,
  updateProduct,
  addProduct as addProductAction,
} from '../features/products/productsSlice';
import { Product } from '../features/products/productsTypes';

export const useFetchProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));

      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Не удалось загрузить товары');
        }

        const data = await response.json();

        const formattedProducts: Product[] = data.map((product: Product) => ({
          id: product.id.toString(),
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category,
          isLiked: false,
        }));
        console.log(formattedProducts)
        dispatch(setProducts(formattedProducts));
      } catch (err) {
        console.error('Ошибка при загрузке товаров:', err);
        dispatch(
          setError('Ошибка при загрузке товаров. Пожалуйста, попробуйте снова.')
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Не удалось удалить продукт');
      }

      dispatch(removeProduct(productId));
    } catch (err) {
      console.error('Ошибка при удалении продукта:', err);
      throw err;
    }
  };

  const editProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${updatedProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error('Не удалось обновить продукт');
      }

      const data = await response.json();
      console.log(data);
      // dispatch(updateProduct(data)); //чтобы изменить данные на сервере по настоящему а не на фейковом API
      dispatch(updateProduct(updatedProduct)); //для наглядности чтобы было видно в списке измененный продукт
    } catch (err) {
      console.log('Ошибка при редактировании продукта:', err);
      throw err;
    }
  };

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Не удалось добавить продукт');
      }

      const data = await response.json();
      const productWithId: Product = {
        ...newProduct,
        id: data.id.toString(),
        isLiked: false,
      };
      dispatch(addProductAction(productWithId));
      console.log(productWithId);
      return productWithId;
    } catch (err) {
      console.error('Ошибка при добавлении продукта:', err);
      throw err;
    }
  };

  return { deleteProduct, editProduct, addProduct };
};
