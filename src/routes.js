const routes = require('express').Router();

/**
 * Simple 'get' routing example
 */
routes.get('/', (req, res) => {
    res.status(200).send('<h1>Hello, World!</h1>\n');
});

/**
 * You can check the 'Accept' header to change the format of your response.
 */
routes.get('/hello', (req, res) => {
    if (req.accepts(['html', 'text'])) {
        res.status(200).send('<h1>Hello, World!</h1>\n');
    } else if (req.accepts('json')) {
        res.status(200).json({ msg: 'Hello, World!' });
    } else {
        let type = req.header('accept')
        // 406 Not Acceptable
        res.status(406).send(`This route does not handle responses of type ${type}.`);
    }

});

routes.get(/(ab)*cd+/, (req, res) => {
    res.status(200).send('Route matched to regex.\n');
})

/*******************************************************************************
 *************************** SHOPPING LIST EXAMPLES ****************************
 *******************************************************************************/
let shopping_list = {
    'apple': { quantity: 4, price: 1.99 },
    'pear': { quantity: 10, price: 2.49 },
    'banana': { quantity: 2, price: 3.00 },
    'orange': { quantity: 7, price: 4.99 }
};

/**
 * Get all items in the shopping list.
 */
routes.get('/shoppinglist/', (req, res) => {
    res.status(200).json(shopping_list);
});

/**
 * Get a single item in the shopping list.
 */
routes.get('/shoppinglist/:item', (req, res) => {
    let item = req.params.item
    if (!item) // 400 Bad Request
        res.status(400).send('Please specify an item');

    let list_item = shopping_list[item];

    if (!list_item) // 404 Not Found
        res.status(404).send(`Item "${item}" not found in cart.`);

    if (req.accepts('json'))
        res.status(200).json(list_item);
    else
        res.status(406).send(`This route only handles json requests.`);
});

/**
 * Creates a new item in the shopping list.
 *
 * Takes required body parameters 'name', 'quantity', and 'price'.
 */
routes.post('/shoppinglist', (req, res) => {
    let { name, quantity, price } = req.body;
    if (!name || !quantity || !price) // 400 Bad Request
        res.status(400).send('Please specify a name, quantity, and price.');

    shopping_list[name] = { quantity, price };
    // 201 No Content
    res.status(201).send();
});

/**
 * Update an item in the shopping list.
 *
 * Takes optional body parameters 'quantity' and 'price'.
 */
routes.put('/shoppinglist/:item', (req, res) => {
    let item = req.params.item
    if (!item) // 400 Bad Request
        res.status(400).send('Please specify an item');

    let list_item = shopping_list[item];

    if (!list_item) // 404 Not Found
        res.status(404).send(`Item "${item}" not found in cart.`);

    list_item.quantity = req.body.quantity || list_item.quantity;
    list_item.quantity = req.body.quantity || list_item.quantity;

    if (req.accepts('json'))
        res.status(200).json(list_item);
    else
        res.status(200).json('Item updated successfully.');
});

/*
 * Implement delete method in workshop
 */
routes.delete('/shoppinglist/:item', (req, res) => {
    // 501 Not Implemented
    res.status(501).send('Route not implemented.');
})
module.exports = routes;
