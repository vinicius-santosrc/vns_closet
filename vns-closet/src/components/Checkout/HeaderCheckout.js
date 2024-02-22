import { Link } from "react-router-dom";

export default function HeaderCheckout() {
    return (
        <header className="Header-Styled-Closet-Flexbox HeaderStyle">
            <Link to={window.location.origin} className="Header-Styled-closet leftside-header">
                <img src={window.location.origin + "/arquivos/vss-closet-logo-io.webp"} alt="" />
                <h1>COM TODO RESPEITO</h1>
            </Link>
        </header>
    )
}