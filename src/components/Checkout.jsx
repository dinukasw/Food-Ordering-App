import React from "react";
import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); //{ email:test@example.com }

        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: { items: cartCtx.items, customer: customerData } }),
        });
    }

    return (
        <Modal
            open={userProgressCtx.progress === "checkout"}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" id="name" type="text" />
                <Input label="Email Address" id="email" type="email" />
                <Input label="Street Address" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" />
                    <Input label="City" id="city" type="text" />
                </div>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>
                        Close
                    </Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
};

export default Checkout;
