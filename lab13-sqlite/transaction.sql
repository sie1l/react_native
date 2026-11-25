-- Транзакція. Виконуйте по одному блоку; переконайтеся, що немає відкритої транзакції.
PRAGMA foreign_keys = ON;

-- Блок A: ROLLBACK скасовує зміну.
BEGIN TRANSACTION;
UPDATE enrollments SET grade = grade + 5 WHERE id = 3;
SELECT id, grade FROM enrollments WHERE id = 3;   -- 75
ROLLBACK;
SELECT id, grade FROM enrollments WHERE id = 3;   -- знову 70

-- Блок B: COMMIT підтверджує зміну (вона лишається після повторного відкриття файла).
BEGIN TRANSACTION;
UPDATE enrollments SET grade = grade + 5 WHERE id = 3;
COMMIT;
SELECT id, grade FROM enrollments WHERE id = 3;   -- 75
