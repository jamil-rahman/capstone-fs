import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Trivia from "./Trivia";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const Body = () => {
  return (
    <>
        <Header />
        {/* <div className="main-content"> */}
            <Container>
                <Outlet />
            </Container>
        {/* </div> */}
        <Trivia/>
        <Footer />
    </>
  );
};

export default Body;
