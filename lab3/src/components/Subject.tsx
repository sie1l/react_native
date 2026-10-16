import { useState } from 'react';

type SubjectProps = {
  subjectName: string;
  description: string;
  credits: number;
  semester: number;
  teacher?: string;
};

export default function Subject({
  subjectName,
  description,
  credits,
  semester,
  teacher,
}: SubjectProps) {
  const [isSelected, setIsSelected] = useState(false);

  function handleToggle() {
    setIsSelected((current) => !current);
  }

  return (
    <article className="subject">
      <h3>{subjectName}</h3>
      <p>{description}</p>
      <p>Кредити ЄКТС: {credits}</p>
      <p>Семестр: {semester}</p>
      <p>Викладач: {teacher ?? 'Уточнюється'}</p>
      <button
        type="button"
        className="select-button"
        onClick={handleToggle}
        aria-pressed={isSelected}
      >
        Обрати дисципліну
      </button>
      <p role="status">
        {isSelected ? 'Дисципліну вибрано' : 'Дисципліну не вибрано'}
      </p>
    </article>
  );
}
