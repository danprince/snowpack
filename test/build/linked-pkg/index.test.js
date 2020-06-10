const fs = require('fs');
const path = require('path');
const execa = require('execa');

it('linked package install', () => {
  // setup
  const cwd = __dirname;
  execa.commandSync('npm link', {cwd: path.resolve(__dirname, 'packages', 'test-link')});
  execa.commandSync('npm link @snowpack/test-link', {cwd});
  execa.commandSync('npm install', {cwd});

  // test output (the assumption is if anything went wrong, these files wouldn’t be built)
  execa.commandSync('npm run TEST', {cwd});
  expect(fs.existsSync(path.resolve(__dirname, 'build', '_dist_', 'index.js'))).toBe(true);
});
