import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = "http://localhost:5296";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

EnderecoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default function EnderecoModal({ isOpen, onClose, onSelect }) {
    const [enderecos, setEnderecos] = useState([]);
    const [selectedEnderecoId, setSelectedEnderecoId] = useState(null);

    useEffect(() => {
        if (isOpen) {
            axiosInstance.get('/api/Endereco/')
                .then(response => setEnderecos(response.data))
                .catch(error => console.error('Erro ao buscar endereços:', error));
        }
    }, [isOpen]);

    const handleSelect = (enderecoId) => {
        setSelectedEnderecoId(enderecoId);
        onSelect(enderecoId);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Selecione um Endereço</h2>
                <div className={styles.cardContainer}>
                    {enderecos.map(endereco => (
                        <div 
                            key={endereco.enderecoId} 
                            className={`${styles.card} ${selectedEnderecoId === endereco.enderecoId ? styles.selected : ''}`} 
                            onClick={() => handleSelect(endereco.enderecoId)}
                        >
                            <p>{endereco.cep}</p>
                            <p>{endereco.rua}, {endereco.numero}</p>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className={styles.closeButton}>Fechar</button>
            </div>
        </div>
    );
}
