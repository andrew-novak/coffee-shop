import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Typography, Button, Box } from "@mui/material";
// RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";

import getProduct from "actions/getProduct";
import setCartProductQuantity from "actions/setCartProductQuantity";
import removeProductFromCart from "actions/removeProductFromCart";
import Screen from "components/Screen";
import QuantityInput from "components/QuantityInput";
import getMediaFileUrl from "helpers/getMediaFileUrl";
import formatPrice from "helpers/formatPrice";

const HomeScreen = ({
  product,
  cart,
  getProduct,
  setCartProductQuantity,
  removeProductFromCart,
}) => {
  const params = useParams();
  const productId = parseInt(params.productId);
  const theme = useTheme();
  const foundProduct = cart.find((product) => product.id === productId);
  console.log("foundProduct:", foundProduct);
  const isAlreadyInCart = foundProduct !== undefined;
  const [quantity, setQuantity] = useState(
    foundProduct ? foundProduct.quantity : "0"
  );

  useEffect(() => {
    getProduct(productId);
  }, [getProduct, productId]);

  const isMobileScreen = useMediaQuery("(max-width:900px)");

  return (
    <Screen maxWidth="lg">
      {/* Image Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobileScreen && "column",
          alignItems: "flex-start",
          width: "100%",
          //backgroundColor: "white",
        }}
      >
        {product.id && (
          <div
            style={{
              width: isMobileScreen ? "100%" : "100%",
              maxWidth: 1000,
              //
              height: "100%",
              backgroundColor: "pink",
            }}
          >
            <Box
              sx={{
                paddingTop: theme.custom.heightPercentRatios["1:1"],
                backgroundImage: `url(${getMediaFileUrl(
                  product.id,
                  product.mediaFilenames[0]
                )})`,
                backgroundSize: "cover",
                boxShadow: 2,
              }}
            />
          </div>
        )}
        {/* Text & Button Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            //paddingTop: isMobileScreen && "24px",
            //paddingLeft: !isMobileScreen && "24px",
            padding: "24px",
            paddingTop: "48px",
            paddingBottom: "48px",
            //justifyContent: "center",
            backgroundColor: "white",
            boxShadow: 2,
          }}
        >
          {/* <h1>Product ID: {productId}</h1> */}
          <Typography variant="h2" style={{ fontSize: 40, paddingBottom: 24 }}>
            {product.title}
          </Typography>
          <Typography
            variant="h3"
            align="left"
            style={{ fontSize: 28, paddingBottom: 24, fontWeight: 500 }}
          >
            {formatPrice(product.price)}
          </Typography>
          <Typography style={{ fontSize: 22, paddingBottom: 36 }}>
            {product.description}
          </Typography>
          {!isAlreadyInCart && (
            <Button
              variant="contained"
              style={{ boxShadow: 0, elevation: 0 }}
              onClick={() => {
                setQuantity(1);
                setCartProductQuantity(cart, productId, 1);
              }}
            >
              Add to cart
            </Button>
          )}
          {isAlreadyInCart && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              {/* Quantity Edition */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{ fontSize: 16, color: "rgba(0, 0, 0, 0.66)" }}
                >
                  Quantity:
                </Typography>
              </div>
              <QuantityInput
                value={quantity}
                style={{
                  paddingBottom: 16,
                }}
                onChange={(newQuantity) => {
                  // update component state
                  setQuantity(newQuantity);
                  // update cart
                  if (isAlreadyInCart && newQuantity > 0) {
                    setCartProductQuantity(cart, productId, newQuantity);
                  }
                  /*
                  // remove product from cart
                  if (isAlreadyInCart && newQuantity <= 0) {
                    removeProductFromCart(cart, productId);
                  }
                  */
                }}
              />
              {/*
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 16,
                  gap: 4,
                }}
              >
                <IconButton
                  onClick={() => {
                    const newQuantity = quantity + 1;

                    if (newQuantity < 0 || newQuantity > 20) return;

                    setQuantity(newQuantity);

                    if (isAlreadyInCart && newQuantity > 0) {
                      // update cart as well
                      setCartProductQuantity(cart, productId, newQuantity);
                    }

                    if (isAlreadyInCart && newQuantity <= 0) {
                      // remove product from cart
                      removeProductFromCart(cart, productId);
                    }
                  }}
                >
                  <AddIcon style={{ fontSize: 32 }} />
                </IconButton>
                <Typography
                  style={{
                    fontSize: 20,
                    padding: "14px",
                    border: "1px solid",
                    borderColor: "rgba(0, 0, 0, 0.23)",
                    borderRadius: 4,
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => {
                    const newQuantity = quantity - 1;

                    if (newQuantity < 0 || newQuantity > 20) return;

                    setQuantity(newQuantity);

                    if (isAlreadyInCart && newQuantity > 0) {
                      // update cart as well
                      setCartProductQuantity(cart, productId, newQuantity);
                    }

                    if (isAlreadyInCart && newQuantity <= 0) {
                      // remove product from cart
                      removeProductFromCart(cart, productId);
                    }
                  }}
                >
                  <RemoveIcon style={{ fontSize: 32 }} />
                </IconButton>
              </div>
              */}
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={() => removeProductFromCart(cart, productId)}
              >
                Remove from cart
              </Button>
            </div>
          )}
        </Box>
      </div>
    </Screen>
  );
};

const mapState = (state) => {
  const { cart, product } = state;
  return { cart, product };
};

export default connect(mapState, {
  getProduct,
  setCartProductQuantity,
  removeProductFromCart,
})(HomeScreen);
