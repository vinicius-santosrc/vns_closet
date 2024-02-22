import { useEffect } from "react";
import BannerPageCalcados from "../../components/CategoriasPage/BannerPageCalcados";
import ProdutosShow from "../../components/CategoriasPage/ProdutosShow";
import Header from "../../components/Header";

export default function Calcados() {
    function ChangePageName() {
        document.title = 'COM TODO RESPEITO - CALÇADOS';
    }

    useEffect(() => {
        ChangePageName()
    }, [])

    return (
        <>
            <Header />
            <BannerPageCalcados />
            <ProdutosShow
                type="calçados"
            />
        </>
    )
}