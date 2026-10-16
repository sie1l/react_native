import { useState } from 'react';

export default function ExtraImage() {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLoad() {
    setIsLoading(true);
    setError('');

    try {
      const imageModule = await import('../assets/detail.svg');
      setUrl(imageModule.default);
    } catch {
      setError('Не вдалося отримати ресурс. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <h2>Додаткове зображення (динамічний імпорт)</h2>
      <button
        type="button"
        onClick={handleLoad}
        disabled={isLoading || url !== null}
      >
        {isLoading ? 'Завантаження…' : 'Показати зображення'}
      </button>
      {error && <p role="alert">{error}</p>}
      {url !== null && (
        <figure>
          <img
            src={url}
            alt="Деталь навчального корпусу"
            onError={() => {
              setUrl(null);
              setError('Файл отримано, але зображення не відобразилося.');
            }}
          />
          <figcaption>
            Локальний файл, URL отримано через await import() після
            натискання кнопки.
          </figcaption>
        </figure>
      )}
    </section>
  );
}
