


function Overlay(props) {
  return (
    <div className="overlay">
      <div className="drawer ">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img onClick={props.onCloseCart} className='removeBtn' src="/img/btn-remove.svg" alt="" />
        </h2>

        {/* Карточки товара в корзине */}
        <div className="items">


          <div className="cartItem d-flex align-center mb-20">
          <div style={{ backgroundImage: 'url(/img/sneakers/image 1.png)' }} className="cartItemImg">

            </div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className='removeBtn' src="/img/btn-remove.svg" alt="" />
          </div>


        </div>

        {/* Нижний итог */}
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 489 руб</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб</b>
            </li>
          </ul>
          <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="" /></button>
        </div>

      </div>
    </div>
  )
}

export default Overlay