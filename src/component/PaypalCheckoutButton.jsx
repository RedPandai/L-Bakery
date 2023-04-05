import React, { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const PaypalCheckoutButton = ({ amount }) => {
  const currency = "GBP";
  const style = { layout: "vertical" };
  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          onButtonReady={() => console.log("loaded")}
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ARQCGnBMU61wZOYKpdwd1WE94BGfxM6Jc80wpNbk6a9Wp_YwFo4WM3q36bMiauQpKS4O2QXC4F0mgKoO",
        components: "buttons",
        currency: "GBP",
        "disable-funding": "credit,card,p24",
      }}
    >
      <ButtonWrapper currency={currency} showSpinner={false} />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckoutButton;
