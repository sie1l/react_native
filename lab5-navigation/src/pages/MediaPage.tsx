import { useState } from 'react';
import campusUrl from '../assets/campus.svg';
import ExtraImage from '../components/ExtraImage';

const EXTERNAL_IMAGE_URL = 'https://picsum.photos/id/1015/800/450';

export default function MediaPage() {
  const [externalImageFailed, setExternalImageFailed] = useState(false);

  return (
    <section>
      <h1>Зображення і відео</h1>

      <figure>
        <img src={campusUrl} alt="Головний вхід до навчального корпусу" />
        <figcaption>Локальний файл із src/assets (статичний імпорт).</figcaption>
      </figure>

      <figure>
        {externalImageFailed ? (
          <p>
            Зображення недоступне. Джерело:{' '}
            <a href={EXTERNAL_IMAGE_URL} target="_blank" rel="noopener noreferrer">
              {EXTERNAL_IMAGE_URL}
            </a>
          </p>
        ) : (
          <img
            src={EXTERNAL_IMAGE_URL}
            alt="Гірський краєвид із зовнішнього джерела"
            onError={() => setExternalImageFailed(true)}
          />
        )}
        <figcaption>
          Зовнішнє зображення. Джерело: picsum.photos (Lorem Picsum).
        </figcaption>
      </figure>

      <ExtraImage />

      <section>
        <h2>Відео</h2>
        <iframe
          className="video-frame"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Відео про обрану тему"
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
        <p>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Відкрити відео на YouTube
          </a>
        </p>
      </section>
    </section>
  );
}
