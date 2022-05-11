import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { AiFillMinusCircle, AiFillPlusCircle, AiTwotoneDelete } from 'react-icons/ai';

export const CartMenuCard = ({id, menuImage, menuName, restaurantName, menuPrice, initQuantity, order, setOrder, calcTotalPriceOrder }) => {
    const [quantityDisplay, setQuantityDisplay] = useState(initQuantity)

    useEffect(() => {
        setQuantityDisplay(initQuantity)
    }, [initQuantity])

    const currencyFormat = num => {
        num = parseInt(num)
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    const handleChange = event => {
        let tempOrder = order
        tempOrder.map(order => {
            if(order['id'] == id) {
                order['quantity'] = parseInt(event.target.value) || 0
            }
        })
        setQuantityDisplay(event.target.value)
        setOrder(tempOrder)
        calcTotalPriceOrder()
    }

    const handleMinus = quantityDisplay => {
        if(parseInt(quantityDisplay) > 0) {
            let newQuantity = parseInt(quantityDisplay)-1
            let tempOrder = order
            tempOrder.map(order => {
                if(order['id'] == id) {
                    order['quantity'] = newQuantity
                }
            })
            setQuantityDisplay(newQuantity)
            setOrder(tempOrder)
            calcTotalPriceOrder()
        }
    }

    const handlePlus = quantityDisplay => {
        let newQuantity = parseInt(quantityDisplay)+1
        let tempOrder = order
        tempOrder.map(order => {
            if(order['id'] == id) {
                order['quantity'] = newQuantity
            }
        })
        setQuantityDisplay(newQuantity)
        setOrder(tempOrder)
        calcTotalPriceOrder()
    }

    const handleDeleteItem = () => {
        let tempOrder = order
        tempOrder = tempOrder.filter((currentOrder) => {
            return currentOrder.id != id
        })
        setOrder(tempOrder)
        calcTotalPriceOrder()
    }

    return (
        <>
            <div className={`${styles.card}`}>
                <div className={`${styles.row}`}>
                    <div className={`${styles.cardMenuImage}`}>
                        <img src={menuImage} alt="menu pict" className={`${styles.menuImage}`} />
                    </div>
                    <div className={`${styles.cardMenuDetail}`}>
                        <div className={`${styles.column}`}>
                            <div className={`${styles.menuName}`}>
                                {menuName}
                            </div>
                            <div className={`${styles.restaurantName}`}>
                                {restaurantName}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.cardMenuPrice}`}>
                        <div className={`${styles.column}`}>
                            <div className={`${styles.menuPrice}`}>
                                {currencyFormat(menuPrice)}
                            </div>
                            <div className={`${styles.inputForm}`}>
                                <AiFillMinusCircle 
                                    size={25} 
                                    onClick={() => handleMinus(quantityDisplay)} 
                                    onMouseOver={({target})=>target.style.cursor="pointer"}
                                />
                                <input type="number" value={quantityDisplay} style={{width: 30}} onChange={(event) => handleChange(event)} />
                                <AiFillPlusCircle 
                                    size={25} 
                                    onClick={() => handlePlus(quantityDisplay)} 
                                    onMouseOver={({target})=>target.style.cursor="pointer"}
                                />
                            </div>
                            <div className={`${styles.deleteMenuFromCartButton}`}>
                                <AiTwotoneDelete size={25} onMouseOver={({target})=>target.style.cursor="pointer"} onClick={() => handleDeleteItem()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
