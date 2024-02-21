export let cart = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    },
    {
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 1
    }
];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function retrieve() {
    let storageCart = JSON.parse(localStorage.getItem('cart'))
    cart =  storageCart ? storageCart : [];
}

retrieve();


export function addToCart(productId) {
    let flag = false;
    cart.forEach(product => {
        if (productId == product.productId) {
            product.quantity += 1
            flag = true;
        }
    });
    if (!flag) {
        cart.push({ productId, quantity: 1 });
    }
    saveToStorage();
}


export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach(product => {
        if (productId !== product.productId) {
            newCart.push(product);
        }
    });

    cart = newCart;
    saveToStorage();
}