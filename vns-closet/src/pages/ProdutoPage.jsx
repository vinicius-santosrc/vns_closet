import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { databases } from "../lib/appwrite";
import { useEffect, useState } from "react";
import { ID, Query } from "appwrite";
import Swal from 'sweetalert2';

export default function ProdutoPage() {

    const [Product, setProduct] = useState({});
    const [MoreProducts, setMoreProducts] = useState([]);
    const [Loading, setLoading] = useState(false);

    const [Tamanho, setTamanho] = useState(null);
    const [Cor, setCor] = useState(null);

    const DB = "65490ef281a42a311fd4";
    const Produtos = "65490ef9461967e20b04";
    const PRODUTO_NOME = useParams();

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

    async function getMoreProducts() {
        try {
            databases.listDocuments(
                DB,
                Produtos,
                [
                    Query.limit(4),
                    Query.orderDesc("$createdAt"),
                ]
            )
                .then((res) => {
                    setMoreProducts(res.documents.map((produto) => {
                        let disp
                            if(produto.disponibilidade) {
                                if(produto.Encomenda) {
                                    disp = 'encomenda'
                                }
                                else {
                                    disp = 'disponivel'
                                }
                            }
                            else {
                                disp = 'indisponivel'
                            }
                            return (
                                <Link to={window.location.origin + "/produtos/" + produto.url}>
                                    <div className="item-card">
                                        <div className="marca-top">
                                            <label></label>
                                        </div>
                                        <div className="item-inside">
                                            <img src={produto.fotos.length > 0 ? produto.fotos[0] : produto.fotos} alt="" />
                                            <h2 className={disp}>{produto.disponibilidade ? <>{produto.Encomenda ? 'Encomenda' : "Disponível"}</> : "Esgotado"}</h2>
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


                })
        }
        catch (error) {
            console.log(error)
        }
    }

    async function getCurrentProduct() {

        try {
            setLoading(true)
            databases.listDocuments(
                DB,
                Produtos,
                [
                    Query.limit(200),
                    Query.equal("url", PRODUTO_NOME.PRODUTO_NOME)
                ]
            )
                .then((res) => {
                    setLoading(false)
                    res.documents.map((resp) => {
                        setProduct(resp)

                    })


                })
        }
        catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    function changePageName() {
        if (Product.url) {
            document.title = Product.nome + ' COM TODO RESPEITO';
        }
    }

    useEffect(() => {
        getCurrentProduct()
    }, [])

    useEffect(() => {
        changePageName()
    })

    useEffect(() => {
        getMoreProducts()
    }, [Product])

    async function AddProductSacola() {
        // Verifique se a chave "s-vns-closet-fstorage-bagsc" já existe no localStorage
        const storedProducts = localStorage.getItem("s-vns-closet-fstorage-bagsc");

        // Se a chave já existe, parse o valor para um array
        let products = storedProducts ? JSON.parse(storedProducts) : [];

        products.push({
            name: Product.nome,
            foto: Product.fotos[0],
            price: Product.price,
            desconto: Product.desconto,
            tamanho: Tamanho,
            cor: Cor
        });

        try {
            // Armazene o array atualizado no localStorage
            if (Cor && Tamanho) {
                localStorage.setItem("s-vns-closet-fstorage-bagsc", JSON.stringify(products));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Você adicionou " + Product.nome + " na sacola.",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTamanho(null);
                setCor(null)
            }
            else {
                return Swal.fire({
                    title: "ERRO!",
                    text: "Por favor, selecione o tamanho e a cor do produto.",
                  });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            {Loading
                ?
                <LoadingWrapper />
                :
                <>
                    {Product.url
                        ?
                        <>
                            <section className="Product-Wrapper-Page-Show">
                                <div className="Product-Photos-Show">
                                    <div className="Product-Caminho-URL">
                                        <span><Link to={window.location.origin}><i className="fa-solid fa-chevron-left"></i> VNS-CLOSET</Link> / <Link to={window.location.origin + "/" + (Product.type).toLowerCase()}>{(Product.type).toUpperCase()}</Link> / {(Product.nome).toUpperCase()} </span>
                                    </div>
                                    {Product.fotos.length < 1 ?
                                        <img className="pictureMain" src={Product.fotos} />
                                        :
                                        <>{
                                            Product.fotos.map((foto, index) => {
                                                if (index == 0) {
                                                    return (
                                                        <img className="pictureMain" src={foto} />
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <img className="pictureSecondary" src={foto} />
                                                    )
                                                }
                                            })}
                                        </>}
                                    <section className="MoreProducts-Show-Bottom pc-bottom">
                                        <h1>DEIXE SEU ESTILO TOP</h1>
                                        <p>Veja mais produtos similares para você</p>
                                        <div className="Products-Show-Bottom-Pg">
                                            <div className="items-show-top-side">
                                                {MoreProducts}

                                            </div>

                                        </div>
                                    </section>
                                </div>
                                <div className="Product-Details-RightSide">
                                    <div className="Product-Inside-Details-Fixed">
                                        <h5>VNS-CLOSET * {Product.gender}</h5>
                                        <div className="Product-Name-Show">
                                            <h2>{Product.nome}</h2>
                                        </div>
                                        <div className="Product-Price-Show">
                                            {Product.desconto > 0 ?
                                                <>
                                                    <p><s className="desconto">R${(Product.price).toFixed(2)}</s> <span className="priceatual">R${(Product.price - Product.desconto).toFixed(2)}</span> ou </p>
                                                    <p>R${((Product.price - Product.desconto) * 0.95).toFixed(2)} <span className="greenoff">%5 off pagando pelo Pix.</span></p>
                                                </>
                                                :
                                                <>
                                                    <p>R${(Product.price - Product.desconto).toFixed(2)} ou </p>
                                                    <p>R${((Product.price - Product.desconto) * 0.95).toFixed(2)} <span className="greenoff">%5 off no Pix.</span></p>
                                                </>
                                            }
                                        </div>
                                        <div className="Product-Sizes-Show">
                                            <h3>Cores:</h3>
                                            <div className="Product-Sizes-Content">
                                                {Product.colors.length < 1 ?
                                                    <div className="Button-Wrapper-Product-Size">
                                                        <button onClick={() => { setCor(Product.colors) }} className={Cor == Product.colors ? "Product-Size-Btn-Wrapper Product-Size-Btn-Wrapper-Selected" : "Product-Size-Btn-Wrapper"}><span>{Product.colors}</span></button>
                                                    </div>
                                                    :
                                                    <>{Product.colors.map((s) => {
                                                        return (
                                                            <div className="Button-Wrapper-Product-Size">
                                                                <button onClick={() => { setCor(s) }} className={Cor == s ? "Product-Size-Btn-Wrapper Product-Size-Btn-Wrapper-Selected" : "Product-Size-Btn-Wrapper"}><span>{s}</span></button>
                                                            </div>
                                                        )
                                                    })}</>
                                                }
                                            </div>
                                        </div>
                                        <div className="Product-Sizes-Show">
                                            <h3>Tamanho:</h3>
                                            <div className="Product-Sizes-Content">
                                                {Product.sizes.length < 1 ?
                                                    <div className="Button-Wrapper-Product-Size">
                                                        <button onClick={() => { setTamanho(Product.sizes) }} className={Tamanho == Product.sizes ? "Product-Size-Btn-Wrapper Product-Size-Btn-Wrapper-Selected" : "Product-Size-Btn-Wrapper"}><span>{Product.sizes}</span></button>
                                                    </div>
                                                    :
                                                    <>{Product.sizes.map((s) => {
                                                        return (
                                                            <div className="Button-Wrapper-Product-Size">
                                                                <button onClick={() => { setTamanho(s) }} className={Tamanho == s ? "Product-Size-Btn-Wrapper Product-Size-Btn-Wrapper-Selected" : "Product-Size-Btn-Wrapper"}><span>{s}</span></button>
                                                            </div>
                                                        )
                                                    })}</>
                                                }
                                            </div>
                                        </div>
                                        {Product.disponibilidade ?
                                            <div className="Product-Buttons-Show">
                                                <div className="Button-Wrapper-Add-Sacola">
                                                    <button onClick={AddProductSacola} className="ButtonInnerWrapperProduct">
                                                        <span>ADICIONAR A SACOLA</span>
                                                    </button>
                                                </div>
                                                <div className="Button-Wrapper-Favorite">
                                                    <button className="ButtonInnerWrapperProduct">
                                                        <span><i className="fa-regular fa-heart"></i></span>
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            <div className="Product-Buttons-Show">
                                                <div className="Button-Wrapper-Add-Sacola">
                                                    <button className="ButtonInnerWrapperProduct">
                                                        <span>INDISPONÍVEL</span>
                                                    </button>
                                                </div>
                                            </div>}

                                        <div className="BoxInnerProduct share">
                                            <p>Compartilhe: <Link to={"https://wa.me/?text=" + Product.nome + "%0D" + window.location.href} target="_blank"><i className="fa-brands fa-square-whatsapp"></i></Link></p>
                                        </div>

                                        <div className="BoxInnerProduct devolution">
                                            <p>DEVOLUÇÕES GRATUITAS. NÃO SERVIU? DEVOLVA EM UM PRAZO DE 7 DIAS.</p>
                                        </div>
                                    </div>
                                    <section className="MoreProducts-Show-Bottom mobile-bottom">
                                        <h1>DEIXE SEU ESTILO TOP</h1>
                                        <p>Veja mais produtos similares para você!</p>
                                        <div className="Products-Show-Bottom-Pg">
                                            <div className="items-show-bottom">
                                                {MoreProducts}

                                            </div>

                                        </div>
                                    </section>
                                </div>
                            </section>

                        </>

                        :
                        <div className="ERROR_404_NOTFOUND">
                            <h1>OOPS...</h1>
                            <p>A página que você estava buscando não foi encontrada.</p>
                            <div className="button-backstart">
                                <Link to={window.location.origin}>Voltar a página inicial</Link>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}