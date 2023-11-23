import React from "react";
import Card from "../components/Card/Card";
import axios from "axios";

function Orders() {
  const [orders, SetOrders] = React.useEffect([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://654b968b5b38a59f28ef5cf4.mockapi.io/Orders/"
      );
    })();
  }, []);

  return (
    <div className=" content p-40">
      <div className="Titlemd d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="mainCards d-flex">
        {/* Карточка товара на главной странице */}
        {[].map((item, index) => (
          <Card />
        ))}
      </div>
    </div>
  );
}
export default Orders;
