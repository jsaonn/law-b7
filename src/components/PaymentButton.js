import React, { useEffect, useContext } from "react";
import { UserContext } from "../pages/auth/UserContext";
import { getSnapToken } from "./__axios__";

const PaymentButton = ({ cartId, totalPrice, styling }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePay = () => {
    getSnapToken(cartId, totalPrice, user)
      .then((res) => {
        console.log("token:", res.data.token);
        window.snap.pay(res.data.token, {
          onPending: (res) => {
            console.log("INI PENDING", res);
          },
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Pembayaran gagal");
      });
  };

  return (
    <button className={styling} onClick={handlePay}>
      Pay
    </button>
  );
};

export default PaymentButton;
