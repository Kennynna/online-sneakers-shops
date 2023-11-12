import React from 'react';
import axios from 'axios';
import Header from "./components/Header";
import Overlay from "./components/Overlay";
import { Route, Routes } from "react-router-dom";
import Home from './Page/Home.jsx';
import Favorite from './Page/Favorite.jsx';
import Error from './Page/Error.jsx';



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
  //============================================================================
  //                                    Методы
  //============================================================================

  //запрос на сервер с полследущим заполнения нашего хука item
  React.useEffect(() => {
    /*fetch('https://6545fd86fe036a2fa9550e7a.mockapi.io/items')
    .then(res => { // 1  отправь запрос на бэк
      return res.json() //2  затем преврати ответь мне в формат Json
    }).then ((json) => { // 3 вытащи json из этой переменной
      setItems(json);//4 передай его в setItmes
    })*/
    //Это тоже самое что и верхний fetch только сокрощенние через Axios 
    // получение товаров находящихся на сервера 
    axios.get('https://6545fd86fe036a2fa9550e7a.mockapi.io/items/').then((res) => {
      setItems(res.data)
    })
    // получение в карзине тех товаров на которые мы кликнули +
    axios.get('https://6545fd86fe036a2fa9550e7a.mockapi.io/cart/').then((res) => {
      setCartItems(res.data)
    })
    axios.get('https://654b968b5b38a59f28ef5cf4.mockapi.io/favorites/').then((res) => {
      setIsFavorites(res.data)
    })
  }, []);

  //добавление на сервер объект при клике на +
  const onAddToCart = (obj) => {
    axios.post('https://6545fd86fe036a2fa9550e7a.mockapi.io/cart/', obj)
    setCartItems((prev) => [...prev, obj]) //создание массива объекта при клике на + в каррточке 
  }
  
  // удаление товара с сервера и с корзины
  const onRemoveItem = (id) => {
    axios.delete(`https://6545fd86fe036a2fa9550e7a.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }
  //метод добавления в избранное
  const onAddToFavorite = (obj) => {
    if(favorites.find((favObj) => favObj.id === obj.id)){
      axios.delete(`https://654b968b5b38a59f28ef5cf4.mockapi.io/favorites/${obj.id}`)
    } else{
      axios.post('https://654b968b5b38a59f28ef5cf4.mockapi.io/favorites/', obj)
      setIsFavorites((prev) => [...prev, obj])
    }
    
  }
  
  //Метод поиска по названию
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }




  return (
    <div className="wrapper clear mt-40 ">
      {/* правое окно КОРЗИНЫ */}
      {cartOpened ? <Overlay //условие отображение корзины. 
        items={cartItems} // отображение крсовок
        onCloseCart={() => setCartOpened(false)}// закрытие карзины 
        onRemove={onRemoveItem} /> //удаление кросов при клике на крестик
        : null}

      <Header onClickCart={() => setCartOpened(true)} /> {/*Header у тебя будет функция onClickCart которая будет делать true*/}
      {/* content */}
      {/* Sneakers*/}
      
      <Routes>
        <Route
        path="/"
        element={
          <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          />
        }
        />
        <Route 
        path="/favorite"
        element={
          <Favorite
          items={favorites}
          onAddToFavorite={onAddToFavorite}
          />
        }
        />
      </Routes>
    </div>
  );
}

export default App;
