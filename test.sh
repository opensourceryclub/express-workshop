#!/bin/sh
DOMAIN=http://localhost:3000
echo "Testing route '/'..."
curl $DOMAIN/

echo ""

echo "Testing regex route..."
curl $DOMAIN/abacddd
curl $DOMAIN/cd

echo "\nListing the shopping list..."
curl $DOMAIN/shoppinglist
echo "\n"
echo "Getting an invalid item from the shopping list"
curl -I $DOMAIN/shoppinglist/peach
curl $DOMAIN/shoppinglist/peach
echo "\n"
echo "Getting a valid item from the shopping list"
curl -I $DOMAIN/shoppinglist/banana
curl $DOMAIN/shoppinglist/banana

echo "\n"
echo "Creating a new shopping list item..."
curl -d '{ "name": "peach", "quantity": 9, "price": 7.95 }' \
-H "Content-Type: application/json" -X POST $DOMAIN/shoppinglist

echo "Getting the newly created item..."
curl $DOMAIN/shoppinglist/peach

echo "\n"

echo "Deleting apples from the list..."
curl -X DELETE $DOMAIN/shoppinglist/apple

echo "\n"

echo "Getting the updated list..."
curl $DOMAIN/shoppinglist

exit 0
