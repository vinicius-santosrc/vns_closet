export default function Footer() {
    return (
        <section className="footer">
            <img className="moon" src={window.location.origin + "/arquivos/moon.webp"} alt="" />
            <img className="sun" src={window.location.origin + "/arquivos/sun.webp" } alt="" />
            <img className="footer-bg" src={window.location.origin + "/arquivos/footer.webp"} alt="" />
        </section>
    )
}