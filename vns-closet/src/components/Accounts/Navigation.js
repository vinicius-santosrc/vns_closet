import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="MyAccount-Navigation-inner">
            <ul className="MyAccount-list-Navigation">
                <li className="MyAccount--item">
                    <Link to={window.location.origin + "/accounts/myaccount"}>
                        <span>Dados pessoais</span>
                    </Link>
                </li>
                <li className="MyAccount--item">
                    <Link to={window.location.origin + "/accounts/myaccount/orders"}>
                        <span>Meus Pedidos</span>
                    </Link>
                </li>
                <li className="MyAccount--item">
                    <Link to={window.location.origin + "/accounts/myaccount/address"}>
                        <span>Meus Endereços</span>
                    </Link>
                </li>
                <li className="MyAccount--item">
                    <Link to={window.location.origin + "/accounts/myaccount/favorites"}>
                        <span>Favoritos</span>
                    </Link>
                </li>
                <li className="MyAccount--item">
                    <Link to={window.location.origin + "/accounts/myaccount/help"}>
                        <span>Ajuda</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}