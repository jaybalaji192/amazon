export let cart = [];

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function retrieve() {
    let storageCart = JSON.parse(localStorage.getItem('cart'))
    cart = storageCart ? storageCart : [];
}

retrieve();

export var cartQuantity = cart.length;
export function updateCartQuantity(item) {
    cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
}


export function addToCart(productId) {
    let flag = false;
    cart.forEach(product => {
        if (productId == product.productId) {
            product.quantity += 1
            flag = true;
        }
    });
    if (!flag) {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
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


export function updateDeliveryOption(productId, deliveryOptionId) {
	let matchingItem;
	cart.forEach((item) => {
		if (productId === item.productId) {
			matchingItem = item;
		}
	});
	
	matchingItem.deliveryOptionId = deliveryOptionId;

	saveToStorage();
}