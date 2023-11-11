import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { account, databases } from "../../lib/appwrite";
import Navigation from "../../components/Accounts/Navigation";
import { Query } from "appwrite";
import axios from 'axios';

export default function MyAccount_Adress() {
    const [userLogged, setUserlogged] = useState(null);
    const [Loading, setLoading] = useState(false);

    //ENDERECOS OUTPUT

    const [enderecosOutPut, setenderecosOutPut] = useState([]);
    const [QtdEnd, setQtdEnd] = useState(0)

    //ENDEREÇO CONSTS

    const [CEP, setCEP] = useState(null);
    const [Endereco, setEndereco] = useState(null);
    const [Numero, setNumero] = useState(null);
    const [ComplementoERef, setComplementoERef] = useState(null);
    const [Estado, setEstado] = useState(null);
    const [Cidade, setCidade] = useState(null);
    const [Bairro, setBairro] = useState(null);
    const [Destinatario, setDestinatario] = useState(null);

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

    useEffect(() => {

        e()

    }, [userLogged])


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
                    setenderecosOutPut(
                        r.documents.map((e) => {
                            return (
                                <li className="EnderecoWrapper--item">
                                    
                                    <div className="EnderecoWrapper-inside">
                                        <h2>{e.cidade} / {e.bairro}</h2>
                                        <p>Destinatário: {e.destinatario}</p>
                                    </div>
                                </li>
                            )
                        })
                    )
                })
        }
    }

    async function gG(C) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${C}/json/`);

            setEndereco(response.data.logradouro);
            setBairro(response.data.bairro);
            setEstado(response.data.uf);
            setCidade(response.data.localidade)
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    return (
        <>
            {Loading ? <LoadingWrapper /> : null}
            <Header />
            <section className="MyAccount-Show-Page-styled">
                <Navigation />
                <main className="MainPageSelected">
                    <h1>Endereços ({QtdEnd})</h1>
                    <p>Gerencie seus endereços.</p>
                    <div className="CreateNewAddress">
                        <div className="Inputs-Content">
                            <div className="LeftSide">
                                <div className="CheckoutPage-InputBox">
                                    <p>CEP</p>
                                    <input onBlur={(e) => { gG(e.target.value) }} type="text" />
                                </div>
                                <div className="CheckoutPage-InputBox">
                                    <p>Endereço</p>
                                    <input onChange={(e) => { setEndereco(e.target.value) }} value={Endereco} type="text" />
                                </div>
                                <div className="CheckoutPage-InputBox">
                                    <p>Número</p>
                                    <input onChange={(e) => { setNumero(e.target.value) }} type="text" />
                                </div>
                                <div className="CheckoutPage-InputBox">
                                    <p>Complemento e referência</p>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className="RightSide">
                                <div className="CheckoutPage-InputBox">
                                    <p>Estado</p>
                                    <input onChange={(e) => { setEstado(e.target.value) }} value={Estado} type="text" />
                                </div>
                                <div className="CheckoutPage-InputBox">
                                    <p>Cidade</p>
                                    <input onChange={(e) => { setCidade(e.target.value) }} value={Cidade} type="text" />
                                </div>
                                <div className="CheckoutPage-InputBox">
                                    <p>Bairro</p>
                                    <input onChange={(e) => { setBairro(e.target.value) }} value={Bairro} type="text" />
                                </div>
                                <div className="CheckoutPage-InputBox">
                                    <p>Destinatário</p>
                                    <input type="text" />
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="EnderecosPage">
                        <div className="EnderecosExists">
                            <ul className="ListEnderecos">
                                {enderecosOutPut}
                            </ul>
                        </div>
                        {QtdEnd >= 4}
                        <li className="EnderecoWrapper--newitem">
                            <div className="EnderecoWrapper-inside">
                                <h2><i className="fa-solid fa-plus"></i> ADICIONAR NOVO</h2>
                            </div>
                        </li>
                    </div>
                </main>
            </section>
        </>
    )
}