import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="Header-Styled-Closet-Flexbox HeaderStyle">
            <Link to={window.location.origin} className="Header-Styled-closet leftside-header">
                    <img src={window.location.origin + "/arquivos/vss-closet-logo-io.png"} alt="" />
                    <h1>VNS CLOSET</h1></Link>
            <div className="Header-Styled-closet rightside-header">
                <button className="AccountButton-styled ButtonWrapper-header-styled" title="Minha conta">
                    <span className="AccountButton-styled_IconContainer" aria-hidden="true">
                        <i className="fa-regular fa-user"></i>
                    </span>
                </button>
                <button className="FavoriteButton-styled ButtonWrapper-header-styled" title="Favoritos">
                    <span className="FavoriteButton-styled_IconContainer" aria-hidden="true">
                        <i className="fa-regular fa-heart"></i>
                    </span>
                </button>
                <button className="CartButton-styled ButtonWrapper-header-styled" title="Sua sacola">
                    <span className="CartButton-styled_IconContainer" aria-hidden="true">
                        <i className="fa-solid fa-bag-shopping"></i>
                    </span>
                </button>
            </div>
            <div className="Header-Styled-closet rightside-header-mobile">
                <button className="MenuButton-styled ButtonWrapper-header-styled" title="Minha conta">
                    <span className="MenuButton-styled_IconContainer" aria-hidden="true">
                        <i className="fa-solid fa-bars"></i>
                    </span>
                </button>
                
            </div>
        </header>
    )
}