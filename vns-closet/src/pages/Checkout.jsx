import { useEffect, useRef, useState } from "react"
import { account, databases } from "../lib/appwrite"
import HeaderCheckout from "../components/Checkout/HeaderCheckout"
import { Link } from "react-router-dom";
import QRCode from 'react-qr-code';

export default function Checkout() {
    const [userLogged, setUserlogged] = useState(null);
    const [Loading, setLoading] = useState(false);

    const [totalPay, setTotalPay] = useState(0);
    const [Desconto, setDesconto] = useState(0);
    const [Subtotal, setSubtotal] = useState(0);
    const [totalPayPix, setTotalPayPix] = useState(0);

    const [sacolaItens, setSacolaItens] = useState([]);


    const SacolaItensShow = localStorage.getItem("s-vns-closet-fstorage-bagsc")

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
            const identificador = Date.now().toString();

            const dataVencimento = new Date();
            dataVencimento.setMinutes(dataVencimento.getMinutes() + 10);

            const payloadPix = `00020101021226530000BR.GOV.BCB.PIX${identificador.length
                .toString()
                .padStart(2, '0')}${identificador}5204000053039865404BR5923VINICIUSDASILVASANTOS6009BRASILIA62160509${formatarData(
                    dataVencimento
                )}6304`;

            const valorFormatado = (50).toFixed(2).replace('.', '');
            const payloadCompleto = `00020126330014BR.GOV.BCB.PIX0111117940876485204000053039865406${totalpix < 99 ? "0" + totalpix.toFixed(2) : totalpix.toFixed(2)}5802BR5924Vinicius da Silva Santos6012POUSO ALEGRE62130509VNSCLOSET63040FBA`;

            setQrCodeValue(payloadCompleto);
        };

        gerarQrCode();
    });

    const formatarData = (data) => {
        return data.toISOString().replace(/[-T:]/g, '').slice(0, -5);
    };

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
                            <div className="CheckoutPage-Steps-LeftSide CheckoutStep">
                                <div className="CheckoutPage--step">
                                    <h2><i className="fa-solid fa-circle-user"></i> Dados pessoais</h2>
                                    <p>Solicitamos apenas as informações essenciais para a realização da compra.</p>
                                    <div className="Inputs-Content">
                                        <div className="LeftSide">
                                            <div className="CheckoutPage-InputBox">
                                                <p>Nome completo</p>
                                                <input type="text" />
                                            </div>
                                            <div className="CheckoutPage-InputBox">
                                                <p>CPF</p>
                                                <input type="number" />
                                            </div>
                                        </div>
                                        <div className="RightSide">
                                            <div className="CheckoutPage-InputBox">
                                                <p>Número do WhatsApp ou Telefone</p>
                                                <input type="number" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="CheckoutPage-Steps-Center CheckoutStep">
                                <div className="CheckoutPage--step">
                                    <h2><i className="fa-solid fa-truck"></i> Entrega</h2>
                                    <p>Insira as informações essenciais para podermos realizar a entrega.</p>
                                    <div className="Inputs-Content">
                                        <div className="LeftSide">
                                            <div className="CheckoutPage-InputBox">
                                                <p>CEP</p>
                                                <input type="text" />
                                            </div>
                                            <div className="CheckoutPage-InputBox">
                                                <p>Endereço</p>
                                                <input type="text" />
                                            </div>
                                            <div className="CheckoutPage-InputBox">
                                                <p>Número</p>
                                                <input type="text" />
                                            </div>
                                            <div className="CheckoutPage-InputBox">
                                                <p>Complemento e referência</p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="RightSide">
                                            <div className="CheckoutPage-InputBox">
                                                <p>Estado</p>
                                                <input type="text" />
                                            </div>
                                            <div className="CheckoutPage-InputBox">
                                                <p>Cidade</p>
                                                <input type="text" />
                                            </div>
                                            <div className="CheckoutPage-InputBox">
                                                <p>Bairro</p>
                                                <input type="text" />
                                            </div>
                                            <div className="CheckoutPage-InputBox">
                                                <p>Destinatário</p>
                                                <input type="text" />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="CheckoutPage-Steps-RightSide CheckoutStep">
                                <div className="CheckoutPage--step">
                                    <h2><i className="fa-solid fa-credit-card"></i> Pagamento</h2>
                                    <p>Para finalizar, selecione o método para realizar o pagamento.</p>
                                    <div className="totalPedido">
                                        <h3>Subtotal: R${Subtotal.toFixed(2)}</h3>
                                        <h3>Descontos: R${Desconto.toFixed(2)}</h3>
                                        <h2>Total: R${totalPay.toFixed(2)} ou <span className="greenoff">R${totalPayPix.toFixed(2)} pagando pelo Pix</span></h2>
                                    </div>

                                    <div className="CheckBox-Payment">
                                        <button>Pix</button>
                                        <button>Cartão de crédito</button>
                                    </div>
                                    <div className="PaymentCreditCard">
                                        <p>Para continuar com o pagamento por cartão, você será redirecionado para outra página onde você poderá finalizar a compra.</p>
                                    </div>
                                    <div className="PaymentPix">
                                        <div>
                                            <QRCode value={qrCodeValue} />
                                        </div>
                                    </div>
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