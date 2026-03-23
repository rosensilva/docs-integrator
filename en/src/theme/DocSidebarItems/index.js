import { useState, useCallback } from 'react';
import DocSidebarItems from '@theme-original/DocSidebarItems';
import styles from './styles.module.css';

// Detect the connector catalog items list by inspecting the items themselves.
// This is more reliable than checking `level` or `pathname`.
function isConnectorCatalogItems(items) {
  if (items.length < 5) return false;
  return items.some(
    (item) =>
      item.type === 'category' &&
      item.href?.includes('/connectors/catalog/'),
  );
}

export default function DocSidebarItemsWrapper({ items, ...props }) {
  const [query, setQuery] = useState('');

  const showSearch = isConnectorCatalogItems(items);

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const filteredItems =
    showSearch && query
      ? items.filter((item) => {
          if (!item.label) return true;
          return item.label.toLowerCase().includes(query.toLowerCase());
        })
      : items;

  return (
    <>
      {showSearch && (
        <li className={`menu__list-item ${styles.searchItem}`}>
          <input
            type="search"
            placeholder="Search connectors…"
            className={styles.searchInput}
            value={query}
            onChange={handleSearch}
            aria-label="Search connectors"
          />
          {query && filteredItems.length === 0 && (
            <p className={styles.noResults}>No connectors found</p>
          )}
        </li>
      )}
      <DocSidebarItems items={filteredItems} {...props} />
    </>
  );
}
