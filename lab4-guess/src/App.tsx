export default function App() {
  function handleClick() {
    const input = window.prompt('Введіть ціле число від 1 до 5');

    if (input === null) return;

    if (input.trim() === '') {
      window.alert('Ви не ввели число');
      return;
    }

    const userNumber = Number(input);

    if (!Number.isInteger(userNumber) || userNumber < 1 || userNumber > 5) {
      window.alert('Потрібно ввести ціле число від 1 до 5');
      return;
    }

    const computerNumber = Math.floor(Math.random() * 5) + 1;
    const resultText =
      userNumber === computerNumber ? 'Ви вгадали!' : 'Спробуйте ще раз';

    window.alert(
      `Ви вказали число: ${userNumber}, число комп'ютера: ${computerNumber}. ${resultText}`,
    );
  }

  return (
    <main className="page">
      <h1>Вкажіть будь-яке число від 1 до 5</h1>
      <button type="button" onClick={handleClick}>
        Почати
      </button>
    </main>
  );
}
