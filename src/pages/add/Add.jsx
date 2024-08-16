import styles from "./styles.module.css";
import header from "../../assets/header.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import EnderecoModal from "../../components/Modal/EnderecoModal";
import ArtistaModal from "../../components/Modal/ArtistaModal";
import axios from "axios";
import CriarEnderecoModal from "../../components/Modal/CriarEnderecoModal";
import CriarArtistaModal from "../../components/Modal/CriarArtistaModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = "http://localhost:5296";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const getAllEnderecos = async () => {
    try {
        const response = await axiosInstance.get('/api/Endereco', {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        return [];
    }   
}

export const getAllArtistas = async () => {
    try {
        const response = await axiosInstance.get('/api/Artista', {});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar artistas:", error);
        return [];
    }
}

export default function Add() {
    const navigate = useNavigate();
    const [evento, setEvento] = useState(true);
    const [endereco, setEndereco] = useState(false);
    const [artista, setArtista] = useState(false);
    
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [capacidade, setCapacidade] = useState('');

    const [enderecoModalOpen, setEnderecoModalOpen] = useState(false);
    const [artistaModalOpen, setArtistaModalOpen] = useState(false);
    const [criarEnderecoModalOpen, setCriarEnderecoModalOpen] = useState(false);
    const [criarArtistaModalOpen, setCriarArtistaModalOpen] = useState(false);

    const [selectedEnderecoId, setSelectedEnderecoId] = useState(null);
    const [selectedArtistaId, setSelectedArtistaId] = useState(null);
    const [createdEventoId, setCreatedEventoId] = useState(null);

    const handleGoBack = () => {
        navigate('/');
    }

    const handleEndereco = () => {
        if (nome && data && descricao && capacidade) {
            if (new Date(data) <= new Date()) {
                toast.error("Por favor, selecione uma data posterior à de hoje.");
                return;
            }
            setEvento(false);
            setEndereco(true);
        } else {
            toast.error("Por favor, preencha todos os campos antes de prosseguir.");
        }
    }

    const handleEnderecoSelect = () => {
        setEnderecoModalOpen(true);
    }

    const handleArtistaSelect = () => {
        setArtistaModalOpen(true);
    }

    const handleCriarEnderecoSelect = () => {
        setCriarEnderecoModalOpen(true);
    }

    const handleCriarArtistaSelect = () => {
        setCriarArtistaModalOpen(true);
    }

    const handleSubmit = async () => {
        if (nome && data && descricao && capacidade && selectedEnderecoId) {
            const novoEvento = {
                nome,
                data: new Date(data).toISOString(),
                descricao,
                capacidade: parseInt(capacidade),
                enderecoId: selectedEnderecoId
            };
    
            try {
                const response = await axiosInstance.post('/api/Evento', novoEvento);
                const eventoCriado = response.data;
                setCreatedEventoId(eventoCriado.eventoId);
                setEndereco(false);
                setArtista(true);
            } catch (error) {
                console.error("Erro ao criar evento:", error);
                toast.error("Erro ao criar evento, por favor verifique os detalhes no console.");
            }
        } else {
            toast.error("Por favor, preencha todos os campos e selecione um endereço.");
        }
    }    

    const handleArtistaEventoSubmit = async () => {
        if (createdEventoId && selectedArtistaId) {
            const novaAssociacao = {
                eventoId: createdEventoId,
                artistaId: selectedArtistaId,
                dataRegistro: new Date().toISOString()
            };

            try {
                const response = await axiosInstance.post('/api/ArtistaEvento', novaAssociacao);
                console.log('Evento criada com sucesso:', response.data);
                toast.success('Evento criada com sucesso!');
                navigate('/');
            } catch (error) {
                console.error("Erro ao criar associação Evento:", error);
                toast.error("Erro ao criar a associação Evento, por favor verifique os detalhes no console.");
            }
        } else {
            toast.error("Por favor, selecione um artista e um endereço antes de cadastrar.");
        }
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
                <div className={styles.container}>
                    <div className={`${styles.etapa} ${evento ? '' : styles.etapaT}`}>
                        <input 
                            type="text" 
                            placeholder="Nome" 
                            className={evento ? styles.inputs : styles.inputT}
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input 
                            type="date" 
                            className={evento ? styles.inputs : styles.inputT}
                            value={data}
                            min={getTodayDate()}
                            onChange={(e) => setData(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Descrição" 
                            className={evento ? styles.inputs : styles.inputT}
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="Capacidade" 
                            className={evento ? styles.inputs : styles.inputT}
                            value={capacidade}
                            onChange={(e) => setCapacidade(e.target.value)}
                        />
                        <div className={styles.next}>
                            <button className={`${styles.rightButton} ${evento ? '' : styles.rightButtonT}`} onClick={handleEndereco}>PRÓXIMO</button>
                        </div>
                    </div>
                    <div className={`${styles.etapa} ${endereco ? styles : styles.etapaT}`}>
                        <button className={endereco ? styles.search : styles.inputT} onClick={handleEnderecoSelect}>SELECIONAR ENDEREÇO</button>
                        <button className={endereco ? styles.add : styles.inputT} onClick={handleCriarEnderecoSelect}>ADICIONAR ENDEREÇO</button>
                        <div className={styles.next}>
                            <button className={`${styles.rightButton} ${endereco ? '' : styles.rightButtonT}`} onClick={handleSubmit}>PRÓXIMO</button>
                        </div>
                    </div>
                    <div className={`${styles.etapa} ${artista ? styles : styles.etapaT}`}>
                        <button className={artista ? styles.search : styles.inputT} onClick={handleArtistaSelect}>SELECIONAR ARTISTA</button>
                        <button className={artista ? styles.add : styles.inputT} onClick={handleCriarArtistaSelect}>ADICIONAR ARTISTA</button>
                        <div className={styles.next}>
                            <button className={`${styles.rightButton} ${artista ? '' : styles.rightButtonT}`} onClick={handleArtistaEventoSubmit}>CADASTRAR</button>
                        </div>
                    </div>
                </div>
                <div className={styles.goBack}>
                    <button className={styles.buttonGoBack} onClick={handleGoBack}>
                        <FaArrowLeft size={25} color="white"/>
                    </button>
                </div>
            </div>
            <EnderecoModal 
                isOpen={enderecoModalOpen} 
                onClose={() => setEnderecoModalOpen(false)} 
                onSelect={(id) => setSelectedEnderecoId(id)} 
            />
            <ArtistaModal 
                isOpen={artistaModalOpen} 
                onClose={() => setArtistaModalOpen(false)} 
                onSelect={(id) => setSelectedArtistaId(id)} 
            />
            <CriarEnderecoModal
                isOpen={criarEnderecoModalOpen} 
                onClose={() => setCriarEnderecoModalOpen(false)} 
                onSelect={(id) => setSelectedEnderecoId(id)} 
            />
            <CriarArtistaModal
                isOpen={criarArtistaModalOpen} 
                onClose={() => setCriarArtistaModalOpen(false)} 
                onSelect={(id) => setSelectedArtistaId(id)} 
            />
            <ToastContainer />
        </>
    )
}
