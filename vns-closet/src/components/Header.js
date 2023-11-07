import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [Menu, setMenu] = useState(null)

    async function openMenu() {
        setMenu(
            <nav className="NavigationMenuShow">
                <div className="MenuStyledShow">
                    <div className="HeaderMenuStyled">
                        <div></div>
                        <Link to={window.location.origin} className="Header-Styled-closet leftside-header">
                            <img src={window.location.origin + "/arquivos/vss-closet-logo-io.png"} alt="" />
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
                            <li><Link to={window.location.origin + "/home"}>Workout</Link></li>
                            <li><Link to={window.location.origin + "/camisetas"}>Camisetas</Link></li>
                            <li><Link to={window.location.origin + "/futebol"}>Futebol</Link></li>
                            <li><Link to={window.location.origin + "/calcas&bermudas"}>Calças & Bermudas</Link></li>
                            <li><Link to={window.location.origin + "/basquete"}>Basquete</Link></li>
                            <li><Link to={window.location.origin + "/calcados"}>Calçados</Link></li>

                        </ul>
                        <div>
                            
                        </div>
                    </div>
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
    return (
        <>
            {Menu}
            <header className="Header-Styled-Closet-Flexbox HeaderStyle">
                <Link to={window.location.origin} className="Header-Styled-closet leftside-header">
                    <img src={window.location.origin + "/arquivos/vss-closet-logo-io.png"} alt="" />
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
                    <button className="AccountButton-styled ButtonWrapper-header-styled" title="Minha conta">
                        <Link className="AccountRedirect-styled" to={window.location.origin + "/accounts/login"}>
                            <span className="AccountButton-styled_IconContainer" aria-hidden="true">
                                <i className="fa-regular fa-user"></i>
                            </span>
                        </Link>
                    </button>
                    <button className="FavoriteButton-styled ButtonWrapper-header-styled" title="Favoritos">
                        <Link className="FavoriteRedirect-styled" to={window.location.origin + "/favorites"}>
                            <span className="FavoriteButton-styled_IconContainer" aria-hidden="true">
                                <i className="fa-regular fa-heart"></i>
                            </span>
                        </Link>
                    </button>
                    <button className="CartButton-styled ButtonWrapper-header-styled" title="Sua sacola">
                        <Link className="CartRedirect-styled">
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
                    <Link className="CartRedirect-styled">
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