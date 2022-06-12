import axios from "axios";
const PAYMENT_API_GATEWAY_URL = "https://api-gateway-law.herokuapp.com/payment";

const axiosClient = axios.create({
  baseURL: `${PAYMENT_API_GATEWAY_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `JWT ${localStorage.getItem("access_token")}`,
  },
});

export const getSnapToken = (cart_id, amount, user) => {
  return axiosClient.post("/snap-token", {
    cart_id,
    amount,
    customer_details: {
      first_name: user["first_name"],
      last_name: user["last_name"],
      email: user["email"],
      phone: user["phone_number"],
    },
  });
};
