import React from "react";
import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp("http://localhost:3000/orders", requestConfig);

    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }


    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();

    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); //{ email:test@example.com }

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending Order Data...</span>;
    }

    if(data && !error) {
        return <Modal open={userProgressCtx.progress === "checkout"}    onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your oder was submitted successfully.</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className="modal-actions"><Button onClick={handleFinish}>Okay</Button></p>
        </Modal>
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
                {error && (
                    <Error title="Failed to submit order" message={error} />
                )}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
};

export default Checkout;
