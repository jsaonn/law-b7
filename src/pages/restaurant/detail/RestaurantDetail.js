import React, { useEffect, useState, useContext } from "react";
import StarRatingComponent from 'react-star-rating-component';
import styles from "./RestaurantDetail.module.css";
import restoPict from "../../../assets/restaurant-img.jpg";
import menuPict from "../../../assets/menu-img.jpg";
import { BiTime, BiArrowBack } from 'react-icons/bi';
import { AiOutlineHome, AiOutlinePhone, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { apiGetRestaurantDataById } from "../axiosRestaurant";
import { UserContext } from "../../auth/UserContext";
import { addMenu } from "../../cart/__axios__";

const RestaurantDetail = () => {
    let navigate = useNavigate();
    let { idRestaurant } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState({});
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [orderNumber, setOrderNumber] = useState([]);

    useEffect(() => {
        const getDataRestaurantById = (id) => {

            apiGetRestaurantDataById(id).then(
                result => {
                    setRestaurantDetail(result.data.data);

                    let initOrder = [];
                    for(let menu of result.data.data['menuData']){
                        initOrder.push({
                            id: `${menu.id}`,
                            order: 0,
                        })
                    }

                    setOrderNumber(initOrder);
                    setIsDataFetched(true);
                }
            )
        }

        if(idRestaurant && !restaurantDetail.length && !isDataFetched) {
            getDataRestaurantById(idRestaurant);
        }
    }, [restaurantDetail, idRestaurant, isDataFetched])

    const currencyFormat = (num) => {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    const handleChange = (event, idx) => {
        orderNumber.map(menu => {
            if(menu['id'] == idx){
                menu['order'] = parseInt(event.target.value);
            }
        })
    }

    const handleMinus = (idx) => {
        orderNumber.map(menu => {
            if(menu['id'] == idx){
                menu['order'] -= 1;
                if(menu['order'] <= 0) {
                    menu['order'] = 0;
                }
                document.getElementById(idx).value = menu['order'];
            }
        })
    }

    const handlePlus = (idx) => {
        orderNumber.map(menu => {
            if(menu['id'] == idx){
                menu['order'] += 1;
                document.getElementById(idx).value = menu['order'];
            }
        })
    }

    const handleAdd = (idx) => {
        let quantity = document.getElementById(idx).value
        addMenu(idx, quantity).then(
            () => {
                document.getElementById(idx).value = 0;
            }
        ).catch(error => console.log(error))
    }

    const { user } = useContext(UserContext);
    if (user === null) {return <Navigate to='/login' />}

    return(
        <>
            <div className={`${styles.containerParent}`}>
                <div className={`${styles.containerContent}`}>
                    <BiArrowBack 
                        size={50} 
                        onClick={() => navigate(-1)} 
                        onMouseOver={({target})=>target.style.cursor="pointer"}
                    />
                    <div className={`${styles.restaurantData}`}>
                        <img src={restoPict} alt="restaurant pict" className={`${styles.restaurantImage}`} />
                        <div className="containerDetail">
                            <p className={`${styles.restaurantName}`}>{restaurantDetail.name}</p>
                            <StarRatingComponent 
                                name="rate"
                                starCount={10}
                                value={restaurantDetail.rating}
                            />
                            <p className={`${styles.restaurantAddress}`}><AiOutlineHome /> {restaurantDetail.address}</p>
                            <p className={`${styles.restaurantTime}`}><BiTime /> {restaurantDetail.open_time} - {restaurantDetail.close_time}</p>
                            <p className={`${styles.restaurantNumber}`}><AiOutlinePhone /> {restaurantDetail.telp_num}</p>
                        </div>
                    </div>
                    <div className={`${styles.MenuData}`}>
                        <p className={`${styles.menuTitle}`}>Menus</p>
                        <div className={`${styles.menuContent}`}>
                            {restaurantDetail.menuData && 
                                restaurantDetail.menuData.map(data => {
                                    return(
                                        <div className={`${styles.menuElement}`} key={data.id}>
                                            <img src={menuPict} alt="menu pict" className={`${styles.menuImage}`} />
                                            <p className={`${styles.menuName}`}>{data.name}</p>
                                            <p className={`${styles.menuPrice}`}>{currencyFormat(data.price)}</p>
                                            <div className={`${styles.inputForm}`}>
                                                <AiFillMinusCircle 
                                                    size={25} 
                                                    onClick={() => handleMinus(data.id)} 
                                                    onMouseOver={({target})=>target.style.cursor="pointer"}
                                                />
                                                <input id={data.id} type="number" defaultValue={0} style={{width: 30}} onChange={(event) => handleChange(event, data.id)} />
                                                <AiFillPlusCircle 
                                                    size={25} 
                                                    onClick={() => handlePlus(data.id)} 
                                                    onMouseOver={({target})=>target.style.cursor="pointer"}
                                                />
                                            </div>
                                            <button className={`${styles.menuButton}`} onClick={() => handleAdd(data.id)}>ADD</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantDetail
