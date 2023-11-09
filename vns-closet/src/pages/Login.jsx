import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import Swal from "sweetalert2";

export default function Login() {

    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
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

    async function loginAccount(e) {
        e.preventDefault()
        if(!Email || !Password) {
            return Swal.fire({
                title: "ERRO!",
                text: "Por favor, insira todas informações solicitadas.",
              });
        }

        try {
            account.createEmailSession(Email, Password)
            .then((res) => {
                window.location.href = window.location.origin
            })
            .catch((error) => {
                return Swal.fire({
                    title: "ERRO!",
                    text: "Erro de senha/e-mail - por favor, confira as informações e tente novamente",
                  });
            })
        }
        catch (error) {

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
                        <img src={window.location.origin + "/arquivos/medium-shot-smiley-man-wearing-hoodie_23-2149359868.webp"} />
                    </div>
                    <div className="LoginPage_Content-Login--box">
                        <div className="HeaderLoginContent">
                            <img src={window.location.origin + "/arquivos/vss-closet-logo-io.webp"} />
                            <h2>REALIZE SEU LOGIN</h2>
                        </div>
                        <form action="" id="loginForm">
                            <div className="BoxInput-inner-box">
                                <p>Endereço de e-mail</p>
                                <input onChange={(e) => {setEmail(e.target.value)}} placeholder="E-mail" />
                            </div>
                            <div className="BoxInput-inner-box">
                                <p>Senha de acesso</p>
                                <input onChange={(e) => {setPassword(e.target.value)}} placeholder="Senha" />
                            </div>
                            <div className="BoxButton-Confirm">
                                <button onClick={loginAccount}>
                                    <span>ENTRAR NA CONTA</span>
                                </button>
                            </div>
                            <div className="RegisterLinkPage">
                                <p>Você ainda não possui uma conta registrada em nosso site?</p>
                                <Link to={window.location.origin + "/accounts/register"}>Cadastre-se aqui</Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}