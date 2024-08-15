import { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import image from '../../assets/logowhite.png';
import { useAuthUser } from '../../context/AuthUserContext';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5296";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const login = async (email, senha) => {
    try {
        const response = await axiosInstance.post('/api/Usuario/login', { email, senha });
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return null;
    }
};
const register = async (nome, email, senha) => {
    try {
        const response = await axiosInstance.post('/api/Usuario', { nome, email, senha });
        return response.data;
    } catch (error) {
        console.error('Erro ao registrar:', error);
        return null;
    }
};

export default function Login() {
    const navigate = useNavigate();
    const { email, setEmail, senha, setSenha, loading, setLoading, setUser } = useAuthUser();
    const [registrar, setRegistrar] = useState(false);
    const [nome, setNome] = useState('');
    const [error, setError] = useState('');

    const handleRegistrar = async (e) => {
        e.preventDefault();
        try {
            const result = await register(nome, email, senha);
            if (result) {
                console.log('Registro bem-sucedido');
                setRegistrar(false);
            } else {
                setError('Erro ao registrar');
            }
        } catch (error) {
            console.error('Erro durante o registro:', error);
            setError('Ocorreu um erro ao tentar registrar. Tente novamente.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await login(email, senha);
            if (result) {
                setUser(result);
                localStorage.setItem('user', JSON.stringify(result));
                console.log('Login bem-sucedido');
                navigate('/');
            } else {
                setError('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
            setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegistro = (e) => {
        e.preventDefault();
        setRegistrar(true);
    }

    const handleCancelar = (e) => {
        e.preventDefault();
        setRegistrar(false);
    };

    return (
        <div className={styles.mainContaint}>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <img src={image} alt="" className={styles.logo} />
                    <p className={styles.name}>Sistema de Gerenciamento de Eventos</p>
                </div>
                <div className={styles.loginContainer}>
                    {registrar ? (
                        <form onSubmit={handleRegistrar}>
                            <div className={styles.titleLogin}>REGISTRAR</div>
                            <div>
                                <div className={styles.inputs}>
                                    <span className={styles.span}>Usuario:</span>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputs}>
                                    <span className={styles.span}>Email:</span>
                                    <input
                                        type="email"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputs}>
                                    <span className={styles.span}>Senha:</span>
                                    <input
                                        type="password"
                                        className={styles.input}
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </div>
                            </div>
                            {error && <div className={styles.error}>{error}</div>}
                            <div className={styles.buttons}>
                                <button type="submit" className={styles.registrese}>REGISTRAR</button>
                                <button className={styles.cancelar} onClick={handleCancelar}>CANCELAR</button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin}>
                            <div className={styles.titleLogin}>LOGIN</div>
                            <div>
                                <div className={styles.inputs}>
                                    <span className={styles.span}>Email:</span>
                                    <input
                                        type="email"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputs}>
                                    <span className={styles.span}>Senha:</span>
                                    <input
                                        type="password"
                                        className={styles.input}
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                </div>
                            </div>
                            {error && <div className={styles.error}>{error}</div>}
                            <div className={styles.buttons}>
                                <button type="submit" className={styles.entrar}>{loading ? "CARREGANDO..." : "ENTRAR"}</button>
                                <button className={styles.registrese} onClick={handleRegistro}>REGISTRAR-SE</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
