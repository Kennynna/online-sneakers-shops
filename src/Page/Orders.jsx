import React from "react";
import Card from "../components/Card/Card";
import axios from "axios";
import AppContext from "../context";

function Orders() {
  const {onAddToFavorite,onAddToCart,isLoading} = React.useContext(AppContext) // Реакт вытащи из AppContext то что в фигурных скобках
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoadimg]= React.useState(true)

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://654b968b5b38a59f28ef5cf4.mockapi.io/Orders/");
      setOrders(data.reduce((prev, obj ) => [...prev, ...obj.items],[])) //Преорбазовали несколько массивов в один 
      setIsLoadimg(false)
      } catch (error) {
        alert('Ошибка при запросе заказов')
      }
      
    })();
  }, []);

  return (
    <div className=" content p-40">
      <div className="Titlemd d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="mainCards d-flex">
        {/* Карточка товара на главной странице */}
        {orders.map((item, index) => (
          <Card key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)} //в документе card мы добавили этой функции объекты title price imgurl
          loading={isLoading}
          {...item}/>

        ))}
      </div>
    </div>
  );
}
export default Orders;
