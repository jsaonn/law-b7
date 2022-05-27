import axios from "axios";
const CART_API_GATEWAY_URL = "https://api-gateway-law.herokuapp.com/cart"
// const API_URL_HEROKU = "https://cart-service-law.herokuapp.com/cart"

export default {CART_API_GATEWAY_URL}

export const axiosClient = axios.create({
    baseURL: `${CART_API_GATEWAY_URL}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('access_token')
    },
})

export const apiGetCartMenuList = (user) => {
    return axiosClient.get("/", {user: {user_id: user['user_id'], username: user['user_name'], email: user['email']}});
}

export const apiSetMenuQty = (menuId, newQuantity, user) => {
    return axiosClient.put(`/set-menu-qty/${parseInt(menuId)}`, {quantity: parseInt(newQuantity), user: {user_id: user['user_id'], username: user['user_name'], email: user['email']}})
}

export const apiDeleteMenu = (menuId, user) => {
    return axiosClient.delete(`/delete/menu/${parseInt(menuId)}`, {user: {user_id: user['user_id'], username: user['user_name'], email: user['email']}})
}

export const addMenu = (menuId, quantity, user) => {
    return axiosClient.post(`/add/menu/${parseInt(menuId)}`, {quantity: parseInt(quantity), user: {user_id: user['user_id'], username: user['user_name'], email: user['email']}})
}
