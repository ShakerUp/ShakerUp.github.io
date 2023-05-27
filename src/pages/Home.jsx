import React from 'react';
import Card from '../components/Card/Card';
import { AppContext } from "../App";

function Home({ searchValue, onChangeSearchInput, setSearchValue, items, onAddToCart, onAddToFavourites, isLoading }) {

    const renderItems = () => {
        const filteredItems = items.filter((item) => item.titile.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(16)] : filteredItems).map((obj, index) => (
            <Card
                key={index}
                onPlus={(item) => onAddToCart(item)}
                onFavourite={(item) => onAddToFavourites(item)}
                loading={isLoading}
                {...obj}
            />
        ));
    };
    return (
        <div className="content">
            <div className="first-info">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Bce кросовки:'}</h1>
                <div className="search-block">
                    <img src="/img/search.svg" alt="Search" />
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."></input>
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear" src="/img/deletecart.svg" alt="Clear" />}
                </div>
            </div>
            <div className="sneakers">
                {renderItems()}
            </div>
        </div>
    );
};

export default Home;