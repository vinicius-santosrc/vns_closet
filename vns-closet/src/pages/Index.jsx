/* COMPONENTS */

import { useEffect } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import CardDestaque from "../components/IndexPage/CardDestaque"
import DuvidasLoja from "../components/IndexPage/DuvidasLoja"
import SectionInstagram from "../components/IndexPage/SectionInstagram"
import SectionStylesSelect from "../components/IndexPage/SectionStylesSelect"

export default function Index() {
    function ChangePageName() {
        document.title = 'COM TODO RESPEITO - CTR';
    }

    useEffect(() => {
        ChangePageName()
    }, [])

    return (
        <>
            <Header />
            <CardDestaque />
            <SectionInstagram />
            <SectionStylesSelect />
            <DuvidasLoja />
            <Footer />
        </>
    )
}