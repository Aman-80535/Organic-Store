import { Avatar, Box, Button, Checkbox, Grid, InputLabel, Rating, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReview, fetchSingleProduct } from "../slices/singleProduct";
import { addToCart } from "../slices/cartSlice";
import { FaRupeeSign, FaWhatsapp } from "react-icons/fa";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
import { addToWishlist } from "../slices/wishListSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
//   }

const SingleProduct = () => {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { user } = useSelector((state) => state.userState)
  const [value, setValue] = React.useState(0);
  const { id } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchSingleProduct({ id }));
  }, [id]);

  const owner_phone_number = 1234567890

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login")
    } else {
      dispatch(
        addToCart({
          token: user.token,
          productdata: {
            productId: product?._id,
            name: product?.name,
            image: product?.image,
            price: product?.price,
            qty: qty,
            discount: product?.discount,
          },
        })
      );
    }

  };
  const handleAddToWishlist = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login")
    } else {
      dispatch(
        addToWishlist({
          token: user.token,
          productdata: {
            productId: product?._id,
            name: product?.name,
            image: product?.image,
            price: product?.price,
            discount: product?.discount,
          },
        })
      );
    }

  };

  const handleAddReview = () => {
    if (!user || !message || !rating) {
      return
    }
    else {
      dispatch(addReview({
        productId: product._id,
        message,
        rating,
        token: user.token
      }))
      setMessage("")
      setRating(0)
    }
  }




  return (
  <Box
  sx={{
    py: {
      xs: "40px",
      md: "60px",
      lg: "80px",
    },

    px: {
      xs: "16px",
      sm: "20px",
      lg: 0,
    },

    bgcolor: "#f8f6f3",
  }}
>
  <Box maxWidth="1200px" mx="auto">
    
    {/* PRODUCT SECTION */}
    <Grid
      container
      spacing={{
        xs: 4,
        md: 6,
      }}
      alignItems="center"
    >
      
      {/* IMAGE */}
      <Grid item xs={12} md={5} lg={6}>
        <Box
          component="img"
          src={product?.image}
          alt={product?.name}
          sx={{
            width: "100%",

            maxWidth: {
              xs: "100%",
              md: "550px",
            },

            height: {
              xs: "300px",
              sm: "450px",
              md: "550px",
            },

            objectFit: "contain",
            display: "block",
            mx: "auto",
          }}
        />
      </Grid>

      {/* CONTENT */}
      <Grid item xs={12} md={7} lg={6}>
        
        {/* TITLE */}
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: "28px",
              sm: "36px",
              md: "42px",
            },

            lineHeight: 1.2,
          }}
        >
          {product?.name}
        </Typography>

        {/* PRICE */}
        <Box
          display="flex"
          alignItems="center"
          gap="5px"
          mt={3}
          flexWrap="wrap"
        >
          <Typography
            variant="h3"
            fontWeight="700"
            color="#333"
            fontFamily="'Open Sans', sans-serif"
            sx={{
              fontSize: {
                xs: "24px",
                md: "30px",
              },
            }}
          >
            <FaRupeeSign
              style={{
                marginTop: "5px",
                fontSize: "18px",
              }}
            />
            {product?.price}
          </Typography>

          <Typography variant="body1">
            + Free Shipping
          </Typography>
        </Box>

        {/* DESCRIPTION */}
        <Box
          mt={3}
          sx={{
            fontSize: {
              xs: "14px",
              md: "16px",
            },
          }}
        >
          {product?.description}
        </Box>

        {/* CART SECTION */}
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          mt={4}
          borderBottom="1px solid #e2e2e2"
          pb="25px"
        >
          
          {/* QUANTITY + BUTTONS */}
          <Box
            display="flex"
            gap="15px"
            flexWrap="wrap"
            alignItems="center"
          >
            
            {/* COUNTER */}
            <Box
              display="flex"
              alignItems="center"
            >
              <button
                onClick={() => {
                  if (qty > 1) {
                    setQty(qty - 1);
                  }
                }}
                style={{
                  padding: "8px 14px",
                  border: "1px solid #e2e2e2",
                  background: "white",
                }}
              >
                -
              </button>

              <input
                value={qty}
                disabled
                type="number"
                style={{
                  padding: "8px 10px",
                  border: "1px solid lightgray",
                  outline: "none",
                  width: "60px",
                  textAlign: "center",
                }}
              />

              <button
                onClick={() => {
                  if (qty < product?.countInStock) {
                    setQty(qty + 1);
                  }
                }}
                style={{
                  padding: "8px 14px",
                  border: "1px solid #e2e2e2",
                  background: "white",
                }}
              >
                +
              </button>
            </Box>

            {/* ADD TO CART */}
            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={{
                color: "white",
                bgcolor: "green.idle",

                width: {
                  xs: "100%",
                  sm: "auto",
                },

                "&:hover": {
                  bgcolor: "green.main",
                },
              }}
            >
              ADD TO CART
            </Button>

            {/* WISHLIST */}
            <Button
              onClick={handleAddToWishlist}
              variant="contained"
              sx={{
                color: "white",
                bgcolor: "green.idle",

                width: {
                  xs: "100%",
                  sm: "auto",
                },

                "&:hover": {
                  bgcolor: "green.main",
                },
              }}
            >
              ADD TO WISHLIST
            </Button>
          </Box>

          {/* WHATSAPP BUTTON */}
          <Button
            onClick={() => {
              const url = `https://api.whatsapp.com/send?phone=${owner_phone_number}&text=I'm interested in your ${product?.name} product.`;

              window.open(url, "_blank");
            }}
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "green.idle",

              width: {
                xs: "100%",
                sm: "fit-content",
              },

              "&:hover": {
                bgcolor: "green.main",
              },
            }}
          >
            <FaWhatsapp
              style={{
                fontSize: "20px",
                marginRight: "10px",
              }}
            />

            Buy on WhatsApp
          </Button>
        </Box>

        {/* CATEGORY */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap="5px"
          mt={2}
        >
          <Typography variant="body2">
            Categories :
          </Typography>

          <Link
            to={`/product-category/${product?.category}`}
            style={{
              textDecoration: "none",
              color: "#8bc34a",
            }}
          >
            {product?.category}
          </Link>
        </Box>

        {/* SHARE */}
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          gap="10px"
          mt={4}
          borderBottom="1px solid #e2e2e2"
          pb="20px"
        >
          <Typography variant="body1">
            Share :
          </Typography>

          <FacebookShareButton
            url={window.location.href}
          >
            <FacebookIcon round size={28} />
          </FacebookShareButton>

          <WhatsappShareButton
            url={window.location.href}
            title={product?.name}
          >
            <WhatsappIcon round size={28} />
          </WhatsappShareButton>

          <TwitterShareButton
            url={window.location.href}
          >
            <TwitterIcon round size={28} />
          </TwitterShareButton>
        </Box>
      </Grid>
    </Grid>

    {/* TABS SECTION */}
    <Box mt={6}>
      
      {/* TABS */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",

          overflowX: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Description"
            sx={{
              fontSize: {
                xs: "14px",
                md: "16px",
              },

              fontWeight: "700",
              color: "#515151",

              "&.Mui-selected": {
                color: "#515151",
              },
            }}
          />

          <Tab
            label={`Reviews (${product?.numOfReviews})`}
            sx={{
              fontSize: {
                xs: "14px",
                md: "16px",
              },

              fontWeight: "700",
              color: "#515151",

              "&.Mui-selected": {
                color: "#515151",
              },
            }}
          />
        </Tabs>
      </Box>

      {/* DESCRIPTION TAB */}
      <TabPanel value={value} index={0}>
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: "14px",
              md: "16px",
            },
          }}
        >
          {product?.description}
        </Typography>
      </TabPanel>

      {/* REVIEW TAB */}
      <TabPanel value={value} index={1}>
        
        {/* REVIEWS */}
        {product?.reviews?.length < 1 ? (
          <Typography variant="body1">
            There are no reviews yet.
          </Typography>
        ) : (
          <Box>
            {product?.reviews?.map((review) => (
              <Box
                key={review._id}
                display="flex"
                gap={{
                  xs: "15px",
                  md: "30px",
                }}
                my="20px"
                flexDirection={{
                  xs: "column",
                  sm: "row",
                }}
              >
                <Avatar>
                  {review.username
                    .charAt(0)
                    .toUpperCase()}
                </Avatar>

                <Box>
                  <Typography variant="h4">
                    {review.username}
                  </Typography>

                  <Rating
                    readOnly
                    size="small"
                    value={review.rating}
                  />

                  <Typography mt={1}>
                    Message : {review.message}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* REVIEW FORM */}
        <Box
          border="1px solid #dddddd"
          mt="30px"
          p={{
            xs: "20px",
            md: "30px",
          }}
        >
          <Typography variant="h4">
            {product?.reviews?.length < 1
              ? `Be the First to Review (${product.name})`
              : "Add A Review"}
          </Typography>

          <Typography
            sx={{
              mt: "10px",
              color: "#b3a8a8",
            }}
            variant="subtitle2"
          >
            Your email address will not be published.
            Required fields are marked *
          </Typography>

          {/* RATING */}
          <Box
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            gap="10px"
            my="20px"
          >
            <Typography
              variant="body1"
              fontSize="18px"
            >
              Your rating *
            </Typography>

            <Rating
              value={rating}
              onChange={(e, value) =>
                setRating(value)
              }
            />
          </Box>

          {/* MESSAGE */}
          <Box>
            <Typography
              variant="body1"
              fontSize="18px"
            >
              Your review *
            </Typography>

            <TextField
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="text"
              label="Message"
              multiline
              rows={4}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Box>

          {/* SUBMIT */}
          <Button
            onClick={handleAddReview}
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              bgcolor: "green.idle",

              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </TabPanel>
    </Box>
  </Box>
</Box>
  );
};

export default SingleProduct;
