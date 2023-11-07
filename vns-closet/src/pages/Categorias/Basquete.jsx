import { useEffect } from "react";
import BannerPageBasquete from "../../components/CategoriasPage/BannerPageBasquete";
import ProdutosShow from "../../components/CategoriasPage/ProdutosShow";
import Header from "../../components/Header";

export default function Basquete() {
    function ChangePageName() {
        document.title = 'VNS CLOSET: Calçados';
    }

    useEffect(() => {
        ChangePageName()
    }, [])

    return (
        <>
            <Header />
            <BannerPageBasquete />
            <ProdutosShow
                type="basquete"
            />
        </>
    )
}