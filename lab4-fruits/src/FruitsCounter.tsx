import type { Fruit } from './types';

type FruitsCounterProps = {
  fruits: Fruit[];
};

export default function FruitsCounter({ fruits }: FruitsCounterProps) {
  return <h2>Всього фруктів: {fruits.length}</h2>;
}
