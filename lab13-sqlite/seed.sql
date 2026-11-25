-- Тестові дані (вигадані). Спочатку батьківські записи, потім дочірні.
PRAGMA foreign_keys = ON;

INSERT INTO students (id, full_name, email, year) VALUES
    (1, 'Олена Коваль',    'olena.koval1@example.com',    1),
    (2, 'Марко Шевчук',    'marko.shevchuk@example.com',  2),
    (3, 'Олена Коваль',    'olena.koval2@example.com',    3),   -- тезка, інший email
    (4, 'Іван Бондаренко', 'ivan.bondarenko@example.com', 2),
    (5, 'Софія Мельник',   'sofia.melnyk@example.com',    4),
    (6, 'Дмитро Ткачук',   'dmytro.tkachuk@example.com',  1);   -- без зарахувань

INSERT INTO courses (id, code, title, credits) VALUES
    (1, 'CS101', 'Вступ до програмування', 5),
    (2, 'CS201', 'Бази даних',             4),
    (3, 'MA101', 'Математичний аналіз',    6),
    (4, 'EN101', 'Англійська мова',        3),
    (5, 'HI301', 'Історія науки',          3);   -- курс без зарахувань (для LEFT JOIN)

INSERT INTO enrollments (id, student_id, course_id, enrolled_on, grade) VALUES
    (1,  1, 1, '2026-09-01', 90),
    (2,  1, 2, '2026-09-01', 85),
    (3,  2, 1, '2026-09-02', 70),
    (4,  2, 3, '2026-09-02', NULL),
    (5,  3, 2, '2026-09-03', 95),
    (6,  3, 3, '2026-09-03', 60),
    (7,  4, 1, '2026-09-04', 75),
    (8,  4, 4, '2026-09-04', 88),
    (9,  5, 2, '2026-09-05', NULL),
    (10, 5, 4, '2026-09-05', 92);
