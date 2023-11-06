export default function ProdutosShow() {
    return (
        <section className="Filters-Wrapper-Show-flex-box filters-show">
            <div className="filters-show-leftside">
                <div className="filterbox">
                    <h2>Cores</h2>
                    <div className="filteroption">
                        <input type="checkbox" /><span>Branca</span>
                    </div>
                    <div className="filteroption">
                        <input type="checkbox" /><span>Preta</span>
                    </div>
                </div>
                <div className="filterbox">
                    <h2>Preço</h2>
                    <div className="filterbox-inside">
                        <div className="filteroption">
                            <input type="checkbox" /><span>Até R$ 50</span>
                        </div>
                        <div className="filteroption">
                            <input type="checkbox" /><span>R$ 50 - R$ 100</span>
                        </div>
                        <div className="filteroption">
                            <input type="checkbox" /><span>R$ 100 - R$ 200</span>
                        </div>

                    </div>
                </div>
                <div className="filterbox">
                    <h2>Marcas</h2>
                    <div className="filterbox-inside">
                        <div className="filteroption">
                            <input type="checkbox" /><span>Nike</span>
                        </div>
                        <div className="filteroption">
                            <input type="checkbox" /><span>Adidas</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="items-show-top-side">
                <a href="${items.url}">
                    <div class="item-card">
                        <div class="marca-top">
                            <label></label>
                        </div>
                        <div class="item-inside">
                            <img src="https://imgnike-a.akamaihd.net/360x360/025194ID.jpg" alt="" />
                            <h2 class="type class${estadodoitem}">Novo</h2>
                            <p class="name-item">Camiseta Nike </p>
                            <p class="price-item">R$ 152,00</p>
                            
                        </div>
                    </div>
                </a>
                <a href="${items.url}">
                    <div class="item-card">
                        <div class="marca-top">
                            <label></label>
                        </div>
                        <div class="item-inside">
                            <img src="https://imgnike-a.akamaihd.net/360x360/025194ID.jpg" alt="" />
                            <h2 class="type class${estadodoitem}">Novo</h2>
                            <p class="name-item">Camiseta Nike </p>
                            <p class="price-item">R$ 152,00</p>
                            
                        </div>
                    </div>
                </a>
                <a href="${items.url}">
                    <div class="item-card">
                        <div class="marca-top">
                            <label></label>
                        </div>
                        <div class="item-inside">
                            <img src="https://imgnike-a.akamaihd.net/360x360/025194ID.jpg" alt="" />
                            <h2 class="type class${estadodoitem}">Novo</h2>
                            <p class="name-item">Camiseta Nike </p>
                            <p class="price-item">R$ 152,00</p>
                            
                        </div>
                    </div>
                </a>
                <a href="${items.url}">
                    <div class="item-card">
                        <div class="marca-top">
                            <label></label>
                        </div>
                        <div class="item-inside">
                            <img src="https://imgnike-a.akamaihd.net/360x360/025194ID.jpg" alt="" />
                            <h2 class="type class${estadodoitem}">Novo</h2>
                            <p class="name-item">Camiseta Nike </p>
                            <p class="price-item">R$ 152,00</p>
                            
                        </div>
                    </div>
                </a>
                <a href="${items.url}">
                    <div class="item-card">
                        <div class="marca-top">
                            <label></label>
                        </div>
                        <div class="item-inside">
                            <img src="https://imgnike-a.akamaihd.net/360x360/025194ID.jpg" alt="" />
                            <h2 class="type class${estadodoitem}">Novo</h2>
                            <p class="name-item">Camiseta Nike </p>
                            <p class="price-item">R$ 152,00</p>
                            
                        </div>
                    </div>
                </a>
                <a href="${items.url}">
                    <div class="item-card">
                        <div class="marca-top">
                            <label></label>
                        </div>
                        <div class="item-inside">
                            <img src="https://imgnike-a.akamaihd.net/360x360/025194ID.jpg" alt="" />
                            <h2 class="type class${estadodoitem}">Novo</h2>
                            <p class="name-item">Camiseta Nike </p>
                            <p class="price-item">R$ 152,00</p>
        
                        </div>
                    </div>
                </a>


            </div>

        </section>
    )
}