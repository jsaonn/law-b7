import React, { useEffect, useState } from "react";
import styles from "./RestaurantList.module.css";
import StarRatingComponent from 'react-star-rating-component';
import pict from "../../../assets/restaurant-img.jpg";
import { apiGetAllRestaurantData } from "../__axios__";
import { useNavigate } from "react-router-dom";

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

    const handleDetail = (idx) => {
        navigate(`/restaurant/${idx}/`);
    }

    return(
        <>
            <div className={`${styles.containerParent}`}>
                <div className={`${styles.containerContent}`}>
                    <div className={`${styles.header}`}>
                        <p>Restaurant</p>
                    </div>
                    <div className={`${styles.content}`}>
                        {
                            dataRestaurant.map((data) => {
                                return(
                                    <div className={`${styles.card}`} onClick={() => handleDetail(data.id)} key={data.id}>
                                        <img src={pict} alt="restaurant pict" className={`${styles.restaurantImage}`} />
                                        <p>{data.name}</p>
                                        <StarRatingComponent 
                                            name="rate"
                                            starCount={5}
                                            value={data.rating/2}
                                        />
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
