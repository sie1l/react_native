import { useState } from 'react';
import type { FormEvent } from 'react';

type TextInputProps = {
  value: string;
  onTextChange: (text: string) => void;
};

export default function TextInput({ value, onTextChange }: TextInputProps) {
  const [submittedText, setSubmittedText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (value.trim() === '') {
      setError('Поле не може бути порожнім.');
      return;
    }

    setError('');
    setSubmittedText(value);
  }

  return (
    <section>
      <h2>Text input</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text-field">
          Текст:
          <input
            id="text-field"
            value={value}
            maxLength={50}
            onChange={(event) => onTextChange(event.currentTarget.value)}
          />
        </label>
        <p>{value.length}/50</p>
        <button type="submit">Submit</button>
      </form>
      {error && <p role="alert">{error}</p>}
      <p>Підтверджений текст: {submittedText}</p>
    </section>
  );
}
