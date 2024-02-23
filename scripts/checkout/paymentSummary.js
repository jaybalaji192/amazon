import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";

export function renderPaymentSummary(   ) {
    let itemTotal = 0;
    let shippingTotal = 0;
    cart.forEach((item) => {
        const product = getProduct(item.productId);
        // console.log(item);
        itemTotal += product.price * item.quantity;

        const deliveryOption = getDeliveryOption(item.deliveryOptionId);
        shippingTotal += deliveryOption.price;
    });

    const netPrice = itemTotal + shippingTotal;
    const tax = netPrice * 0.1
    const grossTotal = netPrice + tax
    console.log(grossTotal);

    const PaymentSummaryHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">₹${itemTotal}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">₹${shippingTotal}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">₹${netPrice}.74</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">₹${tax}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">₹${grossTotal}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = PaymentSummaryHTML;

}

