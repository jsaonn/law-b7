import React, { useEffect } from "react";

const PaymentButton = ({ styling }) => {
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-uXK-LaKryIf4xHNg";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePay = () => {
    window.snap.pay('1e77663e-3d55-478a-99bd-9d14e79d879f')
  };

  return (
    <button className={styling} onClick={handlePay}>
      Pay
    </button>
  );
};

export default PaymentButton;
