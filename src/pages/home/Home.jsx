import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import header from "../../assets/header.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuthUser } from "../../context/AuthUserContext";

const API_BASE_URL = "http://localhost:5296";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllArtistaEvento = async () => {
    try {
        const response = await axiosInstance.get('/api/ArtistaEvento', {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Evento:", error);
        return [];
    }
}

export default function Home() {
    const [artistaEventos, setArtistaEventos] = useState([]);
    const navigate = useNavigate();
    const { user, setUser } = useAuthUser();

    useEffect(() => {
        async function fetchData() {
            const data = await getAllArtistaEvento();
            setArtistaEventos(data);
        }
        fetchData();
    }, []);

    const handleCreate = () => {
        navigate('/cadastrar')
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <>
            <div className={styles.mainContaint}>
                <div className={styles.header}>
                    <div>
                        <img src={header} alt=""/>
                    </div>
                    <div>
                        <h1 className={styles.title}>BEM VINDO {user?.nome?.toUpperCase() || 'USUARIO'}</h1>
                    </div>
                </div>
                <div className={styles.criar}>
                    <button className={styles.buttonCriar} onClick={handleCreate}>CRIAR EVENTO</button>
                </div>
                <div className={styles.cards}>
                    {artistaEventos.map((evento, index) => (
                        <div key={index} className={styles.card}>
                            <span className={styles.nomeEvento}>{evento.nomeEvento}</span>
                            <span className={styles.artista}>ARTISTA: {evento.nomeArtista}</span>
                            <span className={styles.endereco}>ENDEREÇO: {evento.endereco}</span>
                            <span className={styles.data}>DATA: {new Date(evento.dataEvento).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.logOut}>
                    <button className={styles.buttonLogOut} onClick={handleLogout}>
                        <RiLogoutBoxLine size={25} color="white"/>
                    </button>
                </div>
            </div>
        </>
    )
}
