import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        catalogData: [
            {
                "id": 1,
                "title": "ELLERY X M'O CAPSULE",
                "description": "For her sculptural takes on traditional tailoring, Australian\n arbiter of cool Kym Ellery teams up with Moda Operandi.",
                "image": "prod-item-1.jpg",
                "color": "red",
                "size": "XI",
                "price": 52.00,
                "discount": 10
            },
            {
                "id": 2,
                "title": "ELLERY X M'O CAPSULE",
                "description": "Known for her sculptural takes of traditional tailoring, Australian\n arbiter of cool Kym Ellery teams up with Moda Operandi.",
                "image": "prod-item-2.jpg",
                "color": "black",
                "size": "X",
                "price": 55.00,
                "discount": 1
            },
            {
                "id": 3,
                "title": "ELLERY X M'O CAPSULE",
                "description": "Known for her sculptural takes on traditional tailoring, Australian\n arbiter of cool Kym Ellery teams up with Moda Operandi.",
                "image": "prod-item-3.jpg",
                "color": "white",
                "size": "IX",
                "price": 58.00,
                "discount": 15
            },
            {
                "id": 4,
                "title": "ELLERY X M'O CAPSULE",
                "description": "Her sculptural takes on traditional tailoring, Australian\n arbiter of cool Kym Ellery teams up with Moda Operandi.",
                "image": "prod-item-4.jpg",
                "color": "purple",
                "size": "VII",
                "price": 72.00,
                "discount": 20
            },
            {
                "id": 5,
                "title": "ELLERY X M'O CAPSULE",
                "description": "Known for her sculptural takes on traditional tailoring, Australian\n arbiter of cool Kym Ellery teams up with Moda Operandi.",
                "image": "prod-item-5.jpg",
                "color": "green",
                "size": "XII",
                "price": 42.00,
                "discount": 10
            },
            {
                "id": 6,
                "title": "ELLERY X M'O CAPSULE",
                "description": "Known for her sculptural takes on traditional tailoring, Australian\n arbiter of cool Kym Ellery teams up with Moda Operandi.",
                "image": "prod-item-6.jpg",
                "color": "blue",
                "size": "X",
                "price": 65.00,
                "discount": 0
            }
        ],
        cart: []
    },
    mutations: {
        addGood(state, id) {
            let good = state.cart.find(item => item.id === id);

            if (good) {
                const indexOf = state.cart.map(item => item.id).indexOf(id);
                state.cart[indexOf].amount++;
            } else {
                state.cart.push({id, amount: 1});
            }
        },
        delGood(state, id) {
            //const good = state.cart.find(item => item.id === id);

            //this.sendData('/delFromCart', good);
            //this.sendLog('del', id);

            if (id === null) {
                state.cart = [];
            } else {
                const index = state.cart.findIndex(good => good.id === id);
                if (index !== -1) {
                    state.cart.splice(index, 1);
                }
            }
        }
    },
    actions: {},
    modules: {}
});
