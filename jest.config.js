module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '/(src|test|e2e)/.*\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};
