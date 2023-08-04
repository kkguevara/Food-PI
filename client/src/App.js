import './App.css';
import { Route, Routes } from "react-router-dom";
import Landing from './componentes/Landing/Landing';
import Recipes from './componentes/Recipes/Recipes';
import Detail from './componentes/Detail/Detail';
import Form from './componentes/Form/Form';
import React, { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} // cuando este en la ruta principal quiero que se me renderice el componente landing 
        />
        <Route exact path='/home' element={<Recipes currentPage={currentPage} setCurrentPage={setCurrentPage} />}///cuando estoy en / home muestra recetas
        />

        <Route path='/detalleRecipe/:id' element={<Detail />} />

        <Route path='/createRecipe' element={<Form />} />

      </Routes>

    </div>
  );
}

export default App;





