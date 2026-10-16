import { NavLink } from 'react-router';

export default function Navigation() {
  return (
    <nav aria-label="Основна навігація">
      <NavLink to="/" end>
        Головна
      </NavLink>
      <NavLink to="/media">Зображення і відео</NavLink>
      <NavLink to="/about">Про програму</NavLink>
      <NavLink to="/calculator">Калькулятор</NavLink>
    </nav>
  );
}
