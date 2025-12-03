const fs = require('fs');
const path = require('path');

exports.default = async (context) => {
  const appDir = context.appOutDir;
  const localesDir = path.join(appDir, 'locales');

  if (fs.existsSync(localesDir)) {
    fs.readdirSync(localesDir).forEach(file => {
      if (file !== 'en-US.pak') {
        fs.unlinkSync(path.join(localesDir, file));
      }
    });
    console.log('Removed unnecessary locale files.');
  }
};
