import { useState } from "react"

export default function DuvidasLoja() {

    const [entrega, setEntrega] = useState(false);
    const [seguro, setSeguro] = useState(false);
    const [contato, setContato] = useState(false);
    const [pagamento, setPagamento] = useState(false);
    const [troca, setTroca] = useState(false)

    return (
        <section className="Section-Questions-Block content-duvidas">
            <div className="Header-Tipic-Section-Questions header-of-tipic">
                <h1>DÚVIDAS SOBRE NOSSA LOJA</h1>
            </div>
            <div className="Section-Question duvidas-sec">
                <div className="Question-Show-Card duvida-card">
                    <div className="duvida-card-top">
                        <h1>Como é feita a entrega?</h1>
                        {entrega ?
                            <i onClick={() => { setEntrega(false) }} className="fa-solid fa-minus fecharentrega"></i>
                            :
                            <i onClick={() => { setEntrega(true) }} className="fa-solid fa-plus abrirentrega"></i>
                        }
                    </div>
                    {entrega ?
                        <>
                            <div className=" duvida-card-resp entrega">
                                <p>POUSO ALEGRE (MG): Seu pedido estará no seu endereço em pouco tempo</p>
                                <p>Outras cidades: Envio imediato pelo Correio.</p>
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
                <div className="Question-Show-Card duvida-card">
                    <div className="duvida-card-top">
                        <h1>É seguro?</h1>
                        {seguro ?
                            <i onClick={() => { setSeguro(false) }} className="fa-solid fa-minus fecharentrega"></i>
                            :
                            <i onClick={() => { setSeguro(true) }} className="fa-solid fa-plus abrirentrega"></i>
                        }
                    </div>
                    {seguro ?
                        <div className="duvida-card-resp seguro">
                            <p>Sim, Você só irá realizar o pagamento durante entrega.</p>
                            <p>Caso seu pedido for enviado por correios, será enviado o comprovante de envio e o código de rastreio.</p>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="Question-Show-Card duvida-card">
                    <div className="duvida-card-top">
                        <h1>Como consigo entrar em contato?</h1>
                        {contato ?
                            <i onClick={() => { setContato(false) }} className="fa-solid fa-minus fecharentrega"></i>
                            :
                            <i onClick={() => { setContato(true) }} className="fa-solid fa-plus abrirentrega"></i>
                        }
                    </div>
                    {contato ?
                        <div className="duvida-card-resp contato">
                            <p>Entre em contato conosco:</p>
                            <p>WhatApp: (35) 99955-3467</p>
                            <p>Instagram: @vns.closet</p>
                            <p>E-mail: contato.vnscloset@gmail.com</p>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="Question-Show-Card duvida-card">
                    <div className="duvida-card-top">
                        <h1>Métodos de pagamento</h1>
                        {pagamento ?
                            <i onClick={() => { setPagamento(false) }} className="fa-solid fa-minus fecharentrega"></i>
                            :
                            <i onClick={() => { setPagamento(true) }} className="fa-solid fa-plus abrirentrega"></i>
                        }
                    </div>
                    {pagamento ?
                        <div className="duvida-card-resp pagamento">
                            <p>Métodos de pagamento disponíveis:</p>
                            <p>Pix e dinheiro</p>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="Question-Show-Card duvida-card">
                    <div className="duvida-card-top">
                        <h1>Troca e devolução</h1>
                        {troca ?
                            <i onClick={() => { setTroca(false) }} className="fa-solid fa-minus fecharentrega"></i>
                            :
                            <i onClick={() => { setTroca(true) }} className="fa-solid fa-plus abrirentrega"></i>
                        }
                    </div>
                    {troca ?
                        <div className="duvida-card-resp troca">
                            <p>Troca pode ser realizada em um prazo de 7 dias úteis após sua compra.</p>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </section>
    )
}