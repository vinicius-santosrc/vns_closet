import { useEffect } from "react";
import BannerPageCamisas from "../../components/CategoriasPage/BannerPageCamisas";
import ProdutosShow from "../../components/CategoriasPage/ProdutosShow";
import Header from "../../components/Header";

export default function Camisetas() {

    function ChangePageName() {
        document.title = 'VNS CLOSET: Camisetas';
    }

    useEffect(() => {
        ChangePageName()
    }, [])

    return (
        <>
            <Header />
            <BannerPageCamisas />
            <ProdutosShow />
        </>
    )
}