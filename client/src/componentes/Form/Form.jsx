import React, { useEffect, useState } from "react";
import { getDietas, crearReceta } from "../../redux/actions";
import style from './Form.module.css'
import Navbar from "../NavBar/Navbar";
import { useSelector, useDispatch } from 'react-redux'

const ValidateForm = (formData) => {
    const errors = {}

    // la longitud mínima del título
    if (formData.name.length < 10) {
        errors.name = 'Title must contain at least 10 characters.';
    }

    //la longitud mínima de la descripción
    if (formData.summary.length < 20) {
        errors.summary = 'Summary must contain at least 20 characters.';
    }

    // al menos un paso agregado
    if (formData.steps.length === 0) {
        errors.steps = 'Add at least 1 step.';
    }

    // si se ingreso una URL de imagen
    if (formData.image.length === 0) {
        errors.image = 'Add an image url';
    }

    // el rango de healthscore
    if (formData.healthscore < 0 || formData.healthscore > 100) {
        errors.healthscore = 'Healthscore must be between 0 and 100.';
    }

    /*
    // al menos una dieta agregada
    if (formData.diets.length === 0) {
        errors.diets = 'Add at least 1 diet.';
    }*/

    return errors;
}

const Form = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [diets, setDiets] = useState([]);

    useEffect(() => {
        if (formSubmitted) {
            setFormData({
                name: "",
                summary: "",
                steps: [],
                image: "",
                diets: [],
                healthscore: "0"
            });
            setErrors({});
            setNewStep("");
            setFormSubmitted(false);
            setDiets([]);
        }
    }, [formSubmitted]);

    const [formData, setFormData] = useState({
        name: "",
        summary: "",
        steps: [],
        image: "",
        diets: [],
        healthscore: ""
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDietas());
    }, []);

    const [newStep, setNewStep] = useState("");

    const dietas = useSelector(state => state.dietas)
    const showContent = dietas.length > 0 ? true : false;

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));

        const validationErrors = ValidateForm({
            ...formData,
            [name]: value
        });
        setErrors(validationErrors);
    };


    const handleDietsChange = (event) => {

        if (event.target.checked) {
            setDiets([...diets, event.target.value]);
        } else {
            const dietsFiltered = diets.filter(diet => diet !== event.target.value)
            setDiets([...dietsFiltered])
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            diets: [...diets],
        }));

    };

    const handleAddStep = () => {
        if (newStep.trim() !== "") {
            const newSteps = [...formData.steps, newStep];
            setFormData((prevFormData) => ({
                ...prevFormData,
                steps: newSteps
            }));
            setNewStep("");

            const validationErrors = ValidateForm({
                ...formData,
                steps: newSteps
            });
            setErrors(validationErrors);
        }
    };

    const handleRemoveStep = (index) => {
        const newSteps = [...formData.steps];
        newSteps.splice(index, 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            steps: newSteps
        }));

        const validationErrors = ValidateForm({
            ...formData,
            steps: newSteps
        });
        setErrors(validationErrors);
    };

    const handleStepInputChange = (event) => {
        setNewStep(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(errors).length === 0) {
            dispatch(crearReceta(formData));
            setFormSubmitted(true);
            alert("Recipe successfully Created!")
        } else {
            const missingFields = Object.keys(errors).join(", ");
            const errorMessage = `Required to fill in all fields. Missing: ${missingFields}`;
            alert(errorMessage);
        }
    };

    return (
        <>
            {showContent && (
                <div>
                    <Navbar />

                    <div className={style.center}>

                        <form className={style.form} onSubmit={handleSubmit}>
                            <label className={style.label}>Title</label>
                            <input
                                className={style.input}
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                onBlur={handleInputChange}
                                placeholder="Recipe Title"
                            />
                            {errors.name && <span className={style.error}>{errors.name}</span>}

                            <label className={style.label}>Summary</label>
                            <textarea
                                className={style.textarea}
                                name="summary"
                                value={formData.summary}
                                onChange={handleInputChange}
                                onBlur={handleInputChange}
                                placeholder="Describe your recipe"
                            />
                            {errors.summary && <span className={style.error}>{errors.summary}</span>}

                            <label className={style.label}>Steps</label>
                            {formData.steps.map((step, index) => (
                                <div key={index}>
                                    <input className={style.added} type="text" value={step} readOnly />
                                    <button className={style.Xbutton} type="button" onClick={() => handleRemoveStep(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <input
                                className={style.Xinput}
                                type="text"
                                value={newStep}
                                onChange={handleStepInputChange}
                                onBlur={handleStepInputChange}
                                placeholder="Steps..."
                            />
                            <button className={style.Xbutton} type="button" onClick={handleAddStep}>
                                Add Step
                            </button>
                            {errors.steps && <span className={style.error}>{errors.steps}</span>}

                            <label className={style.label}>Diets</label>

                            <fieldset className={style.group}>
                                <ul className={style.checkbox}>
                                    {dietas.map(({ id, nombre }, index) => {
                                        return (
                                            <li key={index}>
                                                <input
                                                    className={style.inputClass}
                                                    type="checkbox"
                                                    name="diets"
                                                    value={nombre}
                                                    onChange={handleDietsChange}
                                                />
                                                <label>{nombre}</label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </fieldset>

                            {errors.diets && <span className={style.error}>{errors.diets}</span>}

                            <label className={style.label}>Image URL</label>
                            <input
                                name="image"
                                value={formData.image}
                                type="text"
                                onChange={handleInputChange}
                                onBlur={handleInputChange}
                                placeholder="Image URL"
                                className={style.input}
                            />
                            {errors.image && <span className={style.error}>{errors.image}</span>}

                            <label className={style.label}>Health-Score</label>
                            <input
                                name="healthscore"
                                value={formData.healthscore}
                                type="number"
                                onChange={handleInputChange}
                                onBlur={handleInputChange}
                                placeholder="Health-Score (0 - 100)"
                                className={style.input}
                            />
                            {errors.healthscore && <span className={style.error}>{errors.healthscore}</span>}

                            <button className={style.Sbutton} type="submit">CREATE RECIPE</button>
                        </form>
                    </div>

                </div>
            )}
        </>
    );
};


export default Form;
