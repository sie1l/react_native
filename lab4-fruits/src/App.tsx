import { useState } from 'react';
import Fruits from './Fruits';
import FruitsCounter from './FruitsCounter';
import type { Fruit } from './types';

export default function App() {
  const [fruits] = useState<Fruit[]>([
    { id: 1, fruitName: 'Яблуко' },
    { id: 2, fruitName: 'Груша' },
    { id: 3, fruitName: 'Слива' },
  ]);

  return (
    <main className="page">
      <h1>Список фруктів</h1>
      <Fruits fruits={fruits} />
      <FruitsCounter fruits={fruits} />
    </main>
  );
}
