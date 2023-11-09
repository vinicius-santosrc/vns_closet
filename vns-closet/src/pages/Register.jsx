import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { account, databases } from "../lib/appwrite";
import { ID } from "appwrite";

export default function Register() {

    const [Nome, setName] = useState(null);
    const [CPF, setCPF] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);

    const [SucessBox, setSucessBox] = useState(null);

    const [Loading, setLoading] = useState(false)

    async function getAccount() {
        setLoading(true)
        try {
            await account.get().then((r) => {
                window.location.href = window.location.origin
            })
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            return

        }
    }
    useEffect(() => {
        getAccount()
    }, [])

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

    async function createAccount(e) {
        e.preventDefault()
        setLoading(true)
        if (!Nome || !CPF || !Email || !Password) {
            setLoading(false)
            return Swal.fire({
                title: "ERRO!",
                text: "Por favor, insira todas informações solicitadas.",
            });
        }


        function generateUniqueId() {
            // Gera uma string aleatória de 8 caracteres
            const randomString = Math.random().toString(16).substr(2, 8);
            
            // Obtém um carácter de timestamp para garantir unicidade
            const timestampChar = Date.now().toString(16).substr(-4);
            
            // Combina os dois para formar o ID único
            const uniqueId = randomString + timestampChar;
            
            return uniqueId;
          }
          
          const myUniqueId = generateUniqueId();


        try {
            account.get().then((res) => {
                setLoading(false)
                window.location.href = window.location.origin
            }).catch(() => {
                let userID;
                //Criar usuário no banco de dados
                account.create(
                    myUniqueId,
                    Email,
                    Password
                )
                    .then((response) => {
                        databases.createDocument(
                            '65490ef281a42a311fd4',
                            '654c3f326781694c82c3',
                            myUniqueId,
                            {
                                Nome: Nome,
                                CPF: CPF,
                                Email: Email,
                                Password: Password,
                            }
                        )
                        .then((res) => {
                            setLoading(false)
                            setSucessBox(
                                <div className="SucessBox-show">
                                    <h1>Sucesso!</h1>
                                    <p>Você criou sua conta com sucesso. Agora realize o login para continuar.</p>
                                    <Link to={window.location.origin + "/accounts/login"}>Ir para página de login</Link>
                                </div>
                            )
                        })
                        .catch((error) => {
                            console.log(error)
                            return Swal.fire({
                                title: "ERRO!",
                                text: "Por favor, insira um e-mail válido e uma senha forte.",
                            });
                        })
                        
                    })
                    .catch((error) => {
                        console.log(error)
                        setLoading(false)
                        return Swal.fire({
                            title: "ERRO!",
                            text: "Por favor, insira um e-mail válido e uma senha forte.",
                        });
                    })
            })
        }
        catch (error) {
            setLoading(false)
        }
    }


    return (
        <>
            <Header />
            {Loading ? <LoadingWrapper /> : null}
            <div className="LoginPageContent">
                <section className="Login-Content-Box-Temp">
                    <div className="LoginPage_BannerLeftSide-content">
                        <div className="fixedHeader"><h1>VNS-CLOSET</h1></div>
                        <img src={window.location.origin + "/arquivos/full-shot-young-woman-wearing-black-hoodie_23-2149359802.webp"} />
                    </div>
                    <div className="LoginPage_Content-Login--box">
                        <div className="HeaderLoginContent">
                            <img src={window.location.origin + "/arquivos/vss-closet-logo-io.webp"} />
                            <h2>CRIAÇÃO DE CONTA</h2>
                        </div>
                        {SucessBox}
                        <form action="" id="loginForm">
                            <div className="BoxInput-inner-box">
                                <p>Nome completo *</p>

                                <input required onChange={(e) => { setName(e.target.value) }} placeholder="Nome" type="text" />
                            </div>
                            <div className="BoxInput-inner-box">
                                <p>CPF *</p>
                                <input required onChange={(e) => { setCPF(e.target.value) }} placeholder="CPF" type="number" />
                            </div>
                            <div className="BoxInput-inner-box">
                                <p>Endereço de e-mail *</p>
                                <input required onChange={(e) => { setEmail(e.target.value) }} placeholder="E-mail" type="email" />
                            </div>
                            <div className="BoxInput-inner-box">
                                <p>Senha de acesso *</p>
                                <p>{Password}</p>
                                <input required onChange={(e) => { setPassword(e.target.value) }} placeholder="Senha" type="password" />
                            </div>
                            <div className="BoxButton-Confirm">
                                <button type="submit" onClick={createAccount}>
                                    <span>CRIAR CONTA</span>
                                </button>
                            </div>
                            <div className="RegisterLinkPage">
                                <p>Já possui uma conta cadastrada em nosso site?</p>
                                <Link to={window.location.origin + "/accounts/login"}>Entre aqui</Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}