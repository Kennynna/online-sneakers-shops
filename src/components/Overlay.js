import React from "react"
import Info from "./Info"
import AppContext from "../context"
import axios from "axios"
import { useCart } from "../hooks/useCart"


const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

function Overlay({ onCloseCart, onRemove, items = [] }) {
  const {cartItems, setCartItems,totalPrice} = useCart()
  const [orderId, setOrderId] = React.useState(null)
  const [isOrederComplate, setIsOrederComplate] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://654b968b5b38a59f28ef5cf4.mockapi.io/Orders/', {
        items: cartItems,
      });
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6545fd86fe036a2fa9550e7a.mockapi.io/cart/' + item.id)
        await delay(100)
      }
      setOrderId(data.id)
      setIsOrederComplate(true)
      setCartItems([])
    } catch (error) {
      alert('Не удалось создать заказ ')
    }
    setIsLoading(false)
  }


  return (
    <div className="overlay">
      <div className="drawer ">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img onClick={onCloseCart} className='removeBtn' src="/img/btn-remove.svg" alt="" />
        </h2>

        {/* ПусТая корзина */}
        {items.length > 0 ?
          (
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div style={{ backgroundImage: `url(${obj.imgUrl})` }} className="cartItemImg">
                  </div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img className='removeBtn'
                    onClick={() => onRemove(obj.id)}
                    src="/img/btn-remove.svg" alt="" />

                </div>
              ))}
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб</b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{(totalPrice * 5 / 100)} руб</b>
                  </li>
                </ul>

                <button
                  disabled={isLoading}
                  onClick={onClickOrder}
                  className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="" /></button>
              </div>
            </div>
          ) : (
            <Info
              title={isOrederComplate ? 'Заказ оформлен' : 'Корзина пустая'}
              description={isOrederComplate ? `Ваш заказ ${orderId}скоро будет передан курьерской доставке` : 'Добавьте хотябы одну пару кроссовок'}
              image={isOrederComplate ? '/img/zakaz-complate.png' : '/img/empty-cart.png'}
            />
          )}

        {/* Нижний итог */}
      </div>
    </div>
  )
}

export default Overlay