
<i18n>
es:
  BRANDS: Marcas
  APPLY_FILTERS: Aplicar filtros
  REMOVE_FILTERS: Quitar filtros
  PAGINATE: Cargar más
</i18n>

<template lang="pug">
.products-index.view(
  :class="{ loading: fetching}"
  )

  .ui.grid
    .row
      .brands.four.wide.column

        .ui.segment
          h4.ui.dividing.header {{ $t('BRANDS') }}
          .ui.form
            .field(
              v-for="brand in brands"
              )
              .ui.checkbox
                input( 
                  type="checkbox" 
                  name="brand"  
                  @change="toggleBrandFilter(brand.name)"
                ) 
                label {{ brand.name }}
              label.brand-products {{ brand.products }}

        .ui.segment.center.aligned
          button.ui.green.button(
            :disabled="brandsFilters.length === 0"
            @click="applyFilters()"
            )
            | {{ $t('APPLY_FILTERS') }}

          button.ui.button(
            :disabled="brandsFilters.length === 0"
            @click="resetFilters()"
            )
            | {{ $t('REMOVE_FILTERS') }}

      .products.twelve.wide.column
        .ui.grid
          .row
            .column
              .ui.four.cards
                product(
                  v-for="product in products"
                  :product="product"
                  :key="product._id"
                  )

          .row(
            v-show="remainingProducts > 0"
            )
            .column.center.aligned            
              button.ui.huge.green.button(
                @click="paginate()"
                )
                | {{ $t('PAGINATE') }}
  
</template>

<script>
import Product from '../components/Product';
import MT from '@/store/mutation-types';

import { mapModuleState, mapModuleActions, mapModuleMutations } from '@/shared/services/map-store-module';
import { moduleName as productsModuleName } from '@/modules/products/store/modules/products';
import { moduleName as discountsModuleName } from '@/modules/cart/store/modules/discounts';
import { moduleName as searchBarModuleName } from '@/shared/store/modules/search-bar';

export default {
  name: 'ProductsIndex',

  components: {
    Product
  },

  data() {
    return {
      brands: []
    };
  },

  computed: {
    ...mapModuleState(searchBarModuleName, ['searchText']),
    ...mapModuleState(discountsModuleName, ['discounts']),

    ...mapModuleState(productsModuleName, [
      'remainingProducts',
      'brandsFilters',
      'fetching',
      'products',
      'limit',
      'page'
    ])
  },

  async created() {
    await this.fetchDiscounts();
    await this.fetchProducts();
    await this.fetchBrands();
  },

  methods: {
    ...mapModuleActions(discountsModuleName, ['fetchDiscounts']),

    ...mapModuleActions(productsModuleName, ['fetchProducts', 'reset']),

    ...mapModuleMutations(productsModuleName, {
      spliceBrandFilter: MT.SPLICE_BRAND_FILTER,
      pushBrandFilter: MT.PUSH_BRAND_FILTER
    }),

    ...mapModuleMutations(productsModuleName, {
      spliceBrandFilter: MT.SPLICE_BRAND_FILTER,
      pushBrandFilter: MT.PUSH_BRAND_FILTER
    }),

    async paginate() {
      this.updatePage(this.page + 1);
      await this.fetchProducts();
    },

    async applyFilters() {
      await this.reset();
      await this.fetchProducts();
    },

    async resetFilters() {
      this.$$('.ui.checkbox').checkbox('uncheck');
      await this.reset();
      await this.fetchProducts();
    },

    toggleBrandFilter(brand) {
      const brandsFilters = this.brandsFilters;

      const index = brandsFilters.indexOf(brand);

      if (index >= 0) {
        brandsFilters.splice(index, 1);
        this.spliceBrandFilter(index);
      } else {
        this.pushBrandFilter(brand);
      }
    },

    async fetchBrands() {
      const brands = [];

      for (const discount of this.discounts) {
        const newBrand = {
          name: discount.brand
        };

        const res = await this.$http.get(`/products/count?brands=${newBrand.name}`);

        newBrand.products = res.data;

        brands.push(newBrand);
      }

      brands.sort((brand1, brand2) => (brand1.name > brand2.name ? 1 : -1));

      this.brands = brands;
    }
  }
};
</script>
<style lang="sass" scoped>
.products-index
  .brands
    .ui.form
      .brand-products
        float: right
        padding: 0 .75em
        background-color: #E4F1FF
        border-radius: 4px
</style>