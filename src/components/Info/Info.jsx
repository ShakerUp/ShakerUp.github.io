import React from "react";
import { AppContext } from "../../App";

function Info({ title, desc, image }) {
    const { setCartOpened } = React.useContext(AppContext);

    return (
        <div className="emptyCart">
            <img width={120}  src={image} alt="Empty" />
            <h2>{title}</h2>
            <p>{desc}</p>
            <button onClick={() => setCartOpened(false)} className="greenbutton">
                Вернуться назад <img src="/img/arrow.svg" alt="arrow"></img>
            </button>
        </div>
    )
}

export default Info;