import faker from 'faker';

/**
 * Builds a test product.
 * 
 * @returns {Object} A test product object.
 */
export default function getTestProduct() {
  return {
    description: faker.random.word(),
    price: faker.random.number(),
    brand: faker.random.word(),
    image: faker.random.word(),
    id: faker.random.word()
  };
}
