import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { account, databases } from "../../lib/appwrite";
import Navigation from "../../components/Accounts/Navigation";

export default function MyAccount() {

    const [userLogged, setUserlogged] = useState(null)
    const [Loading, setLoading] = useState(false)

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

    return (
        <>
            {Loading ? <LoadingWrapper /> : null}
            <Header />
            <section className="MyAccount-Show-Page-styled">
                <Navigation />
                <main className="MainPageSelected">
                    <h1>Dados pessoais</h1>
                    <p>Gerencie as configurações e os dados da sua conta.</p>
                    <div className="Account-MainPageSelected-Form-Container">
                        {userLogged ?
                            <>
                                <div className="Divisions-Inputbox-Name">
                                    <h4>Nome</h4>
                                    <p>{userLogged.Nome}</p>
                                </div>
                                <div className="Divisions-Inputbox-Name">
                                    <h4>E-mail</h4>
                                    <p>{userLogged.Email}</p>
                                </div>
                                <div className="Divisions-Inputbox-Name">
                                    <h4>CPF</h4>
                                    <p>{userLogged.CPF}</p>
                                </div>
                            </>
                            :
                            null
                        }
                    </div>
                </main>
            </section>
        </>
    )
}