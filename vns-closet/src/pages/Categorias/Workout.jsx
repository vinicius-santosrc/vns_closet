import { useEffect } from "react";
import BannerPageWorkout from "../../components/CategoriasPage/BannerPageWorkout";
import ProdutosShow from "../../components/CategoriasPage/ProdutosShow";
import Header from "../../components/Header";

export default function Workout() {

    function ChangePageName() {
        document.title = 'VNS CLOSET: Workout';
    }

    useEffect(() => {
        ChangePageName()
    }, [])

    return (
        <>
            <Header />
            <BannerPageWorkout />
            <ProdutosShow
                type="workout"
            />
        </>
    )
}