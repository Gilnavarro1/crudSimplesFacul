import React, {useState, useEffect } from "react"
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";
import "./components/cards/card.css";

function App() {
  const [values, setValues] = useState();
  const [listPessoa, setListPessoa] = useState([]);
  const reloadPage = () => {
    window.location.reload();
  };
  console.log(listPessoa);
  const handleChangeValues = (value) => {
    setValues(prevValue=>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };
  
  const handleRegisterPessoa = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cpf: values.cpf,
      birth: values.birthDate,
      registerDate: values.registerDate,
      ativo: values.userVisits,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values.name,
        cpf: values.cpf,
        birth: values.birthDate,
        registerDate: values.registerDate,
        ativo: values.userVisits,
      }).then((response) => {
        setListPessoa([
          ...listPessoa,
          {
            id: response.data[0].id,
            name: values.name,
            cpf: values.cpf,
            birth: values.birthDate,
            registerDate: values.registerDate,
            ativo: values.userVisits,
          },
        ]);
      });
    });
    reloadPage();
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListPessoa(response.data);
    });
  }, []);

  return (
    <div className="app--container container">
      <div className="register--container">
        <h1 className="register--title">Cadastro</h1>

          <input 
          type="text" 
          name="name" 
          placeholder="Nome" 
          className="register--input"
          onChange={handleChangeValues}
          />

          <input 
          type="text" 
          name="cpf" 
          placeholder="CPF" 
          className="register--input"
          onChange={handleChangeValues}
          />

          <input 
          type="date" 
          name="birthDate" 
          placeholder="DataNascimento" 
          className="register--input"
          onChange={handleChangeValues}
          />

          <input 
          type="date" 
          name="registerDate" 
          placeholder="DataCadastro" 
          className="register--input"
          onChange={handleChangeValues}
          />
          
          <div className="radio--input">
            <p className="question">Usuário Ativo?</p>
            <input
            type="radio"
            id="active"
            name="userVisits"
            value="S"
            onChange={handleChangeValues}
            />
            <label htmlFor="active">Sim</label>
            
            <input
            type="radio"
            id="no-active"
            name="userVisits"
            value="N"
            onChange={handleChangeValues}
            />
            <label htmlFor="no-active">Não</label>
          </div>

          <button onClick={handleRegisterPessoa} className="register--button">Cadastrar</button>
      </div>
      
      {listPessoa.map((value) => {
        return (
        <Card
         key={value.id} 
         listCard={listPessoa} 
         setListCard={setListPessoa}
         id={value.IDPessoa}
         name= {value.Nome}
         cpf=  {value.CPF}
         birth= {value.DataNascimento}
         registerDate= {value.DataCadastro}
         ativo= {value.Ativo}
         />
         );
      })}
    </div>
  );
}

export default App;
