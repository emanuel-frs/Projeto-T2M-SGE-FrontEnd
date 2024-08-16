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

CriarEnderecoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

function CriarEnderecoModal ({ isOpen, onClose, onSelect }) {
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [error, setError] = useState(null);

    const handleCepChange = async (e) => {
        const value = e.target.value;
        setCep(value);

        if (value.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
                const data = response.data;
                
                if (data.erro) {
                    setError("CEP inválido");
                    setRua('');
                    setBairro('');
                    setCidade('');
                    setEstado('');
                } else {
                    setRua(data.logradouro);
                    setBairro(data.bairro);
                    setCidade(data.localidade);
                    setEstado(data.uf);
                    setError(null);
                }
            } catch (error) {
                setError("Erro ao buscar o CEP");
                console.error(error);
            }
        }
    };

    const handleCreate = async () => {
        if (rua && bairro && cidade && estado && numero) {
            try {
                const response = await axiosInstance.post('/api/Endereco', {
                    rua,
                    bairro,
                    cidade,
                    estado,
                    cep,
                    numero,
                    complemento
                });
    
                if (response.status === 201) {
                    onSelect(response.data.enderecoid);
                    onClose();
                } else {
                    setError("Erro ao criar endereço");
                }
            } catch (error) {
                if (error.response) {
                    console.error("Erro no servidor:", error.response.data);
                } else {
                    console.error("Erro desconhecido:", error.message);
                }
                setError("Erro ao criar endereço");
            }
        } else {
            setError("Por favor, preencha todos os campos obrigatórios.");
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Adicionar Endereço</h2>
                <input
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={handleCepChange}
                />
                <input
                    type="text"
                    placeholder="Rua"
                    value={rua}
                    disabled
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    value={bairro}
                    disabled
                />
                <input
                    type="text"
                    placeholder="Cidade"
                    value={cidade}
                    disabled
                />
                <input
                    type="text"
                    placeholder="Estado"
                    value={estado}
                    disabled
                />
                <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                />
                {error && <p className={styles.error}>{error}</p>}
                <button onClick={handleCreate}>Criar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default CriarEnderecoModal;
