import React, {useState} from 'react';
import RandomRecipes from './components/RandomRecipes'
import Header from './components/Header';
import AppContext from './context'
import DrawerMenu from './components/DrawerMenu'
import Categories from './pages/Categories'
import Recipe from "./components/Recipe"
import ListRecipesByCategory from './components/ListRecipesByCategory'
import ListRecipesByCountries from './components/ListRecipesByCountry'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Countries from './pages/Countries';

function App() {

  const [isClickMenu, setIsClickMenu] = useState(false)

  return (

    <AppContext.Provider value={{isClickMenu,  setIsClickMenu}}>
      <Router>
        <div className="App">
        <Header />
            
          <DrawerMenu />
          <Routes>
            
            <Route path="/" element={<RandomRecipes />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path={`/recipe/:id`} element={<Recipe />}></Route>
            {/* <Route path={`/categories/${urlCategory}`} element={<ListRecipesByCategory urlCategory={urlCategory} />}></Route> */}
            <Route path={`/categories/:category`} element={<ListRecipesByCategory />}></Route>
            <Route path={`/countries`} element={<Countries />}></Route>
            <Route path={`/countries/:country`} element={<ListRecipesByCountries />}></Route>
            <Route path={`/tags/:tag`} element={<ListRecipesByCountries />}></Route>

            
          </Routes>
          
        </div>
      </Router>
      
    </AppContext.Provider>

  );
}

export default App;
