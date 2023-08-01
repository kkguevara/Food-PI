import React, { useState, useEffect } from 'react';
import style from './Form.module.css';
import Navbar from "../NavBar/Navbar";
import { useSelector, useDispatch } from 'react-redux'


import { getDietas, crearReceta } from '../../redux/actions';

const Form = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        imagen: "",
        resumen_del_plato: "",
        nivel_de_comida_saludable: 0,
        dietas: [],
        paso_a_paso: ""
    });

    const [error, setError] = useState({})

    useEffect(() => {
        getDietas();
    }, [getDietas]);

    const dietas = useSelector(state => state.dietas)

    console.log(dietas);
    const validate = () => {
        let errorValidate = {}

        if (formData.nombre.length === 0) {
            errorValidate.name = "Name can't be empty"
        }

        if (formData.nombre.length > 0 && !/^[a-zA-Z\s]*$/.test(formData.nombre)) {
            errorValidate.name = 'Name must contain only characters '
        }

        if (formData.resumen_del_plato.length === 0) {
            errorValidate.summary = "Summary can't be empty";
        }

        if (formData.paso_a_paso.length === 0) {
            errorValidate.steps = 'Add at least 1 step.';
        }

        if (formData.imagen.length === 0) {
            errorValidate.image = 'Add a image (link)';
        }

        if (formData.nivel_de_comida_saludable < 0 || formData.nivel_de_comida_saludable > 100) {
            errorValidate.healthscore = 'Health score must be between 0 and 100.';
        }

        if (formData.dietas.length === 0) {
            errorValidate.diets = 'Add at least 1 diet.';
        }

        return errorValidate;
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));

        const validationErrors = validate()
        setError(validationErrors);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(error).length === 0) {
            /*createRecipe(formData);
            setFormSubmitted(true);*/
            alert("Recipe successfully Created!")
        } else {
            const missingFields = Object.keys(error).join(", ");
            const errorMessage = `It is necessary to fill in all the fields: ${missingFields}`;
            alert(errorMessage);
        }
    }
    /*
    
        const handleTiposDietaChange = (event) => {
            const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (opcion) => opcion.value);
            setTiposDieta(opcionesSeleccionadas);
        };
    
        // Función para manejar el envío del formulario
        
    */
    return (
        <div>
            <Navbar />
            <div className={style.formcontainer}>
                <form onSubmit={handleSubmit}>
                    <div className={style.row}>
                        <label className={style.label}>Name</label>
                        <input className={style.inputClass} type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                    </div>
                    <div className={style.row}>
                        <label className={style.label}>Summary</label>
                        <textarea className={style.inputClass} name="resumen_del_plato" value={formData.resumen_del_plato} cols="30" rows="10" onChange={handleInputChange}></textarea>
                    </div>
                    <div className={style.row}>
                        <label className={style.label}>Health Score</label>
                        <input className={style.inputClass} type="number" name="nivel_de_comida_saludable" value={formData.nivel_de_comida_saludable} onChange={handleInputChange} />
                    </div>
                    <div className={style.row}>
                        <label className={style.label}>Steps</label>
                        <input className={style.inputClass} type="text" name="paso_a_paso" value={formData.paso_a_paso} onChange={handleInputChange} />
                    </div>
                    <div className={style.row}>
                        <label className={style.label}>Image</label>
                        <input className={style.inputClass} type="text" name="imagen" value={formData.imagen} onChange={handleInputChange} />
                    </div>
                    <div className={style.row}>
                        <label className={style.label}>Diets</label>
                        <select className={style.inputClass} name="nombre" value={""} onChange={handleInputChange}>
                            <option key={''} value={''} >Seleccione</option>
                            {['Vegetariano', 'Vegano', 'Carnívoro', 'Pescetariano', 'Keto', 'Paleo'].map((opcion) => (
                                <option key={opcion} value={opcion}>
                                    {opcion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={style.row}>
                        <button className={style.buttonCreate} type="submit">Create recipe</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
