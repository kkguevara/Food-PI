import React from 'react';
import style from './Navbar.module.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png'

const Navbar = () => {
    const navigate = useNavigate();
    const welcome = () => navigate('/')
    const home = () => navigate('/home')
    const createRecipe = () => navigate('/createRecipe')

    return (
        <header>
            <nav className={style.navbar}>
                <button className={style.button} onClick={home}>Home</button>
                <button className={style.button} onClick={welcome}>Welcome</button>
                <button className={style.button} onClick={createRecipe}>Create new recipe</button>
            </nav>
        </header>
    )
}

export default Navbar;
