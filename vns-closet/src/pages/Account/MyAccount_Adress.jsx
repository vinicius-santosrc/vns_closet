import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { account, databases } from "../../lib/appwrite";
import Navigation from "../../components/Accounts/Navigation";
import { ID, Query } from "appwrite";
import axios from 'axios';
import Swal from "sweetalert2";

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

    const [boxAdress, setBoxAdress] = useState(false)

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
                    async function d(ID) {
                        Swal.fire({
                            title: "Você tem certeza?",
                            text: "Não é possível reverter isso!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "black",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Excluir!",
                            cancelButtonText: "Cancelar"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                try {
                                    databases.deleteDocument(
                                        "65490ef281a42a311fd4",
                                        "654efe731ff2d6c66cb8",
                                        ID
                                    )
                                    .then((sucess) => {
                                        Swal.fire({
                                            title: "Excluído!",
                                            text: "O endereço foi removido.",
                                            icon: "success"
                                        })
                                        e()
                                    })
                                }
                                catch (error) {
                                    console.log(error)
                                }
                                
                            }
                        });

                    }
                    setQtdEnd(r.documents.length)
                    setenderecosOutPut(
                        r.documents.map((e) => {

                            return (
                                <li className="EnderecoWrapper--item">
                                    <div className="EnderecoWrapper-inside">
                                        <p><i className="fa-solid fa-house"></i> {e.endereco}</p>
                                        <p>{e.bairro} - {e.cidade} - {e.estado}</p>
                                    </div>
                                    <button onClick={() => { d(e.$id) }}><span><i className="fa-regular fa-trash-can"></i></span></button>
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
            setCidade(response.data.localidade);
            setCEP(C)
        } catch (error) {
            if (C) {
                alert("CEP NÃO ENCONTRADO")
            }
        }
    }

    async function Cr_ad() {
        try {
            if(CEP, Endereco, Numero, ComplementoERef, Estado, Cidade, Bairro, Destinatario, userLogged) {
                await databases.createDocument(
                    "65490ef281a42a311fd4",
                    "654efe731ff2d6c66cb8",
                    ID.unique(),
                    {
                        cep: CEP,
                        endereco: Endereco,
                        numero: Numero,
                        complemento_e_ref: ComplementoERef,
                        estado: Estado,
                        cidade: Cidade,
                        bairro: Bairro,
                        destinatario: Destinatario,
                        USER_UID_RES_END: userLogged.$id
                    }
                )
                    .then((sucess) => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Você adicionou um novo endereço.",
                            showConfirmButton: false,
                            timer: 1500
                        })
                            .then((after) => {
                                e()
                            })
                    })
            }
        }
        catch (error) {
            console.log(error)
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
                    {QtdEnd >= 4
                        ?
                        <></>
                        :
                        <>
                            {
                                boxAdress
                                    ?
                                    <div className="cancelAdress-InnerWrapper-Button">
                                        <button onClick={() => { setBoxAdress(false) }}>
                                            <span>CANCELAR</span>
                                        </button>
                                    </div>
                                    :
                                    <div className="createNewAdress-InnerWrapper-Button">
                                        <button onClick={() => { setBoxAdress(true) }}>
                                            <span>ADICIONAR ENDEREÇO</span>
                                        </button>
                                    </div>
                            }
                        </>
                    }

                    {boxAdress ?
                        <>
                            {QtdEnd >= 4 ?
                                <></>
                                :
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
                                                <input onChange={(e) => { setComplementoERef(e.target.value) }} type="text" />
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
                                                <input onChange={(e) => { setDestinatario(e.target.value) }} type="text" />
                                            </div>
                                            <div className="CheckoutPage-CreateAddress createNewAdress-InnerWrapper-Button ">
                                                <button onClick={Cr_ad}>
                                                    <span>ADICIONAR NOVO ENDEREÇO</span>
                                                </button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                        :
                        null
                    }


                    <div className="EnderecosPage">
                        <div className="EnderecosExists">
                            <ul className="listsEnderecos-Checkout">
                                {enderecosOutPut}
                            </ul>
                        </div>
                        {QtdEnd >= 4}

                    </div>
                </main>
            </section>
        </>
    )
}