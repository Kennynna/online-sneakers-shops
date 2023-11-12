import Card from "../components/Card/Card"

const Favorites = ({
  items,
  onAddToFavorite
}) =>{
    return(
        <div className=" content p-40">
        <div className="Titlemd d-flex align-center justify-between mb-40">
          <h1>Мои закладки</h1>
        </div>

        <div className="mainCards d-flex">

          {/* Карточка товара на главной странице */}
          {items.map((item, index) => ( //5 этот json помещенный в items возьми и отрендори (То есть на каждом шаге будет создавать карточка с данными) 
              <Card // 6 и в каждую карточку добавь то что есть в json
                key={index}// левая часть это пропсы нашей карточки а справа это инофрмация бэка 
                onFavorite={onAddToFavorite}
                favorited={true}
                {...item} /> //Это означает сокрощенно означает все свойства item
            ))}
        </div>
      </div>
    )
}
export default Favorites