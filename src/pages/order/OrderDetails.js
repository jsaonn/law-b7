import React, { useEffect, useState, useContext } from "react";
import styles from "./Order.module.css";
import pict from "../../assets/menu-img.jpg";
import { apiGetAllRestaurantData } from "../restaurant/__axios__";

const RestaurantList = () => {

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


    const { user } = useContext(UserContext);
    if (user === null) {return <Navigate to='/login' />}

    return(
        <>
            <div className={`${styles.containerParent}`}>
                <div className={`${styles.containerContent}`}>
                    <div className={`${styles.detailHeader}`}>
                        Order ID: 007
                    </div>
                    <div className={`${styles.detailSubHeader}`}>
                        Mekdi
                    </div>
                    <div className={`${styles.content}`}>
                        {
                            dataRestaurant.map((data) => {
                                return(
                                    <div className={`${styles.cardDetails}`}>
                                        <div className={`${styles.row}`}>
                                            <div className={`${styles.cardOrderImage}`}>
                                                <img src={pict} alt="restaurant pict" className={`${styles.restaurantImage}`} />  
                                            </div>
                                            <div className={`${styles.cardOrderDetailInfo}`}>
                                                <div className={`${styles.column}`}>
                                                    <div className={`${styles.orderName}`}>
                                                        {data.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.price}`}>
                                                <div className={`${styles.column}`}>
                                                    <div className={`${styles.menuPrice}`}>
                                                        @Rp 35.000
                                                    </div>
                                                    <div className={`${styles.qtyDisplay}`}>
                                                        Qty: x
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className={`${styles.orderDetailContainer}`}>
                            <div className={`${styles.row}`}>
                                <div className={`${styles.orderDetailLabel}`}>
                                    Total
                                </div>
                                <div className={`${styles.orderDetailData}`}>
                                    Rp 300.000
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.orderDetailContainer}`}>
                            <div className={`${styles.row}`}>
                                <div className={`${styles.orderDetailLabel}`}>
                                    Status
                                </div>
                                <div className={`${styles.orderDetailStatus}`}>
                                    On Going
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantList
