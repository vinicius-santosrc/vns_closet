import { Query } from "appwrite";
import { databases } from "../../lib/appwrite";
import { useEffect, useState } from "react";

export default function BannerPageCalcas_Bermudas() {
    const [QuantidadeProdutos, setQuantidadeProdutos] = useState(null)

    async function getQuantProducts() {
        const DB = "65490ef281a42a311fd4";
        const Produtos = "65490ef9461967e20b04";

        try {
            await databases.listDocuments(
                DB,
                Produtos,
                [
                    Query.limit(200),
                    Query.equal("type", "CalçasBermudas"),
                    Query.orderDesc("$createdAt"),

                ]
            )
                .then((response) => {
                    setQuantidadeProdutos(response.documents.length == 1 ? response.documents.length + " resultado" : response.documents.length + " resultados")
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQuantProducts()
    }, [])

    return (
        <>
            <section class="image-calcados camisetas-banner" >
                <h1>CALÇAS E BERMUDAS</h1>
                <img class="camisetas-banner-1" src="arquivos/camisetas-banner.png" alt="" />
            </section>
            <section className="Results-of-Type-Select">
                <label className="caminho">VNS-CLOSET{(window.location.pathname).toUpperCase()}</label>
                <h2>Mostrando {QuantidadeProdutos} de Calças e Bermudas</h2>
            </section>
        </>

    )
}