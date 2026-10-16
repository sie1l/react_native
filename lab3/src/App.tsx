import Heading from './components/Heading';
import Subject from './components/Subject';

export default function App() {
  return (
    <main className="page">
      <Heading firstName="Соломія" lastName="Щербакова" group="Кн-41" />

      <section aria-labelledby="subjects-title">
        <h2 id="subjects-title">Мої дисципліни</h2>
        <div className="subjects">
          <Subject
            subjectName="Адміністрування комп'ютерних систем та мереж"
            description="Налаштування та супровід серверних і мережевих систем."
            credits={4}
            semester={7}
          />
          <Subject
            subjectName="Економічне обґрунтування ІТ-проектів"
            description="Оцінка вартості та ефективності ІТ-рішень."
            credits={3}
            semester={7}
          />
          <Subject
            subjectName="Методи та системи штучного інтелекту"
            description="Алгоритми машинного навчання та інтелектуальні системи."
            credits={5}
            semester={7}
          />
          <Subject
            subjectName="Основи комп'ютерного дизайну"
            description="Принципи проєктування інтерфейсів та графіки."
            credits={3}
            semester={7}
          />
          <Subject
            subjectName="Розробка кросплатформних додатків на базі React Native"
            description="Створення мобільних застосунків для iOS та Android."
            credits={4}
            semester={7}
          />
          <Subject
            subjectName="Технології розподілених мереж та паралельних обчислень"
            description="Паралельні алгоритми та розподілені обчислювальні системи."
            credits={4}
            semester={7}
          />
        </div>
      </section>
    </main>
  );
}
