import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getShippingAddress, listCartItems } from "../actions/cartActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCartItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getShippingAddress(1))
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {productList ? (
        productList.loading ? (
          <Loader />
        ) : productList.products ? (
          <Row>
            {productList.products.map((product) => {
              return (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Message variant="danger">{productList.error}</Message>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeScreen;
