import Card from "./components/Card";
import Header from "./components/Header";
import Overlay from "./components/Overlay";

function App() {
  return (
    <div className="wrapper clear mt-40 ">
      {/* правое окно КОРЗИНЫ */}
      <Overlay/>


      <Header/>



    {/* content */}


      {/* Sneakers*/}
      <div className=" content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Все кросcовки</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search"/>
          <input placeholder="Поиск..."/>
        </div>
      </div>

      <div className="mainCards d-flex">
      {/* Карточка товара на главной странице */}
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>

      </div>
    </div>
      </div>
  );
}

export default App;
