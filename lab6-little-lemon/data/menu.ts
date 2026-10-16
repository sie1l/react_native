import type { CategoryInfo, MenuItem } from '../types/menu';

export const categories: CategoryInfo[] = [
  { key: 'starters', title: 'Закуски' },
  { key: 'mains', title: 'Основні страви' },
  { key: 'sides', title: 'Додатки' },
  { key: 'desserts', title: 'Десерти' },
];

export const menuItems: MenuItem[] = [
  { id: 'hummus', name: 'Хумус', price: 85, category: 'starters' },
  { id: 'mutabal', name: 'Мутабал', price: 95, category: 'starters' },
  { id: 'falafel', name: 'Фалафель', price: 110, category: 'starters' },
  { id: 'olives', name: 'Мариновані оливки', price: 75, category: 'starters' },
  { id: 'kofta', name: 'Кофта', price: 125, category: 'starters' },
  { id: 'eggplant', name: 'Салат із баклажанів', price: 105, category: 'starters' },
  { id: 'lentil-burger', name: 'Сочевичний бургер', price: 145, category: 'mains' },
  { id: 'salmon', name: 'Лосось', price: 245, category: 'mains' },
  { id: 'kofta-burger', name: 'Кофта-бургер', price: 165, category: 'mains' },
  { id: 'kebab', name: 'Кебаб', price: 195, category: 'mains' },
  { id: 'fries', name: 'Картопля фрі', price: 65, category: 'sides' },
  { id: 'rice', name: 'Рис із маслом', price: 55, category: 'sides' },
  { id: 'croutons', name: 'Грінки', price: 45, category: 'sides' },
  { id: 'pita', name: 'Піта', price: 35, category: 'sides' },
  { id: 'lentil-soup', name: 'Сочевичний суп', price: 95, category: 'sides' },
  { id: 'greek-salad', name: 'Грецький салат', price: 135, category: 'sides' },
  { id: 'pilaf', name: 'Рисовий плов', price: 85, category: 'sides' },
  { id: 'baklava', name: 'Баклава', price: 65, category: 'desserts' },
  { id: 'tartufo', name: 'Тартуфо', price: 75, category: 'desserts' },
  { id: 'tiramisu', name: 'Тірамісу', price: 110, category: 'desserts' },
  { id: 'panna-cotta', name: 'Панакота', price: 95, category: 'desserts' },
];
