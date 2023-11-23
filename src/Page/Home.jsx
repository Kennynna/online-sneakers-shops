import React from "react"
import Card from "../components/Card/Card"

const Home = ({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading
})  => { 


  const renderItems = () =>{ //отображение карточке (фековых или настоящих) пока грузяться наши карточки
  const filteredItems = items.filter((item)=>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => ( //5 этот json помещенный в items возьми и отрендори (То есть на каждом шаге будет создавать карточка с данными) 
      <Card // 6 и в каждую карточку добавь то что есть в json
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)} //в документе card мы добавили этой функции объекты title price imgurl
        loading={isLoading}
        {...item} 
      />
    ))
  };

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
          {renderItems()}
        </div>
      </div>
    )
}
export default Home