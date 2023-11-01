import React from 'react';
import Card from "./components/Card/Card.js";
import Header from "./components/Header";
import Overlay from "./components/Overlay";

// массив кроссовок
const arrSneakers = [ 
  {
    title: 'Мужские Кроссовки Nike Air',
    price: 12129,
    imgUrl: "img/sneakers/image 1.png",
  },

  {
    title: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
    imgUrl: "img/sneakers/image 2.jpg",
  },
  {
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
    imgUrl: "img/sneakers/image 3.jpg",
  },
  {
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
    imgUrl: "img/sneakers/image 4.jpg",
  },
  {
    title: 'Мужские Кроссовки Under Armour Curry 8',
    price: 15199,
    imgUrl: "img/sneakers/image 5.jpg",
  },
  {
    title: 'Мужские Кроссовки Jordan Air Jordan 11',
    price: 11299,
    imgUrl: "img/sneakers/image 6.jpg",
  },
  {
    title: 'Мужские Кроссовки Nike Kyrie 7',
    price: 10799,
    imgUrl: "img/sneakers/image 7.jpg",
  },
]
function App() {
  const [cartOpened, setCartOpened] = React.useState(false);{/*Здесь мы пытаемся сделать карзину видимой или невидимой*/}

  return (
    <div className="wrapper clear mt-40 ">
      {/* правое окно КОРЗИНЫ */}
    {cartOpened ?  <Overlay onCloseCart = {() => setCartOpened(false)}/> : null}  
    

      <Header onClickCart = {() => setCartOpened(true)}  /> {/*Header у тебя будет функция onClickCart которая будет делать true*/}
      {/* content */}
      {/* Sneakers*/}
      <div className=" content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кросcовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="mainCards d-flex">
          {/* Карточка товара на главной странице */}
          {arrSneakers.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imgUrl={obj.imgUrl}
              onPlus={() => console.log('plus')}
              onFavorite={() => console.log('plusFV')} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
