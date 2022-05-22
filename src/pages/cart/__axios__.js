import axios from "axios";
const API_URL_HEROKU = "https://cart-service-law.herokuapp.com/cart"

export default {API_URL_HEROKU}

export const axiosClient = axios.create({
    baseURL: `${API_URL_HEROKU}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('access_token')
    },
})

export const apiGetCartMenuList = () => {
    return axiosClient.get("/");
}

export const apiSetMenuQty = (menuId, newQuantity) => {
    return axiosClient.put(`/set-menu-qty/${parseInt(menuId)}`, {quantity: parseInt(newQuantity)})
}

export const apiDeleteMenu = (menuId) => {
    return axiosClient.delete(`/delete/menu/${parseInt(menuId)}`)
}

export const addMenu = (menuId, quantity) => {
    return axiosClient.post(`/add/menu/${parseInt(menuId)}`, {quantity: parseInt(quantity)})
}
