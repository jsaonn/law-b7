import axios from "axios";
const API_URL_HEROKU = "https://api-gateway-law.herokuapp.com/restaurant/"

export default {API_URL_HEROKU}

export const axiosClient = axios.create({
    baseURL: `${API_URL_HEROKU}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

export const apiGetAllRestaurantData = () => {
    return axiosClient.get(`/restaurant-data/`);
}

export const apiGetRestaurantDataById = (id) => {
    return axiosClient.get(`restaurant-data/${parseInt(id)}/`);
}

export const apiGetMenuDetail = (id) => {
    return axiosClient.get(`restaurant-data/menu/${parseInt(id)}/`);
}
