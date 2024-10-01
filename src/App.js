import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Basket from './pages/basket/Basket';
import Product from "./pages/product/Product";
import {useDispatch} from "react-redux";
import {getProducts, getSizes} from "./services/api";
import {setProducts} from "./redux/products/products";
import {setSizes} from "./redux/sizes/sizes";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        getProducts().then(resolve => {
            dispatch(setProducts(resolve));
        });

        getSizes().then(resolve => {
            console.log(resolve);
            dispatch(setSizes(resolve))
        });
    }, []);

    return (
    <div>
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/:product_id' element={<Product />} />
        </Routes>
    </div>
    )
}
