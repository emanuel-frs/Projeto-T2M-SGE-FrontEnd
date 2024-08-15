import styles from "./styles.module.css";
import header from "../../assets/header.jpg";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Add() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    }

    return (
        <>
            <div className={styles.mainContaint}>
                <div className={styles.header}>
                    <div>
                        <img src={header} alt=""/>
                    </div>
                    <div>
                        <h1 className={styles.title}>CRIAR NOVO EVENTO</h1>
                    </div>
                </div>
                <div className={styles.logOut}>
                    <button className={styles.buttonLogOut} onClick={handleGoBack}>
                        <RiLogoutBoxLine size={25} color="white"/>
                    </button>
                </div>
            </div>
        </>
    )
}
