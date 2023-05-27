import React from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home'
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartItemsResponse = await axios.get('https://645634a75f9a4f23613d742d.mockapi.io/cart');
        const favouriteResponse = await axios.get('https://645941b24eb3f674df8b987d.mockapi.io/favourites');
        const itemsResponse = await axios.get('https://645634a75f9a4f23613d742d.mockapi.io/items');

        setIsLoading(false);

        setFavourites(favouriteResponse.data);
        setCartItems(cartItemsResponse.data);
        setItems(itemsResponse.data);
      } catch (e) {
        alert('Ошибка при получении данных')
      }
    }
    fetchData();
  }, [])

  const onAddToCart = async (item) => {
    const findItem = cartItems.find((obj) => Number(obj.parentId) === Number(item.id));
    try {
      if (findItem) {
        await axios.delete(`https://645634a75f9a4f23613d742d.mockapi.io/cart/${findItem.id}`);
        setCartItems(prev => prev.filter((obj) => Number(obj.parentId) !== Number(item.id)));
      } else {
        const { data } = await axios.post('https://645634a75f9a4f23613d742d.mockapi.io/cart', item)
        setCartItems(prev => [...prev, data])
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onAddToFavourites = async (item) => {
    try {
      if (favourites.find((favObj) => Number(favObj.id) === Number(item.id))) {
        axios.delete(`https://645941b24eb3f674df8b987d.mockapi.io/favourites/${item.id}`);
        setFavourites((prev) => prev.filter((obj) => Number(obj.id) !== Number(item.id)));
      } else {
        axios.post('https://645941b24eb3f674df8b987d.mockapi.io/favourites', item)
          .then((res) => setFavourites(prev => [...prev, res.data]))
      }
    } catch (e) {
      alert('He удалось добавить в фавориты');
      console.error(e);
    }
  }

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://645634a75f9a4f23613d742d.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(item => item.id !== id))
    } catch (e) {
      alert('Ошибка при удалени из корзины')
    }

  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isCartItemAdded = (id) => {
    return cartItems.some((item) => Number(item.parentId) === Number(id));
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favourites,
        isCartItemAdded,
        setCartOpened,
        onAddToCart,
        onAddToFavourites,
        setCartItems
      }}>
      <div className="wrapper">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path='/' element={
            <Home
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              setSearchValue={setSearchValue}
              items={items}
              onAddToCart={onAddToCart}
              onAddToFavourites={onAddToFavourites}
              cartItems={cartItems}
              isLoading={isLoading}
            />
          } />
          <Route path='/favourites' element={
            <Favourites onAddToFavourites={onAddToFavourites} />
          } />
          <Route path='/orders' element={
            <Orders />
          } />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export default App;
