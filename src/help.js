module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(`Доступные команды:
--author      — печатает автора программы;
--description — печатает описание программы;
--help        — печатает этот текст;
--license     — печатает вид лицензии;
--version     — печатает версию приложения;`);
  }
};
