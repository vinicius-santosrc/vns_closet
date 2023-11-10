import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { account, databases } from "../lib/appwrite";


export default function Header() {
    const [Menu, setMenu] = useState(null);
    const [Sacola, setSacola] = useState(false);

    const [userLogged, setUserlogged] = useState(null)

    const [Loading, setLoading] = useState(false)

    let [precototal, setprecototal] = useState(null)
    let [subtotal, setsubtotal] = useState(null)
    let [descontos, setdescontos] = useState(null)

    const SacolaItensShow = localStorage.getItem("s-vns-closet-fstorage-bagsc")

    const [SacolaItens, setSacolaItens] = useState([])




    function getPrices() {
        let JSONitens = JSON.parse(SacolaItensShow);


        if (JSONitens) {
            JSONitens.map((r) => {
                let preco = 0
                let sub = 0
                let desc = 0
                JSONitens.map((item, index) => {
                    preco += item.price - item.desconto
                    sub += item.price
                    desc += item.desconto
                })
                setprecototal(preco)
                setsubtotal(sub)
                setdescontos(desc)
            })

        }
    }

    function removepos(index) {
        let JSONitens = JSON.parse(SacolaItensShow);

        // Use o método splice para remover o item do array no local de armazenamento local
        JSONitens.splice(index, 1);

        // Atualize o armazenamento local com o array modificado
        localStorage.setItem('s-vns-closet-fstorage-bagsc', JSON.stringify(JSONitens));
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

    async function getSacolaItens() {
        let JSONitens = JSON.parse(SacolaItensShow);
        if (JSONitens) {

            setSacolaItens(JSONitens.map((r, i) => {
                return (
                    <li>
                        <div className="SacolaShow_PhotoURL__sacola--item">
                            <img className="SacolaShow_PhotoURL_sacola--item" src={r.foto} alt="" />
                        </div>
                        <div className="SacolaShow-ContentInformation--item">
                            <div className="HeaderSacolaShow--item">
                                <h3>{r.name}</h3>
                                <div className="HeaderButtonRemove">
                                    <button className="ButtonInnerRemove" onClick={() => { removepos(i) }}>
                                        <span><i className="fa-regular fa-trash-can"></i></span>
                                    </button>
                                </div>
                            </div>
                            <div className="SacolasTamanho_Cor">
                                <h4>Tamanho: <span>{r.tamanho}</span></h4>
                                <h4>Cor: <span>{r.cor}</span></h4>
                            </div>
                            <div className="PrecosSacola">
                                {r.desconto > 0 ?
                                    <>
                                        <label className="priceatual">R${(r.price - r.desconto).toFixed(2)}</label>
                                        <s>
                                            <label className="desconto">R${(r.price).toFixed(2)}</label>
                                        </s>
                                    </>
                                    :
                                    <label className="priceatual">R${(r.price).toFixed(2)}</label>
                                }
                            </div>
                        </div>
                    </li>
                )

            }))


        }

    }

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
            return

        }
    }

    useEffect(() => {
        getAccount()
    }, [])

    useEffect(() => {
        getSacolaItens()
    })

    useEffect(() => {
        getPrices()
    })

    function openSacola() {
        return (
            setSacola(
                true
            )
        )
    }

    function closeSacola() {
        document.querySelector(".SacolaShow-Styled-Menu").classList.add("SacolaShow-closing");
        setTimeout(() => {
            setSacola(false);
            document.querySelector(".SacolaShow-Styled-Menu").classList.remove("SacolaShow-closing");
        }, 280);
    }



    async function openMenu() {
        setMenu(
            <nav className="NavigationMenuShow">
                <div className="MenuStyledShow">
                    <div className="HeaderMenuStyled">
                        <div></div>
                        <Link to={window.location.origin} className="Header-Styled-closet leftside-header">
                            <img src={window.location.origin + "/arquivos/vss-closet-logo-io.webp"} alt="" />
                            <h1>VNS CLOSET</h1>
                        </Link>

                        <button onClick={closeMenu}>
                            <span>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                        </button>
                    </div>
                    <div className="MiddleHeaderStyled">
                        <ul className="ListNavigationMenu">
                            <li><Link to={window.location.origin + "/workout"}>Workout</Link></li>
                            <li><Link to={window.location.origin + "/camisetas"}>Camisetas</Link></li>
                            <li><Link to={window.location.origin + "/futebol"}>Futebol</Link></li>
                            <li><Link to={window.location.origin + "/calcas&bermudas"}>Calças & Bermudas</Link></li>
                            <li><Link to={window.location.origin + "/basquete"}>Basquete</Link></li>
                            <li><Link to={window.location.origin + "/calcados"}>Calçados</Link></li>

                        </ul>
                        <div>

                        </div>
                    </div>
                    {userLogged ?
                        <div className="BottomHeaderStyled">
                            <Link to={window.location.origin + "/accounts/myaccount"}>
                                <div className="AccountShow-BottomHeaderStyled">
                                    <div className="LeftSide-BottomHeaderStyled">
                                        <i className="fa-regular fa-address-card"></i>
                                    </div>
                                    <div className="RightSide-BottomHeaderStyled">
                                        <h2>Minha conta</h2>
                                        <p>Olá, {getName()}!</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        :
                        null
                    }
                </div>
            </nav>
        )
    }
    function closeMenu() {
        document.querySelector('.NavigationMenuShow').classList.add("closingMenu")
        setTimeout(() => {
            setMenu(null);
        }, 280);

    }

    function getName() {
        var nomeCompleto = userLogged.Nome;

        // Encontrar a posição do primeiro espaço
        var primeiroEspaco = nomeCompleto.indexOf(' ');

        // Extrair o primeiro nome até o primeiro espaço
        var primeiroNome = nomeCompleto.substring(0, primeiroEspaco);

        // Exibir o primeiro nome
        return primeiroNome;
    }
    useEffect(() => {
        if (userLogged) {
            getName()
        }
    }, [userLogged])

    function gotoCheckout() {
        if (userLogged) {
            window.location.href = window.location.origin + "/checkout"
        }
        else {
            window.location.href = window.location.origin + "/accounts/login?=checkout_continue"
        }
    }

    return (
        <>
            {Menu}
            {Loading ? <LoadingWrapper /> : null}
            {Sacola ? <>
                <div className="background-sacola-inner" onClick={closeSacola}></div>
                <div className="SacolaShow-Styled-Menu">
                    <div className="SacolaShow-Header-Styled">
                        <div className="SacolaIconVns">
                            <img src={window.location.origin + "/arquivos/vss-closet-logo-io.webp"} />
                        </div>
                        <div className="SacolaTitleH1-Styled">
                            <h1>MINHA SACOLA</h1>
                        </div>
                        <div className="SacolaCloseButton">
                            <button className="Sacola_ButtonInnerWrapper" onClick={closeSacola}>
                                <span id="buttonSacolaInner">
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="SacolaItensInnerWrapper">
                        <ul className="ListSacolaItens">
                            {SacolaItensShow && SacolaItensShow != '[]'
                                ?
                                <>{SacolaItens}</>
                                :
                                <div className="noItemSacola">
                                    <h2>A sacola está vazia.</h2>
                                    <p>Você não adicionou nenhum item em sua sacola.</p>
                                    <button onClick={closeSacola}>PROCURAR ITENS</button>
                                </div>}

                        </ul>
                    </div>
                    {SacolaItensShow && SacolaItensShow != '[]' ? <div className="SacolaBottomCheckout">
                        <h3>Subtotal: R${subtotal.toFixed(2)}</h3>
                        <h3>Descontos: R${descontos.toFixed(2)}</h3>
                        <h1>Total: <span>R${precototal.toFixed(2)}</span></h1>
                        <button onClick={gotoCheckout} className="CheckoutButtonSacola">
                            <span>IR PARA O CHECKOUT</span>
                        </button>
                    </div> : null}
                </div>
            </> : null}
            <header className="Header-Styled-Closet-Flexbox HeaderStyle">
                <Link to={window.location.origin} className="Header-Styled-closet leftside-header">
                    <img src={window.location.origin + "/arquivos/vss-closet-logo-io.webp"} alt="" />
                    <h1>VNS CLOSET</h1>
                </Link>

                <div className="Header-Styled-closet center-header">
                    <ul className="CentralizedStyledHeader">
                        <li><Link to={window.location.origin + "/workout"}>Workout</Link></li>
                        <li><Link to={window.location.origin + "/camisetas"}>Camisetas</Link></li>
                        <li><Link to={window.location.origin + "/futebol"}>Futebol</Link></li>
                        <li><Link to={window.location.origin + "/calcas&bermudas"}>Calças e Bermudas</Link></li>
                        <li><Link to={window.location.origin + "/basquete"}>Basquete</Link></li>
                        <li><Link to={window.location.origin + "/calcados"}>Calçados</Link></li>

                    </ul>
                </div>
                <div className="Header-Styled-closet rightside-header">
                    {userLogged ?
                        <button className="AccountButton-styled ButtonWrapper-header-styled" title="Minha conta">
                            <Link className="AccountRedirect-styled" to={window.location.origin + "/accounts/myaccount"}>
                                <div className="AccountButton-flex-box">
                                    <div className="AccountButton-LeftIconUser">
                                        <span className="AccountButton-styled_IconContainer" aria-hidden="true">
                                            <i className="fa-regular fa-user"></i>
                                        </span>
                                    </div>
                                    <div className="AccountButton-Content-User">
                                        <h3>Minha conta</h3>
                                        <p>Olá, {getName()}.</p>
                                    </div>

                                </div>

                            </Link>
                        </button>
                        :
                        <button className="AccountButton-styled ButtonWrapper-header-styled" title="Minha conta">
                            <Link className="AccountRedirect-styled" to={window.location.origin + "/accounts/login"}>
                                <span className="AccountButton-styled_IconContainer" aria-hidden="true">
                                    <i className="fa-regular fa-user"></i>
                                </span>
                            </Link>
                        </button>
                    }
                    <button className="CartButton-styled ButtonWrapper-header-styled" title="Sua sacola">
                        <Link className="CartRedirect-styled" onClick={openSacola}>
                            <span className="CartButton-styled_IconContainer" aria-hidden="true">
                                <i className="fa-solid fa-bag-shopping"></i>
                            </span>
                        </Link>
                    </button>
                </div>

                <div className="Header-Styled-closet rightside-header-mobile">
                    <Link className="MenuRedirect-styled" onClick={openMenu}>
                        <button className="MenuButton-styled ButtonWrapper-header-styled" title="Minha conta">
                            <span className="MenuButton-styled_IconContainer" aria-hidden="true">
                                <i className="fa-solid fa-bars"></i>
                            </span>
                        </button>
                    </Link>
                    <Link className="CartRedirect-styled" onClick={openSacola}>
                        <button className="CartButton-styled ButtonWrapper-header-styled" title="Sua sacola">
                            <span className="CartButton-styled_IconContainer" aria-hidden="true">
                                <i className="fa-solid fa-bag-shopping"></i>
                            </span>
                        </button>
                    </Link>
                </div>
            </header>
        </>
    )
}