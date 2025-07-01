/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
    const categoryTotal = {};

    for (const transaction of transactions) {
        const { category, price } = transaction;

        if (categoryTotal[category]) {
            categoryTotal[category] += price;
        } else {
            categoryTotal[category] = price;
        }
    }

    const result = [];
    for (const category in categoryTotal) {
        result.push({
            category,
            totalSpent: categoryTotal[category],
        });
    }
    return result;
}

const transactions = [
    {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: "Food",
        itemName: "Pizza",
    },
    {
        id: 2,
        timestamp: 1656076800001,
        price: 20,
        category: "Food",
        itemName: "Burger",
    },
    {
        id: 3,
        timestamp: 1656076800002,
        price: 15,
        category: "Clothing",
        itemName: "Shirt",
    },
];

console.log(calculateTotalSpentByCategory(transactions));

module.exports = calculateTotalSpentByCategory;
