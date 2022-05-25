import React, { useEffect, useState, useContext } from "react";
import styles from "./Order.module.css";
import pict from "../../assets/restaurant-img.jpg";
import { apiGetAllRestaurantData } from "../restaurant/__axios__";
import { useNavigate, Navigate } from "react-router-dom";

const RestaurantList = () => {

    let navigate = useNavigate();
    const [dataRestaurant, setDataRestaurant] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const getDataRestaurant = () => {

            apiGetAllRestaurantData().then(
                result => {
                    setDataRestaurant(result.data.data);
                    setIsDataFetched(true);
                }
            )
        }

        if(!dataRestaurant.length && !isDataFetched) {
            getDataRestaurant();
        }
    }, [dataRestaurant, isDataFetched]);

    const handleDetail = () => {
        navigate(`/order-details`);
    }

    return(
        <>
            <div className={`${styles.containerParent}`}>
                <div className={`${styles.containerContent}`}>
                    <div className={`${styles.header}`}>
                        <p>Your Order</p>
                    </div>
                    <div className={`${styles.content}`}>
                        {
                            dataRestaurant.map((data) => {
                                return(
                                    <div className={`${styles.card}`} onClick={() => handleDetail()}>
                                        <div className={`${styles.row}`}>
                                            <div className={`${styles.cardOrderImage}`}>
                                                <img src={pict} alt="restaurant pict" className={`${styles.restaurantImage}`} />  
                                            </div>
                                            <div className={`${styles.cardOrderInfo}`}>
                                                <div className={`${styles.column}`}>
                                                    <div className={`${styles.restaurantName}`}>
                                                        {data.name}
                                                    </div>
                                                    <div className={`${styles.orderID}`}>
                                                        Order ID: 007
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.status}`}>
                                                <div className={`${styles.column}`}>
                                                    On Going
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantList
