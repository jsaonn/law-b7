import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import menuPict from "../../assets/menu-img.jpg";
import { CartMenuCard } from "./CartMenuCard";
import PaymentButton from "../../components/PaymentButton";
import { apiGetCartMenuList } from "./__axios__";


const Cart = () => {

    const [isDataFetched1, setIsDataFetched1] = useState(false)
    const [isDataFetched2, setIsDataFetched2] = useState(false)
    const [order, setOrder] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const currencyFormat = (num) => {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    const getOrder = () => {
        apiGetCartMenuList().then(
            result => {
                console.log(result.data)
                setOrder(result.data.cart_menu_list)
            }
        )
    }

    const calcTotalPriceOrder = () => {
        let initTotalPrice = 0;

        order.map((data) => {
            initTotalPrice += (parseInt(data.quantity)*parseInt(data.menu.price))
        })

        setTotalPrice(initTotalPrice)
    }

    useEffect(() => {
        if(!isDataFetched1) {
            getOrder()
            setIsDataFetched1(true)
        }
        if(isDataFetched1 && !isDataFetched2) {
            calcTotalPriceOrder()
            setIsDataFetched2(true)
        }
    }, [isDataFetched1, isDataFetched2])  

    useEffect(() => {
        calcTotalPriceOrder()
    }, [order])

    return(
        <>
            <div className={`${styles.containerParent}`}>
                <div className={`${styles.containerContent}`}>
                    <div className={`${styles.header}`}>
                        <p>Cart</p>
                    </div>
                    <div className={`${styles.content}`}>
                        {order.length ? (
                            <>
                                {isDataFetched2 && order.map((data) => {
                                    return (
                                        <CartMenuCard
                                            id={data['id']}
                                            menuId={data.menu.id}
                                            menuImage={menuPict}
                                            menuName={data.menu.name}
                                            restaurantName={data.restaurant.name}
                                            menuPrice={data.menu.price}
                                            initQuantity={data.quantity}
                                            order={order}
                                            setOrder={setOrder}
                                            calcTotalPriceOrder={calcTotalPriceOrder}
                                        />
                                    )
                                })}
                                <div className={`${styles.totalPriceContainer}`}>
                                    <div className={`${styles.row}`}>
                                        <div className={`${styles.totalPriceLabel}`}>
                                            Total
                                        </div>
                                        <div className={`${styles.totalPriceData}`}>
                                            {currencyFormat(totalPrice)}
                                        </div>
                                    </div>
                                </div>
                                <PaymentButton styling={`${styles.payButton}`} />
                            </>
                        ) : (
                            <>
                                <div className={`${styles.centered}`}>
                                    <div className={`${styles.noItem}`}>
                                        No Item.
                                    </div>
                                </div>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
