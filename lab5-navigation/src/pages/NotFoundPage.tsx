import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section>
      <h1>Сторінку не знайдено</h1>
      <p>
        <Link to="/">Повернутися на головну</Link>
      </p>
    </section>
  );
}
