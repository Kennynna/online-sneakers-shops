import React from 'react';
import axios from 'axios';
import Card from "./components/Card/Card.js";
import Header from "./components/Header";
import Overlay from "./components/Overlay";


// массив кроссовок находится на бэке. Из-за того что там ограничение нам пришлось создать 2 акк что создать 3 массива

function App() {
  //menu Items
  const [items, setItems] = React.useState([])
  //Basket items
  const [cartItems, setCartItems] = React.useState([])
  //Поиск
  const [searchValue, setSearchValue] = React.useState('')
  //Избранное
  const [favorites, setIsFavorites] = React.useState('')


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
    axios.get('https://6545fd86fe036a2fa9550e7a.mockapi.io/items').then((res) => {
      setItems(res.data)
    })
    // получение в карзине тех товаров на которые мы кликнули +
    axios.get('https://6545fd86fe036a2fa9550e7a.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    })
  }, []);

  //добавление на сервер объект при клике на +
  const onAddToCart = (obj) => {
    axios.post('https://6545fd86fe036a2fa9550e7a.mockapi.io/cart', obj)
    setCartItems((prev) => [...prev, obj]) //создание массива объекта при клике на + в каррточке 
  }
  // удаление товара с сервера и с корзины
  const onRemoveItem = (id) => {
    axios.delete(`https://6545fd86fe036a2fa9550e7a.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }
  //Метод поиска по названию
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  //метод добавления в избранное
  const onAddToFavorite = (obj) => {
    axios.post('https://654b968b5b38a59f28ef5cf4.mockapi.io/favorites', obj)
    setIsFavorites((prev) => [...prev, obj])

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
      <div className=" content p-40">
        <div className="Titlemd d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу ${searchValue}` : `Все кроссовки`}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input
              onChange={onChangeSearchInput}
              placeholder="Поиск..."
              value={searchValue} />
            {searchValue && <img width={19} height={19} //написали если в input что то есть то появится svg с крестиком 
              className='SearchRemoveBtn' src="/img/btn-remove.svg" alt="clear"
              onClick={() => setSearchValue('')} />}
          </div>
        </div>

        <div className="mainCards d-flex">

          {/* Карточка товара на главной странице */}
          {items
            .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())) //найди мне item.title переведи в нижний регистр и найди там все что есть у нас в SearchValue и переведи это в нижний регистр
            .map((item, index) => ( //5 этот json помещенный в items возьми и отрендори (То есть на каждом шаге будет создавать карточка с данными) 
              <Card // 6 и в каждую карточку добавь то что есть в json
                key={index}
                title={item.title} // левая часть это пропсы нашей карточки а справа это инофрмация бэка 
                price={item.price}
                imgUrl={item.imageUrl}
                onPlus={(obj) => onAddToCart(obj)} //в документе card мы добавили этой функции объекты title price imgurl
                onFavorite={(obj) => onAddToFavorite(obj)} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
