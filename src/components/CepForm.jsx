import { useState, useEffect } from 'react';
import axios from 'axios';

const CepForm = () => {
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');

  useEffect(() => {
    const fetchCepData = async () => {
      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          const { localidade, uf, logradouro, bairro } = response.data;
          
          setCidade(localidade || '');
          setEstado(uf || '');
          setRua(logradouro || '');
          setBairro(bairro || '');
        } catch (error) {
          console.error('Erro ao buscar o CEP:', error);
          setCidade('');
          setEstado('');
          setRua('');
          setBairro('');
        }
      }
    };

    fetchCepData();
  }, [cep]); // Reexecuta o efeito quando o CEP muda

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  return (
    <form>
      <div>
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={handleCepChange}
          maxLength="8"
          placeholder="Digite o CEP"
        />
      </div>
      <div>
        <label htmlFor="cidade">Cidade:</label>
        <input
          type="text"
          id="cidade"
          value={cidade}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <input
          type="text"
          id="estado"
          value={estado}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="rua">Rua:</label>
        <input
          type="text"
          id="rua"
          value={rua}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="bairro">Bairro:</label>
        <input
          type="text"
          id="bairro"
          value={bairro}
          readOnly
        />
      </div>
    </form>
  );
};

export default CepForm;
