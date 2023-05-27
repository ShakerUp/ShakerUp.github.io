import React from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../App";

function Favourites({ onAddToFavourites }) {

    const {favourites} = React.useContext(AppContext);

    return (
        <div className="content">
            <div className="first-info">
                <h1>Мои закладки:</h1>
            </div>
            <div className="sneakers">
                {favourites.map((obj, index) => (
                    <Card
                        key={index}
                        favourited={true}
                        onFavourite={onAddToFavourites}
                        {...obj} />
                ))}
            </div>
        </div>
    );
};

export default Favourites;