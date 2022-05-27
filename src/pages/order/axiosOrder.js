import axios from "axios";
const API_URL_HEROKU = "https://api-gateway-law.herokuapp.com/order/"

export default {API_URL_HEROKU}

export const axiosClient = axios.create({
    baseURL: `${API_URL_HEROKU}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

export const apiGetOrderByUserId = (id) => {
    return axiosClient.get(`order/list/${parseInt(id)}`);
}

export const apiGetOrderById = (id) => {
    return axiosClient.get(`order/${parseInt(id)}`);
}
