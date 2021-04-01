const buildSearchRegex = require('../search-regex');
const faker = require('faker');

describe('SEARCH REGEX SHARED SERVICE', () => {
  describe('[Build regex query]', () => {
    it('should build a mongo regex query object with default flags', async () => {
      const text = faker.random.word();

      const result = buildSearchRegex(text);

      expect(result).to.be.an('object');
      expect(result.$regex).to.be.a('string');
      expect(result.$options).to.be.a('string');
    });

    it('should build a mongo regex query object with given flags', async () => {
      const text = faker.random.word();
      const flags = 'mix';

      const result = buildSearchRegex(text, flags);

      expect(result).to.be.an('object');
      expect(result.$regex).to.be.a('string');
      expect(result.$options).to.be.a('string');
      expect(result.$options).to.be.equals(flags);
    });

    it('should build a mongo regex query object with several words', async () => {
      const text = `${faker.random.word()} ${faker.random.word()} ${faker.random.word()}`;

      const result = buildSearchRegex(text);

      expect(result).to.be.an('object');
      expect(result.$regex).to.be.a('string');
      expect(result.$options).to.be.a('string');
    });

    it('should build a mongo regex query object with an empty text', async () => {
      const text = '';

      const result = buildSearchRegex(text);

      expect(result).to.be.an('object');
      expect(result.$regex).to.be.a('string');
      expect(result.$regex).to.be.empty;
      expect(result.$options).to.be.a('string');
    });

    it('should build a mongo regex query object with a word and an empty text', async () => {
      const empty = '';
      const text = `${faker.random.word()} ${empty}`;

      const result = buildSearchRegex(text);

      expect(result).to.be.an('object');
      expect(result.$regex).to.be.a('string');
      expect(result.$options).to.be.a('string');
    });
  });
});
