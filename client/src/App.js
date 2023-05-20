import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./components/Home/Home";
import Purchase from "./components/Purchase/Purchase";
import AddProduct from "./components/AddProduct/AddProduct";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import DetailPurchase from "./components/Purchase/DetailPurchase";
import Auth from "./hoc/auth";

function App() {
  const AuthHome = Auth(Home, null);
  const AuthAddProduct = Auth(AddProduct, true);

  const [purchaseCard, setPurchaseCard] = useState([]);

  const token = localStorage.getItem("accessToken");
  console.log(!!token ? true : false, localStorage.getItem("accessToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  const addProductHandler = (pName, pPrice, pImg, pExplanation) => {
    setPurchaseCard((prevPurchaseCard) => {
      return [
        ...prevPurchaseCard,
        {
          name: pName,
          price: pPrice,
          imgFile: pImg,
          explanation: pExplanation,
          id: Math.random().toString(),
        },
      ];
    });
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<AuthHome />}></Route>
          <Route
            path="/Purchase/"
            element={<Purchase purchaseCard={purchaseCard} />}
          ></Route>
          <Route
            path="/AddProduct/"
            element={<AuthAddProduct onAddProduct={addProductHandler} />}
          ></Route>
          <Route
            path="/Login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          ></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route
            path="/DetailPurchase/:id"
            element={<DetailPurchase purchaseCard={purchaseCard} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
