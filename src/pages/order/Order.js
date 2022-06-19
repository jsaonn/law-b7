import React, { useEffect, useState, useContext } from "react";
import styles from "./Order.module.css";
import { apiGetOrderByUserId } from "./axiosOrder";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth/UserContext";

const Order = () => {

    const { user } = useContext(UserContext);
    const currentUserID = user['user_id'];
    let navigate = useNavigate();
    const [dataOrder, setDataOrder] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const getDataOrder = () => {
            apiGetOrderByUserId(currentUserID).then(
                result => {
                    setDataOrder(result.data.data);
                    setIsDataFetched(true);
                }
            )
        }

        if(!dataOrder.length && !isDataFetched ) {
            getDataOrder();
        }
        
        if(dataOrder.status == "Pesanan selesai") {
            apiGetDeliveryById(idOrder).then((result) => {
                let objOrder = {
                    status: result.status
                }
                setDataOrder(objOrder)
            })
        }

    }, [dataOrder, isDataFetched]);

    const handleDetail = (id) => {
        navigate(`/order-details/${id}`);
    }

    return(
       isDataFetched && (
        <>
            <div className={`${styles.containerParent}`}>
                <div className={`${styles.containerContent}`}>
                    <div className={`${styles.header}`}>
                        <p>Your Order</p>
                    </div>
                    <div className={`${styles.content}`}>
                        {
                            dataOrder.map((data, index) => {
                                return(
                                    <div className={`${styles.card}`} onClick={() => handleDetail(data.id)} key={index}>
                                        <div className={`${styles.row}`}>
                                            <div className={`${styles.cardOrderInfo}`}>
                                                <div className={`${styles.column}`}>
                                                    <div className={`${styles.restaurantName}`}>
                                                        {data.restaurant_name}
                                                    </div>
                                                    <div className={`${styles.orderID}`}>
                                                        Order ID: {data.id}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.status}`}>
                                                <div className={`${styles.column}`}>
                                                    {data.status}
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
    )
}

export default Order
