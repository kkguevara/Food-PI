import './App.css';
import { Route, Routes } from "react-router-dom";
import Recetas from './componentes/Recetas/recetas';
import Landing from './componentes/Landing/Landing';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} // cuando este en la ruta principal quiero que se me renderice el componente landing 
        />
        <Route exact path='/home' element={<Recetas />}///cuando estoy en / home muestra recetas
        />
      </Routes>

    </div>
  );
}

export default App;
