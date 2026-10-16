import type { Fruit } from './types';

type FruitsProps = {
  fruits: Fruit[];
};

export default function Fruits({ fruits }: FruitsProps) {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit.id}>{fruit.fruitName}</li>
      ))}
    </ul>
  );
}
