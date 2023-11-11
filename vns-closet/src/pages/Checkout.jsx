import { useEffect, useRef, useState } from "react"
import { account, databases } from "../lib/appwrite"
import HeaderCheckout from "../components/Checkout/HeaderCheckout"
import { Link } from "react-router-dom";
import QRCode from 'react-qr-code';
import axios from 'axios';
import { Query } from "appwrite";
import Swal from "sweetalert2";

const stripe = require("stripe")('sk_test_51O8vzKFbchsk4huKOa3OpUgbsTQDJqfF0Hy91Er6gLaWiyOIAhJCOfQ1b1ZgkVTepeaBWACbbGq8Qg5BRlAprvaU00YamY0D3h');


export default function Checkout() {
    const [userLogged, setUserlogged] = useState(null);
    const [Loading, setLoading] = useState(false);

    //TOTAL PAGAMENTO CONSTS

    const [totalPay, setTotalPay] = useState(0);
    const [Desconto, setDesconto] = useState(0);
    const [Subtotal, setSubtotal] = useState(0);
    const [totalPayPix, setTotalPayPix] = useState(0);

    const [metodoPay, setMetodoPay] = useState(null);

    //SACOLA CONSTS

    const [sacolaItens, setSacolaItens] = useState([]);
    const SacolaItensShow = localStorage.getItem("s-vns-closet-fstorage-bagsc")

    //CONSTS PESSOAIS


    const [ContatoTelefone, setContatoTelefone] = useState(null)

    //ENDERECOS consts

    const [enderecosOutPut, setenderecosOutPut] = useState([]);
    const [QtdEnd, setQtdEnd] = useState(0)
    const [enderecos, setenderecos] = useState([])

    //ENDERECO SELECTED

    const [enderecoSelected, setEnderecoSelected] = useState([])


    //STEPS

    const [Step, setStep] = useState(1)


    async function getAccount() {
        setLoading(true)
        try {
            await account.get().then((r) => {
                databases.getDocument(
                    "65490ef281a42a311fd4",
                    "654c3f326781694c82c3",
                    r.$id
                ).then((response) => {
                    setUserlogged(response)
                })

            })
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            return window.location.href = window.location.origin + "/accounts/login"

        }
    }


    function LoadingWrapper() {
        return (
            <div className="Loading-Wrapper">
                <div className="Loading-Content">
                    <l-bouncy
                        size="45"
                        speed="1.75"
                        color="black"
                    ></l-bouncy>
                    <p>Carregando</p>
                </div>
            </div>
        )
    }

    useEffect(() => {
        getAccount()
    }, [])

    function removeSacolaItem(index) {

        let JSONitens = JSON.parse(SacolaItensShow);

        // Use o método splice para remover o item do array no local de armazenamento local
        JSONitens.splice(index, 1);

        // Atualize o armazenamento local com o array modificado
        localStorage.setItem('s-vns-closet-fstorage-bagsc', JSON.stringify(JSONitens));
    }

    async function getProductsSacola() {
        try {
            const LS = localStorage.getItem("s-vns-closet-fstorage-bagsc");
            let sacola = JSON.parse(LS);
            setSacolaItens(
                sacola.map((res, i) => {
                    return (
                        <div className="SacolaShow--item">
                            <div className="leftSideSacola-show">
                                <div className="SacolaImage--image">
                                    <img src={res.foto} />
                                </div>
                                <div className="SacolaContent--name">
                                    <h3>{res.name}</h3>
                                    <p>Cor: {res.cor}</p>
                                    <p>Tamanho: {res.tamanho}</p>
                                    {res.desconto > 0 ?
                                        <p><s className="desconto">R${(res.price).toFixed(2)}</s> <span className="priceatual">R${(res.price - res.desconto).toFixed(2)}</span></p>
                                        :
                                        <p className="priceatual">R${(res.price - res.desconto).toFixed(2)}</p>
                                    }

                                </div>
                            </div>
                            <div className="rightSideSacola-show">
                                <button onClick={() => { removeSacolaItem(i) }} className="ButtonSacola--remove"><i className="fa-solid fa-trash-can"></i> <span className="pconly">REMOVA ESSE PRODUTO</span></button>
                            </div>
                        </div>
                    )
                })
            )
        }
        catch (error) {

        }
    }
    useEffect(() => {
        getProductsSacola()
        if (!SacolaItensShow) {
            window.location.href = window.location.origin
        }
    })

    /* GERAR QR CODE PIX */

    const [qrCodeValue, setQrCodeValue] = useState('');

    useEffect(() => {

        let total = 0.00;
        let totalpix = 0.00;
        let descontos = 0.00;
        let subtotal = 0.00;

        for (let i of JSON.parse(SacolaItensShow)) {
            total += i.price - i.desconto
            totalpix += (i.price - i.desconto) * 0.95
            subtotal += i.price
            descontos += i.desconto
        }


        setTotalPay(total);
        setTotalPayPix(totalpix);
        setDesconto(descontos);
        setSubtotal(subtotal)

        const gerarQrCode = () => {

            const chavePixDoCobrador = 11794087648;
            const nomeCobrador = 'VINICIUS DA SILVA SANTOS'


            // Utilizando template literals para formar o payload
            const payloadCompleto = `00020126330014BR.GOV.BCB.PIX0111${chavePixDoCobrador}5204000053039865406${(totalpix < 99 ? "0" : "") + totalpix.toFixed(2)}5802BR5924${nomeCobrador}6012POUSO ALEGRE62130509VNSCLOSET6304A380`;


            setQrCodeValue(payloadCompleto);
        };

        gerarQrCode();
    });



    useEffect(() => {

        e()

    }, [userLogged])

    useEffect(() => {
        f()
        c()
    })


    async function e() {
        if (userLogged) {
            await databases.listDocuments(
                "65490ef281a42a311fd4",
                "654efe731ff2d6c66cb8",
                [
                    Query.equal("USER_UID_RES_END", userLogged.$id)
                ]
            )
                .then((r) => {
                    setQtdEnd(r.documents.length)
                    setenderecos(r.documents)

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    async function f() {
        setenderecosOutPut(
            enderecos.map((e) => {

                function checkMark() {
                    if (enderecoSelected.UID_DOC == e.$id) {
                        return 'selected'
                    }
                    else {
                        return null
                    }
                }

                return (
                    <li id={checkMark()} onClick={() => {
                        enderecoSelected.UID_DOC == e.$id
                            ?
                            setEnderecoSelected({})
                            :
                            setEnderecoSelected({
                                "CEP": e.cep,
                                "Endereco": e.endereco,
                                "Complemento_Ref": e.complemento_e_ref,
                                "Destinatario": e.destinatario,
                                "Estado": e.estado,
                                "Cidade": e.cidade,
                                "Bairro": e.bairro,
                                "Numero": e.numero,
                                "UID_DOC": e.$id
                            })

                    }} className="EnderecoWrapper--item">

                        <div className="EnderecoWrapper-inside">
                            <p>{checkMark() == "selected" ? <span><i className="fa-solid fa-check"></i></span> : <span></span>} <i className="fa-solid fa-house"></i> {e.endereco}</p>
                            <p>{e.bairro} - {e.cidade} - {e.estado}</p>
                        </div>
                    </li>
                )
            })
        )
    }

    function c() {
        window.document.title = "VNS CLOSET: Finalização da compra"
    }


    const formatarData = (data) => {
        return data.toISOString().replace(/[-T:]/g, '').slice(0, -5);
    };

    function changeStep(steptoChange) {
        if (Step > steptoChange) {
            setStep(steptoChange)
        }
    }

    function checkoutCard() {
        if (!userLogged || !ContatoTelefone || !enderecoSelected.UID_DOC) {
            return Swal.fire({
                title: "FALHA NA FINALIZAÇÃO DA COMPRA!",
                text: "Por favor, preencha todas informações para continuar.",
            });
        }
        else {

            async function StripeCheckout() {
                let amount = parseInt(totalPay);

                try {
                    

                    // Criar o pagamento no Stripe
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount,
                        currency: 'BRL',
                        description: 'VNSCLOSET: Finalização da compra',
                        payment_method_types: ['card'],
                        
                    });

                    console.log("Payment", paymentIntent);
                    console.log("URL", paymentIntent.url)
                    




                } catch (error) {
                    console.error("Erro ao criar o pagamento no Stripe:", error);
                    // Lógica de tratamento de erro
                }
            }
            StripeCheckout()

        }
    }

    return (
        <>
            {Loading ? <LoadingWrapper /> : null}
            <HeaderCheckout />
            <section className="CheckoutPage-Content-Wrapper">
                <div className="CheckoutPage-Products-Show">
                    {JSON.parse(localStorage.getItem("s-vns-closet-fstorage-bagsc")).length > 0 ?
                        <h2>Resumo do pedido</h2>
                        :
                        null}
                    <div className="SacolaCheckoutPage">
                        {JSON.parse(localStorage.getItem("s-vns-closet-fstorage-bagsc")).length > 0 ?
                            <>
                                {sacolaItens}

                            </> :
                            <div className="empty-Sacola-Show">
                                <img src={window.location.origin + "/arquivos/undraw_empty_cart_co35.svg"} />
                                <h1>Adicione produtos na sacola</h1>
                                <p>Você ainda não tem nenhum produto na sacola!</p>
                                <Link to="/"><button type="submit" className="btn btn-primary">Voltar para a loja</button></Link>
                            </div>
                        }

                    </div>

                </div>


                {JSON.parse(localStorage.getItem("s-vns-closet-fstorage-bagsc")).length > 0 ?
                    <>
                        <div className="CheckoutPage-Steps-To-Finish">
                            <div id={Step == 1 ? "enabled" : "disabled"} onClick={() => { changeStep(1) }} className="CheckoutPage-Steps-LeftSide CheckoutStep">
                                <div className="CheckoutPage--step">
                                    <h2><i className="fa-solid fa-circle-user"></i> Dados pessoais</h2>
                                    <p>Solicitamos apenas as informações essenciais para a realização da compra.</p>
                                    {Step == 1 ?
                                        <>
                                            <div className="Inputs-Content">
                                                <div className="LeftSide">
                                                    <div className="CheckoutPage-InputBox">
                                                        <p>Nome completo</p>
                                                        <input value={userLogged ? userLogged.Nome : null} disabled type="text" />
                                                    </div>
                                                    <div className="CheckoutPage-InputBox">
                                                        <p>CPF</p>
                                                        <input value={userLogged ? userLogged.CPF : null} disabled type="number" />
                                                    </div>
                                                </div>
                                                <div className="RightSide">
                                                    <div className="CheckoutPage-InputBox">
                                                        <p>Número do WhatsApp ou Telefone *</p>
                                                        <input value={ContatoTelefone} onChange={(e) => { setContatoTelefone(e.target.value) }} type="tel" />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                </div>

                                {Step == 1 ?
                                    <>
                                        {ContatoTelefone ?
                                            <div className="buttonContinue">
                                                <button onClick={() => { if (ContatoTelefone) { setStep(2) } }}>CONTINUAR</button>
                                            </div>
                                            :
                                            null
                                        }
                                    </>
                                    :
                                    null
                                }

                            </div>

                            <div id={Step == 2 ? "enabled" : "disabled"} onClick={() => { changeStep(2) }} className="CheckoutPage-Steps-Center CheckoutStep">
                                <div className="CheckoutPage--step">
                                    <h2><i className="fa-solid fa-truck"></i> Entrega</h2>
                                    <p>Escolha um endereço para o recebimento dos produtos.</p>

                                    {Step == 2 ?
                                        <>
                                            {QtdEnd > 0 ?
                                                <ul className="listsEnderecos-Checkout">
                                                    {enderecosOutPut}
                                                </ul>
                                                :
                                                <div className="EnderecosExists--CheckOut">
                                                    <p>Parece que você ainda não adicionou nenhum endereço para sua conta.</p>
                                                    <button onClick={() => { window.location.href = window.location.origin + "/accounts/myaccount/address" }}>ADICIONAR ENDEREÇO</button>
                                                </div>
                                            }
                                            <div className="buttonContinue">

                                                <button onClick={() => {
                                                    if (enderecoSelected.UID_DOC) { setStep(3) }
                                                }}>CONTINUAR</button>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                </div>
                            </div>


                            <div id={Step == 3 ? "enabled" : "disabled"} className="CheckoutPage-Steps-RightSide CheckoutStep">
                                <div className="CheckoutPage--step">
                                    <h2><i className="fa-solid fa-credit-card"></i> Pagamento</h2>
                                    <p>Para finalizar, selecione o método para realizar o pagamento.</p>
                                    {Step == 3 ?
                                        <>
                                            <div className="totalPedido">
                                                <h3>Subtotal: R${Subtotal.toFixed(2)}</h3>
                                                <h3>Descontos: R${Desconto.toFixed(2)}</h3>
                                                <h2>Total: R${totalPay.toFixed(2)} ou <span className="greenoff">R${totalPayPix.toFixed(2)} pagando pelo Pix</span></h2>
                                            </div>

                                            <div className="CheckBox-Payment">
                                                <button id={metodoPay == "Pix" ? "selectedButtonWrapper" : null} onClick={() => { setMetodoPay("Pix") }}>Pix</button>
                                                <button id={metodoPay == "Cartao" ? "selectedButtonWrapper" : null} onClick={() => { setMetodoPay('Cartao') }}>Cartão de crédito</button>
                                            </div>
                                            {metodoPay == "Pix" ?
                                                <div className="PaymentPix">
                                                    <div>
                                                        <QRCode value={qrCodeValue} />
                                                        <div className="codeQRCODE">
                                                            <input disabled value={qrCodeValue} />
                                                            <button onClick={() => { navigator.clipboard.writeText(qrCodeValue) }}>COPIAR</button>
                                                        </div>
                                                    </div>
                                                    <div className="paymentButtonWrapper">
                                                        <button><i className="fa-solid fa-cart-shopping"></i> FINALIZAR COMPRA</button>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    {metodoPay == "Cartao" ?
                                                        <div className="PaymentCreditCard">
                                                            <p>Para continuar com o pagamento por cartão, você será redirecionado para outra página onde você poderá finalizar a compra.</p>
                                                            <div className="paymentButtonWrapper">
                                                                <button onClick={checkoutCard}><i className="fa-solid fa-cart-shopping"></i> FINALIZAR COMPRA</button>
                                                            </div>
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                </>
                                            }
                                        </>
                                        :
                                        null
                                    }

                                </div>
                            </div>
                        </div>
                    </>
                    :
                    null
                }
            </section>

        </>
    )
}