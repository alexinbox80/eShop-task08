<template>
    <section class="catalog">
        <div class="catalog__header center clear__bmargin">
            <div class="catalog__title">SHOPPING CART</div>
        </div>
        <div class="catalog__etitle" v-if="getCart.length === 0">EMPTY CART</div>
        <div class="cart__body center" v-if="getCart.length">
            <div class="cart__left">
                <Catalog__cart v-for="good in getCart" v-bind:item="good"/>
                <div class="cart__bottom-but">
                    <button type="button" class="cart__bottom-clear" @click="emptyCartHandler">
                        <span class="cart__bottom-cleartext">CLEAR SHOPPING CART</span>
                    </button>
                    <button type="button" class="cart__bottom-continue">
                        <span class="cart__bottom-conttext">CONTINUE SHOPPING</span>
                    </button>
                </div>
            </div>
            <div class="cart__right">
                <div class="cart__shipping">
                    <h3 class="cart__shipping-title">SHIPPING ADRESS</h3>
                    <input class="cart__shipping-city" type="text" placeholder="Bangladesh">
                    <input class="cart__shipping-state" type="text" placeholder="State">
                    <input class="cart__shipping-zip" type="number" step="1" min="100000" max="999999"
                           placeholder="Postcode / Zip">
                    <button type="button" class="cart__shipping-sub">
                        <span class="cart__shipping-subtext">GET A QUOTE</span>
                    </button>
                </div>
                <div class="cart__account">
                    <h4 class="cart__account-h4">SUB TOTAL &#x24;{{ getPrice }}</h4>
                    <h3 class="cart__account-h3">GRAND TOTAL
                        <span class="grand__total">&#x24;{{ getPrice }}.00</span>
                    </h3>
                    <hr class="cart__account-line">
                    <button type="button" class="cart__shipping-proceed">
                        <span class="cart__shipping-proceedtext">PROCEED TO CHECKOUT</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Catalog__cart from "./Catalog__cart";
    export default {
        name: 'Catalog',
        components: {Catalog__cart},
        computed: {
            getCart() {
                return this.$store.state.cart;
            },
            getPrice() {
                let price = 0;
                let indexOf = 0;

                this.$store.state.cart.map(itemCart => {
                    indexOf = this.$store.state.catalogData.map(item => item.id).indexOf(itemCart.id);
                    price += this.$store.state.catalogData[indexOf].price * itemCart.amount;
                });

                return price;
            }
        },
        methods: {
            emptyCartHandler() {
                this.$store.commit('delGood', null);
            }
        }
    }
</script>

<style scoped>
    .catalog__etitle {
        display: flex;
        justify-content: center;
        margin-top: 95px;
        font-size: 24px;
    }
</style>