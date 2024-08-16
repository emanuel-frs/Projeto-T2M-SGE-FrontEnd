import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const API_BASE_URL = "http://localhost:5296";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

ArtistaModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default function ArtistaModal({ isOpen, onClose, onSelect }) {
    const [artistas, setArtistas] = useState([]);
    const [selectedArtistaId, setSelectedArtistaId] = useState(null);

    useEffect(() => {
        if (isOpen) {
            axiosInstance.get('/api/Artista/')
                .then(response => setArtistas(response.data))
                .catch(error => console.error('Erro ao buscar artistas:', error));
        }
    }, [isOpen]);

    const handleSelect = (artistaId) => {
        console.log("Selecionado Artista ID:", artistaId);
        setSelectedArtistaId(artistaId);
        onSelect(artistaId); // Verifique se está chamando onSelect com o ID correto
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Selecione um Artista</h2>
                <div className={styles.cardContainer}>
                    {artistas.map(artista => (
                        <div 
                            key={artista.artistaId} 
                            className={`${styles.card} ${selectedArtistaId === artista.artistaId ? styles.selected : ''}`} 
                            onClick={() => handleSelect(artista.artistaId)}
                        >
                            <p>{artista.nome}</p>
                            <p>{artista.email}</p>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className={styles.closeButton}>Fechar</button>
            </div>
        </div>
    );
}
