export default function Footer() {
    return (
        <section className="footer">
            <img className="moon" src={window.location.origin + "/arquivos/moon.png"} alt="" />
            <img className="sun" src={window.location.origin + "/arquivos/sun.png" } alt="" />
            <img className="footer-bg" src={window.location.origin + "/arquivos/footer.png"} alt="" />
        </section>
    )
}