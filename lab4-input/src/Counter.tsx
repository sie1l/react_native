import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount((previous) => previous + 1);
  }

  function handleDecrease() {
    setCount((previous) => previous - 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <section>
      <h2>Counter: {count}</h2>
      {count < 0 && <p role="status">Counter can&apos;t be negative</p>}
      <button type="button" onClick={handleIncrease}>
        Increase
      </button>
      <button type="button" onClick={handleDecrease}>
        Decrease
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </section>
  );
}
