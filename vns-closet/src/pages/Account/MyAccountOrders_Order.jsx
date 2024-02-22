import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { account, databases } from "../../lib/appwrite";
import Navigation from "../../components/Accounts/Navigation";
import { Query } from "appwrite";

export default function MyAccountOrders_Order() {

    const [userLogged, setUserlogged] = useState(null);
    const [Loading, setLoading] = useState(false);
    const { IDpedido } = useParams();

    const [pedidoAtual, setPedidoAtual] = useState([])
    const [produtosPedido, setprodutosPedido] = useState([])

    async function getAccount() {
        setLoading(true)
        try {
            await account.get().then((r) => {
                databases.getDocument(
                    "65490ef281a42a311fd4",
                    "654c3f326781694c82c3",
                    r.$id
                ).then((response) => {
                    setUserlogged(response)
                })

            })
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            return window.location.href = window.location.origin + "/accounts/login"

        }
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

    useEffect(() => {
        getAccount()
    }, [])

    function c() {
        window.document.title = "COM TODO RESPEITO: Pedido"
    }

    useEffect(() => {
        c()
    })



    async function getDataOrders() {
        try {

            await databases.getDocument(
                "65490ee5d6bbf552ae2b",
                "655a6bdb86d42ae38138",
                IDpedido
            ).then(async (response) => {
                setPedidoAtual(response);
                await databases.listDocuments(
                    "65490ee5d6bbf552ae2b",
                    "655a6dcb1a7ac8089e51",
                    [
                        Query.equal('UID_ORDER', IDpedido)
                    ]
                ).then(products => {
                    setprodutosPedido(
                        products.documents.map((product, id) => {
                            return (
                                <div id={"ORDERITEM_" + IDpedido + "-" + id} className="OrderContent-order-product--wrap">
                                    <div className="OrderContent-order-product--wrap--image">
                                        <img src={product.product_image_show} />
                                    </div>
                                    <div className="OrderContent-order-product--wrap--content">
                                        <h3>{product.product_name}</h3>
                                        <p>Cor: <span>{product.product_color}</span></p>
                                        <p>Tamanho: <span>{product.product_size}</span></p>
                                        {product.product_desconto > 0 ?
                                            <p><s>R${(product.product_price).toFixed(2)}</s> R${(product.product_price - product.product_desconto).toFixed(2)}</p>
                                            :
                                            <p>R$ {(product.product_price - product.product_desconto).toFixed(2)}</p>
                                        }

                                    </div>
                                </div>
                            )
                        })
                    )
                })
            })


        }
        catch (error) {

        }
    }

    useEffect(() => {
        getDataOrders()
    }, [userLogged])


    return (
        <>
            {Loading ? <LoadingWrapper /> : null}
            <Header />
            <section className="MyAccount-Show-Page-styled">
                <Navigation />
                <main className="MainPageSelected">
                    <section className="topPage-State-Order">
                        <div className="theBox-Package">
                            <div className="StateOrder">
                                <div className="Order_Stage">
                                    <p><i className="fa-solid fa-spinner"></i></p>
                                </div>
                                <div className="Order_Stage">
                                    <p><i class="fa-solid fa-truck-ramp-box"></i></p>
                                </div>
                                <div className="Order_Stage">
                                    <p><i className="fa-solid fa-truck-fast"></i></p>
                                </div>
                                <div className="Order_Stage">
                                    <p><i className="fa-solid fa-circle-check"></i></p>
                                </div>
                            </div>
                        </div>
                        <div className="Order_Stage_Bottom">
                            <div className="line_stage_bottom"></div>
                            <div className="line-show-progress" id={
                                pedidoAtual.order_situation == "Processando" 
                                ?
                                'STAGE0'
                                :
                                pedidoAtual.order_situation == "Preparando"
                                ?
                                'STAGE1'
                                :
                                pedidoAtual.order_situation == "Entrega"
                                ?
                                'STAGE2'
                                :
                                pedidoAtual.order_situation == "Finalizado"
                                ?
                                'STAGE3'
                                :
                                null
                                }></div>
                        </div>
                        <div className="StateOrder">
                            <div className="Order_Stage">
                                <p>Processando</p>
                            </div>
                            <div className="Order_Stage">
                                <p>Preparando seu pedido</p>
                            </div>
                            <div className="Order_Stage">
                                <p>Saiu para entrega</p>
                            </div>
                            <div className="Order_Stage">
                                <p>Pedido finalizado</p>
                            </div>
                        </div>

                    </section>
                    <section className="Order-User-ShowContent">
                        <div className="Order-User-Profile-Image">
                            <img src={''} />
                        </div>
                        <div className="Order-User-Profile-Content">
                            <h2>{pedidoAtual.user_nome}</h2>
                            <p>{pedidoAtual.user_email}</p>
                        </div>
                    </section>

                    <h4>Endereço De Entrega</h4>

                    <section className="Order-Address-ShowContent">
                        <h3>{pedidoAtual.adress_destinatario}</h3>
                        <p>{pedidoAtual.adress} {pedidoAtual.adress_numero}</p>
                        <p>{pedidoAtual.adress_bairro}</p>
                        <p>{pedidoAtual.adress_cidade} - {pedidoAtual.adress_estado}</p>
                    </section>
                    <h4>Resumo do pedido</h4>
                    <section className="Order-Content-Resume">
                        <ul className="Order-Content-Show-Resume--items">
                            {produtosPedido}
                        </ul>
                    </section>
                </main>
            </section>
        </>
    )
}