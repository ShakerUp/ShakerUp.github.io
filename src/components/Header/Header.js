import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header>
            <Link to="/" className="header-link">
                <div className="headerLeft">
                    <img width={40} height={40} src="/img/sneakers.png" alt="" />
                    <div className="headerInfo">
                        <h3>React Sneakers</h3>
                        <p>Магазин лучших кросовок</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight">
                <li onClick={props.onClickCart} style={{ cursor: "pointer" }}>
                    <img width={20} height={20} src="/img/cart.svg" alt="" />
                    <span>{totalPrice} uah.</span>
                </li>
                <li>
                    <Link to="/favourites">
                        <img className="favourites-heart" width={20} height={20} src="/img/heart.svg" alt="Favourites" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={20} height={20} src="/img/union.svg" alt="User" />
                    </Link>
                </li>
            </ul>
        </header >
    );
}

export default Header;