import { useNavigate } from "react-router-dom";
import style from './Landing.module.css'

const Landing = () => {
    const navigate = useNavigate();
    const home = () => {
        navigate('/home')
    }
    return (
        <div className={style.bg}>
            <div className={style.container}>
                <div className={style.options}>
                    <h1>FOODS</h1>
                    <br />
                    <button className={style.button} onClick={home}>Come on!</button>
                </div>
            </div>
        </div>


    )

}
export default Landing;