import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

export const LayoutMain = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
