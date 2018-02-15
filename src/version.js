const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    const digitsVersion = packageInfo.version.split(`.`);
    console.log(`v${digitsVersion[0].red}.${digitsVersion[1].green}.${digitsVersion[2].blue}`);
  }
};
