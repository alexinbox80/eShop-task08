<template>
    <div>
        <Promo />
        <Sale />
        <Product />
    </div>
</template>

<script>
    // @ is an alias to /src
    import Promo from '../components/Promo';
    import Sale from "../components/Sale";
    import Product from "../components/Product";

    export default {
        name: 'Home',
        components: {
            Promo,
            Sale,
            Product,
        }
    }
</script>
