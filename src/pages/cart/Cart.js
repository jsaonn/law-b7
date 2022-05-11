import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import menuPict from "../../assets/menu-img.jpg";
import { CartMenuCard } from "./CartMenuCard";

const Cart = () => {
    const dummy = [
        {
            'id': 0,
            'menuImage': menuPict,
            'menuName': 'Hamburger',
            'restaurantName': 'Sabwei',
            'menuPrice': 35000,
            'quantity': 2,
        },
        {
            'id': 1,
            'menuImage': menuPict,
            'menuName': 'Ayam Goreng',
            'restaurantName': 'Mekdi',
            'menuPrice': 27500,
            'quantity': 5,
        },
        {
            'id': 2,
            'menuImage': menuPict,
            'menuName': 'Spageti',
            'restaurantName': 'Pizahat',
            'menuPrice': 30000,
            'quantity': 1,
        }
    ]

    const [isDataFetched1, setIsDataFetched1] = useState(false)
    const [isDataFetched2, setIsDataFetched2] = useState(false)
    const [order, setOrder] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const currencyFormat = (num) => {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    const getOrderData = () => {
        setOrder(dummy)
    }

    const calcTotalPriceOrder = () => {
        let initTotalPrice = 0;

        order.map((data) => {
            initTotalPrice += (parseInt(data.quantity)*parseInt(data.menuPrice))
        })

        setTotalPrice(initTotalPrice)
    }

    useEffect(() => {
        if(!isDataFetched1) {
            getOrderData()
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
                                            menuImage={data.menuImage}
                                            menuName={data.menuName}
                                            restaurantName={data.restaurantName}
                                            menuPrice={data.menuPrice}
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
                                <div className={`${styles.payButton}`}>
                                    Pay
                                </div>
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
