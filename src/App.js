import React, {useState} from 'react';
import RandomRecipes from './components/RandomRecipes'
import Header from './components/Header';
import AppContext from './context'
import DrawerMenu from './components/DrawerMenu'
import Category from './pages/Category'
import Recipe from "./components/Recipe"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  const [isClickMenu, setIsClickMenu] = useState(false)
  const [idMeal, setIdMeal] = useState()
  console.log(isClickMenu)

  return (

    <AppContext.Provider value={{isClickMenu,  setIsClickMenu, idMeal, setIdMeal}}>
      <Router>
        <div className="App">
        <Header />
            
          <DrawerMenu />
          <Routes>
            
            <Route path="/" element={<RandomRecipes />}></Route>
            <Route path="/category" element={<Category />}></Route>
            <Route path={`/recipe/${idMeal}`} element={<Recipe />}></Route>
            
          </Routes>
          
        </div>
      </Router>
      
    </AppContext.Provider>

  );
}

export default App;
