import { useState } from 'react';
import axios from 'axios';
import styles from './CriarEnderecoModal.module.css';
import PropTypes from 'prop-types';

const API_BASE_URL = "http://localhost:5296";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

CriarArtistaModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default function CriarArtistaModal({ isOpen, onClose, onSelect }) {
    const [error, setError] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const handleCreate = async () => {
        if (nome && email) {
            try {
                const response = await axiosInstance.post('/api/Artista', { nome, email });
    
                if (response.status === 201) {
                    onSelect(response.data.enderecoid);
                    onClose();
                } else {
                    setError("Erro ao criar artista");
                }
            } catch (error) {
                if (error.response && error.response.data.message) {
                    setError(error.response.data.message); // Mostra a mensagem do servidor
                } else {
                    console.error("Erro desconhecido:", error.message);
                    setError("Erro ao criar artista");
                }
            }
        } else {
            setError("Por favor, preencha todos os campos obrigatórios.");
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Adicionar Artista</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && <p className={styles.error}>{error}</p>}
                <button onClick={handleCreate}>Criar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}
