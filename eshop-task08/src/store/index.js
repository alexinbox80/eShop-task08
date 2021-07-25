import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function sendLog(url, done, catalog, id = null) {
    const toDo = {
        "add": "Товар добавлен в корзину",
        "del": "Товар удален из корзины",
        "cle": "Корзина очина"
    };

    let jsonData = {};
    let now = new Date();

    const title = (id !== null) ? catalog[id - 1].title : 'null';

    jsonData = {
        id: `${id}`,
        todo: `${toDo[done]}`,
        title: `${title}`,
        dateTime: `${now}`
    };

    sendData(url + '/stats', jsonData);
}

function sendData(url, jsonData) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonData)
    });
}

function getData(url) {
    //let jsonData;
    const response = fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        //body: JSON.stringify(jsonData)
    }).then((data) => {
        return data.json();
    });

    return response;
}

export default new Vuex.Store({
    state: {
        url: 'http://localhost:3000',
        catalogData1: [
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
        catalogData: [],
        filterCatalogData: [],
        cart: [],
        goodID: null,
        searchShow: false,
        jsonCatalog: function () {
            return {
                //jCatalog: [{id: 1, amount: 5}],
                jCatalog: null
            }
        }
    },
    mutations: {
        getData(state) {
            const gd = getData(state.url + '/getCatalog');

            state.jsonCatalog.jCatalog = [];

            gd.then((data) => {
                data.forEach(item => {
                    state.jsonCatalog.jCatalog.push(item);
                });
            });

            //console.log(state.jsonCatalog.jCatalog);
           state.catalogData = state.jsonCatalog.jCatalog;
        },
        showForm(state) {
            state.searchShow = !state.searchShow;
        },
        search(state, searchString) {

            if (searchString.length > 2) {
                state.filterCatalogData = state.catalogData
                    .filter(item => item.description.toLowerCase().includes(searchString.toLowerCase()));
            }

            if (state.filterCatalogData.length > 0) {
                state.catalogData = state.filterCatalogData;
            }

        },
        saveGoodID(state, id) {
            state.goodID = id;
        },
        addGood(state, id) {

            let good = state.cart.find(item => item.id === id);

            if (good) {
                const indexOf = state.cart.map(item => item.id).indexOf(id);
                state.cart[indexOf].amount++;
            } else {
                state.cart.push({id, amount: 1});
            }

            sendData(state.url + '/addToCart', state.cart);
            sendLog(state.url, 'add', state.catalogData, id);
        },
        delGood(state, id) {
            if (id === null) {
                state.cart = [];

                sendData(state.url + '/delFromCart', state.cart);
                sendLog(state.url, 'cle');
            } else {
                const good = state.cart.find(item => item.id === id);
                sendData(state.url + '/delFromCart', good);
                sendLog(state.url, 'del', state.catalogData, id);

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
