import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { account, databases } from "../../lib/appwrite";
import Navigation from "../../components/Accounts/Navigation";
import { Query } from "appwrite";

export default function MyAccountOrders() {

    const [userLogged, setUserlogged] = useState(null);
    const [Loading, setLoading] = useState(false);

    const [AllOrders, setAllOrders] = useState([]);
    const [RecentOrders, setRecentOrders] = useState([]);

    const [productList, setProductList] = useState({})


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

    async function g_tOD() {
        setLoading(true)
        try {
            const orders = await databases.listDocuments(
                "65490ee5d6bbf552ae2b",
                "655a6bdb86d42ae38138",
                [
                    Query.equal("user_id", userLogged.$id),
                    Query.orderDesc("$createdAt"),
                    Query.limit(100)
                ]
            );

            const ordersWithPreviews = await Promise.all(
                orders.documents.map(async (order) => {
                    const products = await databases.listDocuments(
                        "65490ee5d6bbf552ae2b",
                        "655a6dcb1a7ac8089e51",
                        [
                            Query.equal("UID_ORDER", order.$id),
                            Query.orderDesc("$createdAt"),
                            Query.limit(1)
                        ]
                    );

                    const previewImage = products.documents.length > 0 ? products.documents[0].product_image_show : null;
                    return {
                        order,
                        previewImage
                    };
                })
            );

            setRecentOrders(
                ordersWithPreviews.map(({ order, previewImage }) => (
                    <div className="PreviewOrderUpside" key={`orderid-${order.$id}`}>
                        <Link to={`/accounts/myaccount/orders/${order.$id}`}>
                            {previewImage && <img src={previewImage} alt="Preview" />}
                        </Link>
                    </div>
                ))

            )

            setAllOrders(
                ordersWithPreviews.map(({ order, previewImage }) => (
                    <div className="Order--item" key={`orderid-${order.$id}`}>
                        <Link to={`/accounts/myaccount/orders/${order.$id}`}>
                            <li className="UserOrders_ContentOrder">
                                <div className="OrderContent--photo">
                                    {previewImage && <img src={previewImage} alt="Preview" />}
                                </div>
                                <div className="UserOrders_ContentOrder--item-wrapper">
                                    <div className="situationtop">
                                        <label className="Order_State">
                                            {order.order_situation === "Entrega"
                                                ?
                                                <span id="produtoacaminho"><i className="fa-solid fa-truck-fast"></i> O pedido está a caminho</span>
                                                :
                                                <>
                                                    {order.order_situation == "Finalizado"
                                                        ?
                                                        <span id="produtofinalizado"><i className="fa-solid fa-check"></i> Pedido finalizado</span>
                                                        :
                                                        <span><i className="fa-solid fa-box"></i> {order.order_situation}</span>
                                                    }
                                                </>}
                                        </label>
                                    </div>
                                    <p>ID DO PEDIDO: #{order.$id}</p>
                                    <div className="OrderContent-iitem-rightside">
                                        <p>{order.user_nome}</p>
                                        <p>TOTAL: R${order.order_totalprice.toFixed(2)}</p>
                                    </div>
                                    <div className="btns-wrapper-button">
                                        <div className="OrderBtn-Wrap">
                                            <button className="ButtonWrapper">
                                                <span>AJUDA</span>
                                            </button>
                                        </div>
                                        <div className="OrderBtn-Wrap">
                                            <button className="ButtonWrapper">
                                                <span>DETALHES</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </div>
                ))
            );
            setLoading(false)
        } catch (error) {
            // Trate o erro de alguma maneira, se necessário
            setLoading(false)
        }
    }



    useEffect(() => {
        g_tOD()

    }, [userLogged])

    function c() {
        window.document.title = "COM TODO RESPEITO: Meus pedidos"
    }

    useEffect(() => {
        c()
    }, [])



    return (
        <>
            {Loading ? <LoadingWrapper /> : null}
            <Header />
            <section className="MyAccount-Show-Page-styled">
                <Navigation />
                <main className="MainPageSelected">

                    {AllOrders == ""
                        ?
                        <div className="empty-Orders">
                            {Loading ?
                                null
                                :
                                <>
                                    <img src={window.location.origin + "/arquivos/undraw_empty_re_opql.svg"} />
                                    <h2>Um vazio incomodativo...</h2>
                                    <p>Não foi encontrado nenhum pedido</p>
                                    <button onClick={() => { window.location.href = window.location.origin }} className="button-buy-items"><span>FAZER UMAS COMPRAS</span></button>
                                </>
                            }


                        </div>
                        :
                        <>
                            <h1>Pedidos</h1>
                            <p>Veja todos os seus pedidos realizados.</p>
                            <div className="MainOrdersUser">
                                <div className="TopRecentOrders">
                                    {RecentOrders}
                                </div>

                                <div className="spacerHeader">
                                    <h3>Todos os pedidos: </h3>
                                </div>
                                <ul>

                                    {AllOrders}
                                </ul>
                            </div>
                        </>
                    }

                </main>
            </section>
        </>
    )
}