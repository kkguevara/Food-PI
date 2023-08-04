import { useState } from "react";
import style from './SearchBar.module.css'
import { useDispatch } from "react-redux";
import { getRecetasNombre } from "../../redux/actions";

export default function SearchBar({ setCurrentPage }) {

    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    const handleChange = (e) => {
        if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
            setSearch(e.target.value.trim())
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        dispatch(getRecetasNombre(search))
    };

    return (

        <div className={style.search_container}>
            <input className={style.input} type='text' value={search} onChange={handleChange} placeholder="Search by name" />
            <button onClick={handleSubmit}>Search</button>
        </div>
    );
}