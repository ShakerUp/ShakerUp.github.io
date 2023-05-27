import React from 'react';
import axios from "axios";
import { useCart } from '../hooks/useCart';
import Info from '../Info/Info'

import styles from './Drawer.module.scss'

function Drawer({ onClose, items = [], onRemove, opened}) {
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { cartItems, setCartItems, totalPrice } = useCart();

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://645941b24eb3f674df8b987d.mockapi.io/orders', { items: cartItems });

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://645634a75f9a4f23613d742d.mockapi.io/cart/${item.id}`)
            }
            setIsOrderCompleted(true);
            setCartItems([]);
            setOrderId(data.id);
        } catch (e) {
            alert('He удалось создать заказ')
            console.log(e)
        }
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : '' }`}>
            <div className={styles.drawer}>
                <h2>Корзина:  <img onClick={onClose} className="cartItemRemove" src="/img/deletecart.svg" alt="Close" /></h2>
                {items.length > 0 ? <>
                    <div className="items">
                        {items.map((obj) => (
                            <div key={obj.id} className="cartItem">
                                <img className="imgSneakers" width={70} height={70} src={obj.imageUrl} alt="Sneakers" />
                                <div className="cartInfoDiv">
                                    <p>{obj.titile}</p>
                                    <b>{obj.price} uah.</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className="cartItemRemove" src="/img/deletecart.svg" alt="Delete" />
                            </div>
                        ))}
                    </div>
                    <div className="cartTotalBlock">
                        <ul>
                            <li className="li-cart">
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} uah.</b>
                            </li>
                            <li className="li-cart">
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{(totalPrice * 0.05).toFixed(1)} uah.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenbutton">
                            Офформить заказ <img src="/img/arrow.svg" alt="arrow"></img>
                        </button>
                    </div> </> :
                    <Info
                        title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
                        desc={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотябы одну пару кросовок, чтобы сделать заказ"}
                        image={isOrderCompleted ? "/img/order-tick.svg" : "/img/empty-cart.png"}
                    />
                }
            </div>
        </div>
    )
}

export default Drawer;