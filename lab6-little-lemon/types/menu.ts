export type MenuCategory = 'starters' | 'mains' | 'sides' | 'desserts';

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
};

export type CategoryInfo = {
  key: MenuCategory;
  title: string;
};
