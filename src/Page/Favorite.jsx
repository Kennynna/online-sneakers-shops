

const Favorite = ({
  searchValue,
  onChangeSearchInput,
  setSearchValue,
}) =>{
    return(
        <div className=" content p-40">
        <div className="Titlemd d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу ${searchValue}` : `Мои закладки`}</h1>
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
          Тут наши карточки
        </div>
      </div>
    )
}
export default Favorite