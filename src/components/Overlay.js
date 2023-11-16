


function Overlay({ onCloseCart, onRemove, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer ">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img onClick={onCloseCart} className='removeBtn' src="/img/btn-remove.svg" alt="" />
        </h2>

        {/* Пуская корзина */}
        {items.length <= 0 ?
          <div class='cartEmpty d-flex align-center justify-center flex-column flex' >
            <img class='mb-20' width='120px' height='120px' src="/img/empty-cart.png" alt="no-basket" />
            <h2>Корзина пустая</h2>
            <p class='opacity-6'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
            <button onClick={onCloseCart}
              class='greenButton'>
              <img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
            </button>
          </div>
          :
          null
        }



        {/* Карточки товара в корзине */}
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