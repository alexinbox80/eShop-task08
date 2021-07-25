<template>
    <section class="products center">
        <div class="products__header">
            <h2 class="products__h2">Fetured Items</h2>
            <h4 class="products__head">Shop for items based on what we featured in this week</h4>
        </div>
        <div class="products__box">
            <Product__cart v-for="good in getCatalog" v-bind:item="good" />
        </div>
        <div class="products__bottom">
            <button type="button" class="products__button">
                <span class="products__button-text">Browse All Product</span>
            </button>
        </div>
    </section>
</template>
<script>
    import Product__cart from './Product__cart';
    export default {
        name: 'Product',
        components: {
            Product__cart
        },
        computed: {
            getCatalog() {
                return this.$store.state.catalogData;
            }
        }
    }
</script>

<style scoped>

</style>