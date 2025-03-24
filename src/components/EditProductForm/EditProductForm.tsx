import React, { useState } from 'react';
import { Product } from '../../features/products/productsTypes';
import styles from './EditProductForm.module.css';

interface EditProductFormProps {
  product: Product;
  onSave: (updatedProduct: Product) => Promise<void>; // Теперь возвращает Promise
  onCancel: () => void;
  error?: string | null;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSave,
  onCancel,
  error: serverError,
}) => {
  const [formData, setFormData] = useState<Product>(product);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false); // Состояние загрузки

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Минимум 3 символа';
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Цена должна быть больше 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Минимум 10 символов';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Ссылка на изображение обязательна';
    } else if (!/^https?:\/\/.+\..+/.test(formData.image)) {
      newErrors.image = 'Некорректный URL изображения';
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
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.editForm}>
      <h2>Редактировать продукт</h2>

      {serverError && <div className={styles.serverError}>{serverError}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Название</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? styles.errorInput : ''}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Цена</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0.01"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? styles.errorInput : ''}
          />
          {errors.price && <span className={styles.error}>{errors.price}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? styles.errorInput : ''}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Ссылка на изображение</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={errors.image ? styles.errorInput : ''}
          />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Категория</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? styles.errorInput : ''}
          />
          {errors.category && (
            <span className={styles.error}>{errors.category}</span>
          )}
        </div>

        <div className={styles.buttons}>
          <button type="button" onClick={onCancel} disabled={isSaving}>
            Отмена
          </button>
          <button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <span className={styles.spinner}></span>
                Сохранение...
              </>
            ) : (
              'Сохранить'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
