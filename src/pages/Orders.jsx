import React from "react";
import Card from "../components/Card/Card";
import axios from "axios";
import { AppContext } from "../App";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { onAddToCart, onAddToFavourites } = React.useContext(AppContext)

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://645941b24eb3f674df8b987d.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (e) {
                alert('Ошибка')
            }
        })();
    }, []);

    return (
        <div className="content">
            <div className="first-info">
                <h1>Мои заказы:</h1>
            </div>
            <div className="sneakers">
                {(isLoading ? [...Array(16)] : orders).map((obj, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...obj} />
                ))}
            </div>
        </div>
    );
};

export default Orders;