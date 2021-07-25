/*
* 1. Привязать добавление товара в корзину к реальному API.
*
* 2. Добавить API для удаления товара из корзины.
*
* 3. *Добавить файл stats.json, в котором будет храниться статистика действий пользователя с корзиной.
* В файле должны быть поля с названием действия (добавлено/удалено), названием товара, с которым производилось
* действие и временем, когда оно было совершено.
*
*/

const express = require('express');
var cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

let jsonParser = bodyParser.json();
//let urlEncodedParser = bodyParser.urlencoded({extended: false});

const dataPath = '../data/api/v1/';

//Empty logs
fs.writeFile(dataPath + 'stats.json', JSON.stringify([]), (err) => {
    if (err) {
        console.log(`write stats: ${dataPath}stats.json Write to file error: ${err}`);
    } else {
        console.log(`write stats: ${dataPath}stats.json`);
    }
});

const app = express();
app.use(cors());

//app.use(express.static('../public'));

app.get('/getCatalog', (req, res) => {
    fs.readFile(dataPath + 'catalogData.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`read cart: ${dataPath}cart.json Read from file error: ${err}`);
        } else {
            console.log(`get catalog: ${dataPath}catalogData.json`);
            res.send(data);
        }
    });
});

app.post('/addToCart', jsonParser, (req, res) => {
    const cart = req.body;

    fs.writeFile(dataPath + 'cart.json', JSON.stringify(cart), (err) => {
        if (err) {
            res.send(`{"result": "Write to file error: ${err}"}`);
            console.log(`write cart: ${dataPath}cart.json Write to file error: ${err}`);
        } else {
            res.send(`{"result": "OK"}`);
            console.log(`write cart: ${dataPath}cart.json`);
        }
    });
});

app.post('/delFromCart', jsonParser, (req, res) => {
    fs.readFile(dataPath + 'cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send(`{"result": "Read from file error: ${err}"}`);
            console.log(`read cart: ${dataPath}cart.json Read from file error: ${err}`);
        } else {
            let cart = JSON.parse(data);

            if (req.body.id === undefined) {
                cart = [];
                //console.log('cart is undefined!');
            } else {
                const index = cart.findIndex(good => good.id === req.body.id);
                if (index !== -1) {
                    cart.splice(index, 1);
                }
            }

            fs.writeFile(dataPath + 'cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send(`{"result": "Write to file error: ${err}"}`);
                    console.log(`write cart: ${dataPath}cart.json Write to file error: ${err}`);
                } else {
                    res.send(`{"result": "OK"}`);
                    console.log(`write cart: ${dataPath}cart.json`);
                }
            });
        }
    });
});

app.post('/stats', jsonParser, (req, res) => {
    fs.readFile(dataPath + 'stats.json', 'utf8', (err, data) => {
        if (err) {
            res.send(`{"result": "Read from file error: ${err}"}`);
            console.log(`read stats: ${dataPath}stats.json Read from file error: ${err}`);
        } else {
            const stats = JSON.parse(data);
            const item = req.body;

            stats.push(item);

            fs.writeFile(dataPath + 'stats.json', JSON.stringify(stats), (err) => {
                if (err) {
                    res.send(`{"result": "Write to file error: ${err}"}`);
                    console.log(`write stats: ${dataPath}stats.json Write to file error: ${err}`);
                } else {
                    res.send(`{"result": "OK"}`);
                    console.log(`write stats: ${dataPath}stats.json`);
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});
