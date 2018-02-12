const arg = process.argv.slice(2)[0];

if (!arg) {
  console.log(`Привет пользователь! 
Эта программа будет запускать сервер «Кексобукинг». 
Автор: Павел Орлов.`);
} else if (arg === `--version`) {
  console.log(`v1.0.1`);
} else if (arg === `--help`) {
  console.log(`Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;`);
} else {
  console.error(`Неизвестная команда ${arg}. 
Чтобы прочитать правила использования приложения, наберите "--help"`);
  process.exitCode = 1;
}

