import { useEffect, useState } from "react";
import { databases } from "../../lib/appwrite";
import { Query } from "appwrite";
import { bouncy } from 'ldrs'
import { Link } from "react-router-dom";

bouncy.register()

export default function ProdutosShow(typeproduct) {
    const [ProductsCad, setProdutos] = useState([]);
    const [Loading, setLoading] = useState(false)

    const DB = "65490ef281a42a311fd4";
    const Produtos = "65490ef9461967e20b04";

    function ErrorMessage() {
        return (
            <div className="Error-Loading-Products">
                <h2>Erro!</h2>
                <p>Por algum motivo não foi possível carregar os produtos.</p>
            </div>
        )
    }

    function LoadingWrapper() {
        return (
            <div className="Loading-Wrapper">
                <div className="Loading-Content">
                    <l-bouncy
                        size="45"
                        speed="1.75"
                        color="black"
                    ></l-bouncy>
                    <p>Carregando</p>
                </div>
            </div>
        )
    }

    async function ListProducts() {
        try {

            setLoading(true)

            await databases.listDocuments(
                DB,
                Produtos,
                [
                    Query.limit(200),
                    Query.equal("type", typeproduct.type),
                    Query.orderDesc("$createdAt"),

                ]
            )
                .then((response) => {
                    setLoading(false)
                    if (response.documents == '') {
                        setProdutos(
                            <div className="No-Products-to-Show">

                                <h1>Não encontramos nenhum resultado.</h1>

                            </div>
                        )
                    }
                    else {
                        setProdutos(response.documents.map((produto) => {
                            return (
                                <Link to={window.location.origin + "/produtos/" + produto.url}>
                                    <div className="item-card">
                                        <div className="marca-top">
                                            <label></label>
                                        </div>
                                        <div className="item-inside">
                                            <img src={produto.fotos.length > 0 ? produto.fotos[0] : produto.fotos} alt="" />
                                            <h2 className={"type " + produto.disponibilidade}>{produto.disponibilidade ? "Disponível" : "Esgotado"}</h2>
                                            <p className="name-item">{produto.nome} </p>
                                            {produto.desconto > 0 ?
                                                <p className="price-item"><s className="desconto">R${(produto.price).toFixed(2)}</s> R$ {(produto.price - produto.desconto).toFixed(2)}</p>
                                                :
                                                <p className="price-item">R$ {(produto.price).toFixed(2)}</p>
                                            }

                                        </div>
                                    </div>
                                </Link>
                            )
                        }))

                    }
                })
        }
        catch (error) {
            setLoading(false)
            setProdutos(
                ErrorMessage()

            )
        }
    }

    useEffect(() => {
        ListProducts()
    }, [])

    return (
        <section className="Filters-Wrapper-Show-flex-box filters-show">
            <div className="filters-show-leftside">
                <div className="filterbox">
                    <h2>Tipo</h2>
                    <div className="filterbox-inside">
                    <div className="filteroption">
                            <input type="checkbox" /><span>Unissex</span>
                        </div>
                        <div className="filteroption">
                            <input type="checkbox" /><span>Masculino</span>
                        </div>
                        <div className="filteroption">
                            <input type="checkbox" /><span>Feminino</span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="items-show-top-side">
                {Loading ? <LoadingWrapper /> : <></>}
                {ProductsCad}
            </div>

        </section>
    )
}