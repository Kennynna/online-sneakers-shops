import React from 'react';
import axios from 'axios';
import Header from "./components/Header";
import Overlay from "./components/Overlay/Overlay";
import { Route, Routes } from "react-router-dom";
import Home from './Page/Home.jsx';
import Favorite from './Page/Favorite.jsx';
import Error from './Page/Error.jsx';
import Navigate from './components/Navigate.js';
import AppContext from './context.js';
import Orders from './Page/Orders.jsx';


// массив кроссовок находится на бэке. Из-за того что там ограничение нам пришлось создать 2 акк что создать 3 массива

function App() {
  //menu Items
  const [items, setItems] = React.useState([])
  //Basket items
  const [cartItems, setCartItems] = React.useState([])
  //Поиск
  const [searchValue, setSearchValue] = React.useState('')
  //Избранное
  const [favorites, setIsFavorites] = React.useState([])
  /*Здесь мы пытаемся сделать карзину видимой или невидимой*/
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)
  //============================================================================
  //                                    Методы
  //============================================================================

  //запрос на сервер с полследущим заполнения нашего хука item
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse, favoritesResponse] = await Promise.all([
          axios.get('https://6545fd86fe036a2fa9550e7a.mockapi.io/cart/'),
          axios.get('https://6545fd86fe036a2fa9550e7a.mockapi.io/items/'),
          axios.get('https://654b968b5b38a59f28ef5cf4.mockapi.io/favorites/')
        ])

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setIsFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
      }


    }
    fetchData(); //мы сделали ассин функцию для того чтобы у нас исправно работал хук USeEffect
  }, []);

  //добавление на сервер объект при клике на +
  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.parrentId) === Number(obj.id))) {
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        await axios.delete(`https://654b968b5b38a59f28ef5cf4.mockapi.io/favorites/${obj.id}`)
      } else {
        const { data } = await axios.post('https://6545fd86fe036a2fa9550e7a.mockapi.io/cart/', obj)
        setCartItems((prev) => [...prev, data]) //создание массива объекта при клике на + в каррточке 
        setCartItems((prev) => prev.map(item => {
          if (item.parrentId === data.parrentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert('Не получилось добавить товар в корзину')
    }

  }

  // удаление товара с сервера и с корзины
  const onRemoveItem = (id) => {
    axios.delete(`https://6545fd86fe036a2fa9550e7a.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
  }
  //метод добавления в избранное
  const onAddToFavorite = async (obj) => {
    try {

      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://654b968b5b38a59f28ef5cf4.mockapi.io/favorites/${obj.id}`)
        setIsFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://654b968b5b38a59f28ef5cf4.mockapi.io/favorites/', obj)
        setIsFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }

  }

  //Метод поиска по названию
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parrentId) === Number(id))
  }



  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
      <div className="wrapper clear mt-40 ">

        {/* правое окно КОРЗИНЫ */}
        <Overlay //условие отображение корзины. 
          items={cartItems} // отображение крсовок
          onCloseCart={() => setCartOpened(false)}// закрытие карзины 
          onRemove={onRemoveItem}
          opened={cartOpened} />


        <Header onClickCart={() => setCartOpened(true)} /> {/*Header у тебя будет функция onClickCart которая будет делать true*/}
        {/* content */}
        {/* Sneakers*/}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorite"
            element={
              <Favorite
              />
            }
          />

          <Route
            path="/orders"
            element={
              <Orders
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
