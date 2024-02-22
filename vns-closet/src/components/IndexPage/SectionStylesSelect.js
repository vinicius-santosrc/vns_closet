import { Link } from "react-router-dom";

export default function SectionStylesSelect() {
    return (
        <section className="Content-Show-Wrapper-Type-Products-flex content-type-products">
            <div className="header-of-tipic">
                <h1>VOCÊ VAI AMAR NOSSOS ESTILOS</h1>
            </div>
            <div className="styles-cards">
                <Link to={window.location.origin + "/camisetas"}><img src="arquivos/camisetas-card.webp" alt="" /></Link>
                <Link to={window.location.origin + "/moletons"}><img src="arquivos/moletons-card.webp" alt="" /></Link>
                <div className="break"></div>
                <Link to={window.location.origin + "/calcas"}><img src="arquivos/calcas&bermudas-card.webp" alt="" /></Link>
                <Link to={window.location.origin + "/bones"}><img src="arquivos/bones-card.webp" alt="" /></Link>
            </div>
        </section>
    )
}