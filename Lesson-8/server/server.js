const express = require('express');
const fs = require('fs');
const { request } = require('http');

const app = express();

app.use(express.json());
app.use('/', express.static('./public'));

app.get('/api/products', (req, res) => {
    fs.readFile('./server/database/catalog.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else res.send(data);
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const cart = JSON.parse(data);
            cart.push(req.body);

            fs.writeFile('./server/database/cart.json', JSON.stringify(cart, null, 2), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.put('/api/cart/:id', (req, res) => {
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const cart = JSON.parse(data);
            const find = cart.find(good => good.id === Number(req.params.id)); // req.query // /?dwd=fwf
            find.quantity += req.body.quantity;

            fs.writeFile('./server/database/cart.json', JSON.stringify(cart, null, 2), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});

// Обработка запроса для перехода на страницу продукта.
app.put('/api/products/:id', (req, res) => {
    fs.readFile('./server/database/catalog.json', 'utf-8', (err, data) => {
        if (err) res.send(JSON.stringify({ result: 0, err }));
        else {
            const catalog = JSON.parse(data);
            for (let item of catalog) {
                item.currentProduct = false;
            }
            const find = catalog.find(good => good.id === Number(req.params.id));
            find.currentProduct = req.body.currentProduct;

            fs.writeFile('./server/database/catalog.json', JSON.stringify(catalog, null, 2), (err) => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.delete('/api/cart/:id', (req, res) => {
    fs.readFile('./server/database/cart.json', 'utf-8', (err, data) => {
        if (err) res.end(JSON.stringify({ result: 0, err }));
        else {
            const cart = JSON.parse(data);
            const find = cart.find(good => good.id === Number(req.params.id));
            cart.splice(cart.indexOf(find), 1);

            fs.writeFile('./server/database/cart.json', JSON.stringify(cart, null, 2), err => {
                if (err) res.end(JSON.stringify({ result: 0, err }));
                else res.end(JSON.stringify({ result: 1 }));
            });
        }
    });
});

// Обработка запроса для отчистки корзины со страницы корзины
app.delete('/api/clear', (req, res) => {
    const cart = [];

    fs.writeFile('./server/database/cart.json', JSON.stringify(cart, null, 2), err => {
        if (err) res.end(JSON.stringify({ result: 0, err }));
        else res.end(JSON.stringify({ result: 1 }));
    });
});

// app.get('*');

app.listen(5555, () => {
    console.log('Server started!');
});
