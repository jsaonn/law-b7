import axios from "axios";
const API_URL_HEROKU = "https://api-gateway-law.herokuapp.com/order/"
const DELIVERY_URL = "http://13.213.32.134:8000/"

export default {API_URL_HEROKU}

export const axiosClient = axios.create({
    baseURL: `${API_URL_HEROKU}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('access_token')
    },
})

export const axiosClientDelivery = axios.create({
    baseURL: `${DELIVERY_URL}`,
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

export const apiGetDeliveryById = (id) => {
    return axiosClient.get(`delivery/${String(id)}`)
}
