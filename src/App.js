import React, {useState} from 'react';
import RandomRecipes from './components/RandomRecipes'
import Header from './components/Header';
import AppContext from './context'
import DrawerMenu from './components/DrawerMenu'
import Categories from './pages/Categories'
import Recipe from "./components/Recipe"
import ListRecipesByCategory from './components/ListRecipesByCategory'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  const [isClickMenu, setIsClickMenu] = useState(false)
  const [idMeal, setIdMeal] = useState()
  const [urlCategory, setUrlCategory] = useState()

  return (

    <AppContext.Provider value={{isClickMenu,  setIsClickMenu, idMeal, setIdMeal, setUrlCategory}}>
      <Router>
        <div className="App">
        <Header />
            
          <DrawerMenu />
          <Routes>
            
            <Route path="/" element={<RandomRecipes />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path={`/recipe/${idMeal}`} element={<Recipe />}></Route>
            <Route path={`/categories/${urlCategory}`} element={<ListRecipesByCategory urlCategory={urlCategory} />}></Route>
            
          </Routes>
          
        </div>
      </Router>
      
    </AppContext.Provider>

  );
}

export default App;
