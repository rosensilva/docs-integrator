import DocSidebarItems from '@theme-original/DocSidebarItems';

export default function DocSidebarItemsWrapper({ items, ...props }) {
  return <DocSidebarItems items={items} {...props} />;
}
