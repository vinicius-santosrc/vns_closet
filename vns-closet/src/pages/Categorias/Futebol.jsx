import { useEffect } from "react";
import BannerPageFutebol from "../../components/CategoriasPage/BannerPageFutebol";
import ProdutosShow from "../../components/CategoriasPage/ProdutosShow";
import Header from "../../components/Header";

export default function Futebol() {

    function ChangePageName() {
        document.title = 'COM TODO RESPEITO - FUTEBOL';
    }

    useEffect(() => {
        ChangePageName()
    }, [])

    return (
        <>
            <Header />
            <BannerPageFutebol />
            <ProdutosShow
                type="futebol"
            />
        </>
    )
}