import React from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import { AppContext } from '../../App';

function Card({ id, titile, imageUrl, onFavourite, price, onPlus, favourited = false, loading = false }) {
    const { isCartItemAdded } = React.useContext(AppContext);
    const [isFavourite, setIsFavourite] = React.useState(favourited);
    const obj = { id, parentId: id, titile, price, imageUrl };

    const onClickPlus = () => {
        onPlus(obj);
    };

    const onClickFavourite = () => {
        onFavourite(obj);
        setIsFavourite(!isFavourite);
    }

    return (
        <div className={styles.card}>
            {loading ? <ContentLoader
                speed={2}
                width={155}
                height={265}
                viewBox="0 0 155 265"
                backgroundColor="#f3f3f3">
                <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
                <rect x="0" y="160" rx="5" ry="5" width="150" height="15" />
                <rect x="0" y="180" rx="5" ry="5" width="100" height="15" />
                <rect x="118" y="220" rx="10" ry="10" width="32" height="32" />
                <rect x="0" y="225" rx="0" ry="0" width="80" height="25" />
            </ContentLoader> : <> <div className={styles.favourite} onClick={onClickFavourite}>
                {onFavourite && <img src={isFavourite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked" />}
            </div>
                <img width="100%" height={130} src={imageUrl} alt=""></img>
                <h5>{titile}</h5>
                <div className={styles.cardInfo}>
                    <div className={styles.cardInfoPrice}>
                        <span>Цена:</span>
                        <b>{price} uah.</b>
                    </div>

                    {onPlus && <img
                        className={styles.cardButton}
                        onClick={onClickPlus}
                        src={isCartItemAdded(id) ? "/img/button-checked.svg" : "/img/button-unckeked.svg"}
                        alt="Plus" />}
                </div> </>
            }
        </div>
    );
}

export default Card;