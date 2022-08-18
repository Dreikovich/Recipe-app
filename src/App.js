import React, {useState} from 'react';
import RandomRecipes from './components/RandomRecipes'
import Header from './components/Header';
import AppContext from './context'
import DrawerMenu from './components/DrawerMenu'

function App() {

  const [isClickMenu, setIsClickMenu] = useState(false)
  console.log(isClickMenu)

  return (
    <AppContext.Provider value={{isClickMenu,  setIsClickMenu}}>
      <div className="App">
        <Header />
        <DrawerMenu />
        <RandomRecipes />
      </div>
    </AppContext.Provider>

  );
}

export default App;
