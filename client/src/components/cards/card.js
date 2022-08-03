import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialog.js";

export default function Card(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    };

    return (
    <>
    <FormDialog 
        open={open} 
        setOpen={setOpen} 
        name={props.name} 
        cpf={props.cpf} 
        birth={props.birth} 
        registerDate={props.registerDate}
        listCard={props.listCard}
        setListCard ={props.setListCard}
        id={props.id}
        />
      <div className="card--container container" onClick={() => handleClickCard()}>
        <div class="card--header">
            <p className="card--id"> ID: {props.id}</p>
            <h1 className="card--title">{props.name}</h1>
        </div>
        <div class="left--align">
            <p className="card--cpf">CPF: {props.cpf}</p>
            <p className="card--birth">Data de Nascimento: {props.birth}</p>
            <p className="card--register">Data de Cadastro: {props.registerDate}</p>
            <p className="card--ativo">Usuário Ativo? {props.ativo}</p>
        </div>
    </div>
    </>
    );
}