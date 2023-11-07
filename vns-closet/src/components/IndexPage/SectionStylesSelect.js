import { Link } from "react-router-dom";

export default function SectionStylesSelect() {
    return (
        <section className="Content-Show-Wrapper-Type-Products-flex content-type-products">
            <div className="header-of-tipic">
                <h1>VOCÊ VAI AMAR NOSSOS ESTILOS</h1>
            </div>
            <div className="styles-cards">
                <Link to={window.location.origin + "/workout"}><img src="arquivos/workout-card.png" alt="" /></Link>
                <Link to={window.location.origin + "/camisetas"}><img src="arquivos/camisetas-card.png" alt="" /></Link>
                <div className="break"></div>
                <Link to={window.location.origin + "/futebol"}><img src="arquivos/futebol-card.png" alt="" /></Link>
                <Link to={window.location.origin + "/calcas&bermudas"}><img src="arquivos/calcas&bermudas-card.png" alt="" /></Link>
                <div className="break"></div>
                <Link to={window.location.origin + "/basquete"}><img src="arquivos/basquete-card.png" alt="" /></Link>
                <Link to={window.location.origin + "/calcados"}><img src="arquivos/calcados-card.png" alt="" /></Link>
            </div>
        </section>
    )
}