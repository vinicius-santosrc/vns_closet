import { useEffect } from "react";
import BannerPageCalcas_Bermudas from "../../components/CategoriasPage/BannerPageCalcas&Bermudas";
import ProdutosShow from "../../components/CategoriasPage/ProdutosShow";
import Header from "../../components/Header";

export default function CalcadosBermudas() {

    function ChangePageName() {
        document.title = 'VNS CLOSET: Calças & Bermudas';
    }

    useEffect(() => {
        ChangePageName()
    }, [])

    return (
        <>
            <Header />
            <BannerPageCalcas_Bermudas />
            <ProdutosShow
                type="calcas&bermudas"
            />
        </>
    )
}