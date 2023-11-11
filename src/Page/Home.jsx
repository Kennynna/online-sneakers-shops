import Card from "../components/Card/Card"



const Home = ({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
}) =>{
    return(
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
    )
}
export default Home