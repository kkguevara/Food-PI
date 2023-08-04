/* eslint-disable react-hooks/rules-of-hooks */
import CardRecetas from "../Card/CardRecetas";
import Navbar from "../NavBar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";

const Recipes = ({ currentPage, setCurrentPage }) => {

    return (
        <div>
            <Navbar />

            <SearchBar setCurrentPage={setCurrentPage} />

            <Filters setCurrentPage={setCurrentPage} />

            <CardRecetas currentPage={currentPage} setCurrentPage={setCurrentPage}></CardRecetas>

        </div>

    )
}

export default Recipes;