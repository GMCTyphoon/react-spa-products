import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import styles from './CreateProductForm.module.css';

interface CreateProductFormProps {
  method?: string;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ method }) => {
  const navigate = useNavigate();
  const { addProduct } = useFetchProducts();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
    isLiked: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Название должно быть не менее 3 символов';
    }
    
    if (!formData.price) {
      newErrors.price = 'Цена обязательна';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Цена должна быть положительным числом';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Описание должно быть не менее 10 символов';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Ссылка на изображение обязательна';
    } else if (!/^https?:\/\/.+\..+/.test(formData.image)) {
      newErrors.image = 'Введите корректную ссылку';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Категория обязательна';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price),
      };
      await addProduct(newProduct);
      navigate('/products'); //при создании продукта и перескакивании на главную страницу, продукты подтягиваются с фейкового API, а мы только фейково добавляем новый продукт, поэтому список не изменяется 
    } catch (error) {
      console.error('Ошибка при создании продукта:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit} method={method}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Название"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? styles.errorInput : ''}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>
        
        <div>
          <input
            type="number"
            name="price"
            placeholder="Цена"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? styles.errorInput : ''}
          />
          {errors.price && <span className={styles.error}>{errors.price}</span>}
        </div>
        
        <div>
          <textarea
            name="description"
            placeholder="Описание"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? styles.errorInput : ''}
          />
          {errors.description && <span className={styles.error}>{errors.description}</span>}
        </div>
        
        <div>
          <input
            type="text"
            name="image"
            placeholder="Ссылка на изображение"
            value={formData.image}
            onChange={handleChange}
            className={errors.image ? styles.errorInput : ''}
          />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </div>
        
        <div>
          <input
            type="text"
            name="category"
            placeholder="Категория"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? styles.errorInput : ''}
          />
          {errors.category && <span className={styles.error}>{errors.category}</span>}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Создание...' : 'Создать'}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;