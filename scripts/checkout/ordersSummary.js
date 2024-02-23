import { cart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { removeFromCart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

const today = dayjs();


function updateHeader() {
	document.querySelector('.js-cart-size').innerHTML = `${cart.length} items`;
}
updateHeader();

export function renderOrderSummary() {
	let checkoutHTML = '';

	cart.forEach((item) => {
		const productId = item.productId;

		const matchingProduct = getProduct(productId);


		const deliveryOption = getDeliveryOption(item.deliveryOptionId);
		const delDate = deliveryOption.deliveryDays;
		// console.log(delDate);

		checkoutHTML += `
            <div class="cart-item-container js-cart-item-${matchingProduct.id}" >
              <div class="delivery-date">
                Delivery date: ${today.add(delDate, 'day').format('dddd, MMMM D')}
              </div>
          
              <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">
          
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
				  ₹${matchingProduct.price}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <input class="quality-input" style="width: 20px">
                    <span class="update-quantity-link link-primary js-update-quantity">
                      Update
                    </span>
                    <span class="link-primary save-quantity-link">
                      Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>
                <div class="delivery-options js-delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
					${deliveryOptionHTML(matchingProduct, item)}
                  </div>
                </div>
              </div>
            </div>`
	});
	document.querySelector('.order-summary').innerHTML = checkoutHTML;



	document.querySelectorAll('.js-delete-quantity').forEach((link) => {
		link.addEventListener('click', () => {
			let productId = link.dataset.productId
			// console.log(cart);
			removeFromCart(productId)

			document.querySelector(`.js-cart-item-${productId}`).remove();
			updateHeader();
			renderPaymentSummary();
		});
	});

	document.querySelectorAll('.js-update-quantity').forEach((link) => {
		link.addEventListener('click', () => {
			console.log("upd");
		});
	});



	function deliveryOptionHTML(product, item) {
		let optionHTML = '';

		deliveryOptions.forEach((option) => {
			const dateString = today.add(option.deliveryDays, 'day').format('dddd, MMMM D');
			const priceString = option.price ? '$' + option.price : "FREE";
			const isChecked = item.deliveryOptionId === option.id ? 'checked' : '';
			optionHTML += `
		<div class="delivery-option js-delivery-option" data-product-id=${product.id} data-delivery-id=${option.id}>
			<input type="radio" ${isChecked} class="delivery-option-input" name="delivery-option-${product.id}">
			<div>
				<div class="delivery-option-date">
					${dateString}
				</div>
				<div class="delivery-option-price">
					${priceString} Shipping
				</div>
			</div>
		</div>
		`


		});

		return optionHTML
	}

	document.querySelectorAll('.js-delivery-option').forEach((element) => {
		element.addEventListener('click', () => {
			const { productId, deliveryId } = element.dataset;
			updateDeliveryOption(productId, deliveryId);
			renderOrderSummary();
			renderPaymentSummary();
		});
	});
}
