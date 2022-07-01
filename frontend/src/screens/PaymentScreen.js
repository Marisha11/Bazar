import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      {/* three steps are done in the checkout process */}
      <CheckoutSteps step1 step2 step3 />
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
        }}
      >
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Col>
              <Form.Check
                inline
                type="radio"
                label="Credit/Debit Card"
                id="Credit/Debit Card"
                name="paymentMethod"
                value="Credit/Debit Card"
                checked={paymentMethod === "Credit/Debit Card"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="PayPal Account"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <div className="d-grid">
            <Button
              style={{ textAlign: "center" }}
              type="submit"
              className="mx-5 my-3"
              size="md"
            >
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </FormContainer>
  );
};

export default PaymentScreen;
