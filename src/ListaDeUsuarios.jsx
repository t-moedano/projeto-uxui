import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import './listadeusuarios.css';
import axios from 'axios';

//Pegando as informações da API pelo GET
const ListaDeUsuarios = () => {
    const [infos, setInfos] = useState([])
    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',
        }).then((resposta) => {setInfos(resposta.data)})
    }, [])

// Mock com lista de cartões para teste
const cards = [
    // cartão válido
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // cartão inválido
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
];

// Função para pegar a escolha do cartão do input select
const escolhaDoCartao = (event) => {
    setValorCartao(event.target.value);
}

// Ações dos modals
const [abrirPagamento, setAbrirPagamento] = useState("none"); // Para abrir modal de pagamento
const [pegarUsuario, setPegarUsuario] = useState(""); // Para pegar o nome do usuário
const [abrirPagou, setAbrirPagou] = useState("none"); // Para abrir modal com recibo de pagamento
const [abrirNaoRecebeu, setAbrirNaoRecebeu] = useState(""); // Para msg de erro de pagamento
const [valorCartao, setValorCartao] = useState("1"); // Para pegar o cartão escolhido para pagamento
const [valorDinheiro, setValorDinheiro] = useState(""); // Para pegar o valor de pagamento digitado
const [validarCampo, setValidarCampo] = useState("none"); // Para validar campo de valor digitado

// Função para abrir o modal de pagamento do usuário
const abrirModalPagar = (name) => {
    setAbrirPagamento("flex")
    setPegarUsuario(name)
}

// Função que abre o modal de recibo de pagamento 
const abrirModalPagou = () => {
    if (valorDinheiro === "") {
        setValidarCampo("flex");
    } else 
        {
        if (valorCartao === "1") {
            setAbrirNaoRecebeu("");
        } else {
            setAbrirNaoRecebeu("não");
        }
        setAbrirPagamento("none");
        setAbrirPagou("flex");
        setValorDinheiro("");
        setValidarCampo("none");
    }
}

// Função para fechar o modal do recibo de pagamento
const fecharModalPagamento = () => {
    setAbrirPagamento("none");
}

// Função para fechar o modal do recibo de pagamento
const fecharModal = () => {
    setAbrirPagou("none");
}

// Função para validar campo de valor para pagamento do usuário
const valorInput = (event) => {
    setValorDinheiro(event.target.value);
    setValidarCampo("none");
}

// Renderizando na tela as informações recebidas da API 
    return (
        <>
            <div className="clientGrid">
                {infos.map(item => (
                    <div className="clientcardcontainer" key={item.index}>
                        <div className="clientcard" onClick={()=>{abrirModalPagar(item.name)}}>
                            <img className="image" src={item.img} alt="Foto do usuário" />
                            <div className="client-info">
                                <div className="info">Nome do Usuário: {item.name}</div>
                                <div className="info">ID: {item.id} - Username: {item.username}</div>
                            </div>
                            <div className="hover">
                            </div>
                            <div className="pay-button">
                                <a className="pay-text">PAGAR</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/*--------------------------------Abrir Modal de pagamento----------------------------------*/}
            <div className="overlay" style={{display: abrirPagamento}}>       
                <div className="abrirModal">
                    <p className="texto-cabecalho-modal">Pagamento para <span>{pegarUsuario}</span></p>
                    <div className="gridchoice">
                        <div>Digite o valor:</div>
                        <div className="valorInput">
                            <NumberFormat thousandSeparator={true} value={valorDinheiro} onChange={valorInput} prefix={'R$ '} inputMode="numeric" placeholder="R$ 0,00"/>
                            <p style={{display:validarCampo}}>Campo obrigatório</p>
                        </div>
                        <div>
                            Escolha um cartão:
                        </div>
                        <select className="cardselector" value={valorCartao} onChange={escolhaDoCartao}>
                            <option value="1">Cartão com final {cards[0].card_number.substr(-4)}</option>
                            <option value="2">Cartão com final {cards[1].card_number.substr(-4)}</option>
                        </select>
                    </div>

                    <div className="gridbutton">
                        <div className="pay-button pay-text cancel" onClick={()=>{fecharModalPagamento()}}>CANCELAR</div>
                        <div className="pay-button pay-text success" onClick={()=>{abrirModalPagou ()}}>PAGAR</div>
                    </div>
                </div>  
            </div>
            {/*------------------------------Abrir Modal de recibo de pagamento--------------------------------*/}
            <div className="abrirModal" style={{display: abrirPagou}}>
                <p className="texto-cabecalho-modal">Recibo de pagamento</p>
                <p>O Pagamento <b>{abrirNaoRecebeu}</b> foi concluído com sucesso</p>
                <a className="pay-button pay-text" onClick={()=>{fecharModal()}}>Fechar</a>
            </div>
        </>
    )
}

export default ListaDeUsuarios