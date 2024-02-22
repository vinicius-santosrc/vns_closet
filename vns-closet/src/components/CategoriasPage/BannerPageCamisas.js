import { Query } from "appwrite"
import { databases } from "../../lib/appwrite"
import { useEffect, useState } from "react";

export default function BannerPageCamisas() {
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
                    Query.equal("type", "Camisetas"),
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
                <h1>CAMISETAS</h1>
               
            </section>
            <section className="Results-of-Type-Select">
                <label className="caminho">COM-TODO-RESPEITO{(window.location.pathname).toUpperCase()}</label>
                <h2>Mostrando {QuantidadeProdutos} de camisetas</h2>
            </section>
        </>

    )
}