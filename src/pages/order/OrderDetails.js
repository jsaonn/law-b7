import React, { useEffect, useState} from "react";
import styles from "./Order.module.css";
import { apiGetOrderById } from "./axiosOrder";
import { apiGetMenuDetail } from "../restaurant/axiosRestaurant";
import { useNavigate, useParams, Navigate } from "react-router-dom";

const OrderDetail = () => {

    let { idOrder } = useParams();
    const [dataOrder, setDataOrder] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [dataMenu, setDataMenu] = useState([])

    useEffect(() => {
        const getDataOrder = () => {

            apiGetOrderById(idOrder).then(
                result => {
                    setDataOrder(result.data.data);
                    setIsDataFetched(true);

                    let listMenu = result.data.data['orderMenuData']
                    let temp = []
                    let promises = []
                    for (let i=0; i<listMenu.length; i++) {
                        let id = listMenu[i]['menu_id'];
                        promises.push(
                            apiGetMenuDetail(id).then(response => {
                                temp.push(response);
                            })
                        );
                        // apiGetMenuDetail(id).then(
                        //     result => {
                        //         temp.push(result.data.data);
                        //     }
                        // )
                    }
                    // Promise.all(promises).then(
                    //     result => {
                    //         temp.push(result);
                    //     }
                    // )
                    Promise.all(promises).then(()=>setDataMenu(temp))
                    // setDataMenu(temp)
                }
            )
        }

        if(!dataOrder.length && !isDataFetched, !dataMenu.length) {
            getDataOrder();
        }
    }, [dataOrder, isDataFetched, dataMenu]);

    return(
        <>
            <div className={`${styles.containerParent}`}>
                <div className={`${styles.containerContent}`}>
                    <div className={`${styles.detailHeader}`}>
                        Order ID: {dataOrder.id}
                    </div>
                    <div className={`${styles.detailSubHeader}`}>
                        {dataOrder.restaurant_name}
                    </div>
                    <div className={`${styles.content}`}>
                        {
                            dataMenu &&
                            dataMenu.map((data, index) => {
                                return(
                                    <div className={`${styles.cardDetails}`} key={index}>
                                        <div className={`${styles.row}`}>
                                            <div className={`${styles.cardOrderDetailInfo}`}>
                                                <div className={`${styles.column}`}>
                                                    <div className={`${styles.orderName}`}>
                                                        {data.data.data.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.price}`}>
                                                <div className={`${styles.column}`}>
                                                    <div className={`${styles.menuPrice}`}>
                                                        @Rp {data.data.data.price}
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
                                    Status
                                </div>
                                <div className={`${styles.orderDetailStatus}`}>
                                    {dataOrder.status}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail
