### Ошибки возникающие во время добавления товаров в корзину, их оформление или в избраноое или удаление их от туда по моему мнению из-за id который передается по разному в разных частях нашего сайта.

## Надо завершить удаление товара с корзины и с сервера
## Добавить верстку если корзина пуста



////////
## Установка Sass тоже зависит от версии node поэтому надо мониторить
## Установка rout. !!! Cледить за актуальной версией так как она устанавливается по разному
```
npm install react-router-dom
```

```
страница Index.js


import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <App />
  </Router>

========================================================================
  Страница App.js
import { Route, Routes } from "react-router-dom";

<Routes>
<Route
path="/"
element={
<Home
items={items}
searchValue={searchValue}
setSearchValue={setSearchValue}
onChangeSearchInput={onChangeSearchInput}
onAddToFavorite={onAddToFavorite}
onAddToCart={onAddToCart}
/>
}
/>
</Routes>
);



```