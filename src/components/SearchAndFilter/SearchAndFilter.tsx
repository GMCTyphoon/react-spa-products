import React, { useEffect, useState, memo } from 'react';
import styles from './SearchAndFilter.module.css';

interface SearchAndFilterProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  categories,
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearchChange(localSearchQuery);
    }, 300);

    return () => clearTimeout(timerId);
  }, [localSearchQuery, onSearchChange]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Поиск товаров..."
        value={localSearchQuery}
        onChange={(e) => setLocalSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={styles.filterSelect}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SearchAndFilter);
