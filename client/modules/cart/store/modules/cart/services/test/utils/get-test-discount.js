import faker from 'faker';

/**
 * Builds a test discount.
 * 
 * @returns {Object} A test discount object.
 */
export default function getTestDiscount() {
  return {
    threshold: faker.random.number(),
    discount: faker.random.number(),
    brand: faker.random.word()
  };
}
