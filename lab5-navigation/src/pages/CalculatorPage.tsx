import { useState } from 'react';

export default function CalculatorPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');

  function parseOperand(): number | null {
    if (input.trim() === '') {
      setError('Введіть число.');
      return null;
    }

    const operand = Number(input);

    if (!Number.isFinite(operand)) {
      setError('Введіть скінченне число.');
      return null;
    }

    return operand;
  }

  function applyResult(nextResult: number) {
    if (!Number.isFinite(nextResult)) {
      setError('Результат завеликий для обчислення.');
      return;
    }

    setResult(nextResult);
    setError('');
  }

  function handleAdd() {
    const operand = parseOperand();
    if (operand === null) return;
    applyResult(result + operand);
  }

  function handleSubtract() {
    const operand = parseOperand();
    if (operand === null) return;
    applyResult(result - operand);
  }

  function handleMultiply() {
    const operand = parseOperand();
    if (operand === null) return;
    applyResult(result * operand);
  }

  function handleDivide() {
    const operand = parseOperand();
    if (operand === null) return;

    if (operand === 0) {
      setError('Ділення на нуль неможливе.');
      return;
    }

    applyResult(result / operand);
  }

  function handleClearField() {
    setInput('');
    setError('');
  }

  function handleResetResult() {
    setResult(0);
    setError('');
  }

  return (
    <section>
      <h1>Калькулятор</h1>

      <div className="calculator-field">
        <label htmlFor="operand">Число для операції</label>
        <input
          id="operand"
          type="number"
          step="any"
          value={input}
          onChange={(event) => {
            setInput(event.currentTarget.value);
            setError('');
          }}
        />
      </div>

      <p aria-live="polite">Результат: {result}</p>
      {error && <p role="alert">{error}</p>}

      <div className="calculator-actions">
        <button type="button" onClick={handleAdd}>
          Додати
        </button>
        <button type="button" onClick={handleSubtract}>
          Відняти
        </button>
        <button type="button" onClick={handleMultiply}>
          Помножити
        </button>
        <button type="button" onClick={handleDivide}>
          Поділити
        </button>
      </div>

      <div className="calculator-actions">
        <button type="button" onClick={handleClearField}>
          Очистити поле
        </button>
        <button type="button" onClick={handleResetResult}>
          Скинути результат
        </button>
      </div>
    </section>
  );
}
