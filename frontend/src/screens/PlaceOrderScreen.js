import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ButtonGroup,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const PlaceOrderScreen = ({ paymentMethod }) => {
  const navigate = useNavigate();

  const allProducts = useSelector((state) => state.productList.products);
  const cartDetails = useSelector((state) => state.cartDetails);
  const cartItems = useSelector((state) => state.cartDetails.cartItems);
  const shippingAddress = useSelector(
    (state) => state.cartDetails.shippingAddress
  );

  const [allCartProducts, setAllCartProducts] = useState([]);

  // //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const placeOrderHandler = () => {
    console.log("Order Placed!");
  };

  useEffect(() => {
    if (allProducts.length == 0) navigate("/");
  }, []);

  useEffect(() => {
    let array = [];
    cartItems.forEach((item) => {
      allProducts.forEach((product) => {
        if (product.id == item.productId) {
          let temp = {
            ...product,
            productQuantity: item.productQuantity,
          };
          array.push(temp);
        }
      });
    });
    setAllCartProducts(array);
  }, [cartItems]);

  const itemsPrice = allCartProducts.reduce(
    (acc, item) => acc + item.price * item.productQuantity,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 100;
  const taxPrice = Number((0.1 * itemsPrice));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  );

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="my-3">
              <h2>Shipping</h2>
              <p>
                <strong style={{fontWeight:"bold"}}>Address: </strong>
                {shippingAddress.street}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="my-3">
              <h2>Payment Method</h2>
              <strong style={{fontWeight:"bold"}}>Method: </strong>
              cart.paymentMethod
            </ListGroup.Item>

            <ListGroup.Item className="my-3">
              <h2>Order Items</h2>
              {allCartProducts.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {allCartProducts.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4} lg={5}>
                          {item.productQuantity} x{" "}
                          {item.price.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "INR",
                          })}{" "}
                          = {(item.productQuantity * item.price).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                              style: "currency",
                              currency: "INR",
                            }
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{itemsPrice.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "INR",
                          })}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{shippingPrice.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "INR",
                          })}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{taxPrice.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "INR",
                          })}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{totalPrice.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "INR",
                          })}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {cartDetails.error && (
                  <Message variant="danger">{cartDetails.error}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
