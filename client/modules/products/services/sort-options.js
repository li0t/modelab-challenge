/**
 * Products sort options service module.
 *
 * @module products/services/sort-options
 *
 */

/**
 * Builds an array of translated sort options.
 *
 * @returns {Object[]} The sort options array.
 */
export default function getProductSortOptions() {
  if (!this) {
    throw new Error('Bind vm instance to this method to work');
  }

  return [
    {
      value: 'name=1',
      name: this.$t('NAME_ASC')
    },
    {
      value: 'name=-1',
      name: this.$t('NAME_DES')
    },
    {
      value: 'createdAt=-1',
      name: this.$t('CREATED_AT_DES')
    },
    {
      value: 'createdAt=1',
      name: this.$t('CREATED_AT_ASC')
    },
    {
      value: 'updatedAt=-1',
      name: this.$t('UPDATED_AT_DES')
    },
    {
      value: 'updatedAt=1',
      name: this.$t('UPDATED_AT_ASC')
    }
  ];
}
