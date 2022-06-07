import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState([]);
    let componentMounted = true;

    // Api calling
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products")
            // .then((response) => response.json())
            // .then(data => console.log(data))
            // console.log(response.json());

            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                
            }
            
            return () => {
                componentMounted = false;
            }
        }
        
        getProducts();
       
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                    <Skeleton height={350} />
                </div>
            </>
        );
    }

    // search filter
    // var onChangeHandler = (text) => {
    //     setText(text)
    // }

    // if (text.length > 0) {
    //     const matches = getProducts.filter(product => {
    //         const regex = new RegExp(`${text}`, "gi");
    //         return product.title.match(regex)
    //     })
    // }

    // setSuggestions(matches)
    // let onChangeHandler = (text) => {
    // let matches = []
    // if (text.length > 0) {
    // matches = product.filter(user => {
    // const regex = new RegExp(`${text}`, "gi");
    // return product.title.match(regex)
    // })
    // }
    // setSuggestions(matches)
    // setText(text)
    // }


    // Filter method
    const filterProduct = (element) => {
        const updatedList = data.filter((value) => value.category === element);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                {/* Filtered products categories using buttons */}
                <div className="buttons mb-s pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewelery <i className="fa fa-angle-double-right"></i></button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronic <i className="fa fa-angle-double-right"></i></button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            {/* Products list */}
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                                        <p className="card-text lead fw-bold">${product.price}</p>
                                        <NavLink to={`/products/${product.id}`} className="btn btn-primary">Add to Basket</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )

    }
    return (
        <div>
            <div className="container my-pdp">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center mt-5">Trending Products</h1>
                        
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}

                </div>
            </div>
        </div>
    )
}

export default Products