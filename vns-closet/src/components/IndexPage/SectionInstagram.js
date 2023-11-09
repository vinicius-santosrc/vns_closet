import { Link } from "react-router-dom";

export default function SectionInstagram() {
    return (
        <section className="Content-Section-InfoOfWebsite-wrapper content-info-website">
            <div className="Content-SectionBackground-Website bg-image-content-info-web">
                <img className="background-content-info" src="arquivos/content-info-website-image.webp" alt="" />
                
                <div className="image-leftside">
                    <img src="arquivos/vss-closet-logo-io.webp" alt="" />
                </div>
                <div className="image-rightside">
                    <img src="arquivos/vss-closet-logo-io.webp" alt="" />
                </div>
                <div className="textcontent-info-website">
                    <h1>CONFIRA A NOSSA LOJA OFICIAL NO INSTAGRAM</h1>
                    <Link to="https://www.instagram.com/vns.closett/" target="_blank" className="btnindex">ACESSAR</Link>
                </div>
            </div>
        </section>
    )
}