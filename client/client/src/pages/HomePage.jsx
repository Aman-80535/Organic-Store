import React from "react";

import Banner from "../components/Banner/Banner";
import { Box, Typography, useMediaQuery } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import RecyclingIcon from "@mui/icons-material/Recycling";
import CustomButton from "../components/Button/Button";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import {
  lemons,
  cauli,
  soya,
  leaf,
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  vertorleaf,

} from "../assets";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const recommendationSection = [
  {
    id: 1,
    title: "Farm Fresh Fruits",
    desc: "Juicy, farm-fresh fruits delivered straight from the orchard to you.",
    bgImage: lemons,
  },
  {
    id: 2,
    title: "Fresh Vegetables",
    desc: "Naturally grown, farm-fresh vegetables for healthy meals and vibrant flavors.",
    bgImage: cauli,
  },
  {
    id: 3,
    title: "Organic Legume",
    desc: "Wholesome, sustainable organic legumes for healthy and eco-friendly meals.",
    bgImage: soya,
  },
];



const RecommendationCard = ({ content }) => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#fff",

        display: "flex",
        flexDirection: "column",

        minHeight: {
          xs: "auto",
          sm: "420px",
          md: "450px",
        },

        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Content */}
      <Box
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          display: "flex",
          flexDirection: "column",
          gap: 2,

          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: {
              xs: "24px",
              sm: "28px",
              md: "32px",
            },
          }}
        >
          {content.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: "14px",
              sm: "15px",
              md: "16px",
            },
          }}
        >
          {content.desc}
        </Typography>

        <CustomButton
          text="Shop Now"
          icon={<FaArrowRight style={{ color: "white" }} />}
        />
      </Box>

      {/* Image */}
      <Box
        component="img"
        src={content.bgImage}
        alt="Image"
        sx={{
          width: "100%",

          height: {
            xs: "220px",
            sm: "260px",
            md: "300px",
          },

          objectFit: "cover",
          mt: "auto",
        }}
      />
    </Box>
  );
};

const FeatureCard = ({ icon, mainText, text }) => {
  return (
    <Box
      display={"flex"}
      flex={1}
      gap={"15px"}
      p={"35px 25px"}
      bgcolor={"#333333"}
    >
      {icon}
      <Box>
        <Typography color="white" variant="h4">
          {mainText}
        </Typography>
        <Typography color="white" variant="subtitle1">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width : 580px)");
  const isTablet = useMediaQuery(
    "(min-width : 580px) and (max-width : 1200px)"
  );

  const { products, loading, error } = useSelector(state => state.productState)

  return (
    <div>
      {/* Banner Start here */}
      <Banner />
      {/* Banner Ends here */}

      {/* Features section starts here */}
      <Box padding={"80px"} bgcolor={"#111111"} sx={{display: {  md: "flex", gap: "25px", flexDirection: "column" }}} >
        {/* card */}
        <FeatureCard
          mainText={"Free Shipping*"}
          text={"Above Rs.1000 only"}
          mt={"10px"}
          icon={
            <LocalShippingIcon
              sx={{ color: "green.main", fontSize: "2.3rem" }}
            />
          }
        />
        <FeatureCard
          mainText={"Certified Orgainc"}
          text={"100% Gurantee"}
          icon={
            <VerifiedUserIcon
              sx={{ color: "green.main", fontSize: "2.3rem" }}
            />
          }
        />
        <FeatureCard
          mainText={"Huge Savings"}
          text={"At Lowest Price"}
          icon={
            <LocalAtmIcon sx={{ color: "green.main", fontSize: "2.3rem" }} />
          }
        />
        <FeatureCard
          mainText={"Easy Returns"}
          text={"No Questions Asked"}
          icon={
            <RecyclingIcon sx={{ color: "green.main", fontSize: "2.3rem" }} />
          }
        />
      </Box>

    {/* Features section ends here */}

      {/* Product Section start here */}
      <Box bgcolor={"#fff"} p={"140px 0 50px"}>
        <Box maxWidth={"1200px"} mx={"auto"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            alignItems={"center"}
          >
            <Typography variant="h2" color={"#111"}>
              Best Selling Products
            </Typography>
            <img src={vertorleaf} alt="Leaf" />
          </Box>
     <Box
  sx={{
    py: {
      xs: "40px",
      sm: "50px",
      md: "70px",
    },
  }}
>
  <Box
    sx={{
      display: "grid",

      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      },

      gap: {
        xs: "16px",
        sm: "20px",
        md: "24px",
      },
    }}
  >
    {products?.slice(0, 4).map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </Box>
</Box>
        </Box>
      </Box>

      {/* Product Section ends here */}

      <Box sx={{ marginBottom: "-48px" }}>
        <Box sx={{ maxWidth: "600px", mx: "auto", textAlign: "center" }}>
          <img style={{ height: "70px" }} src={leaf} alt="" />
        </Box>
      </Box>

      {/* Recommendation section starts here */}
      <Box
        sx={{
          py: "100px",
          bgcolor: "#f8f6f3",
        }}
      >
      <Box
  sx={{
    maxWidth: "1200px",
    mx: "auto",
    px: { xs: 2, sm: 3, md: 0 },

    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
    },

    gap: {
      xs: "20px",
      sm: "24px",
      md: "30px",
    },
  }}
>
  {recommendationSection.map((content) => (
    <RecommendationCard key={content.id} content={content} />
  ))}
</Box>
      </Box>
      {/* Recommendation section ends here */}

      {/* Sale section start here */}
      <Box bgcolor={"#111111"} py={"60px"}>
        <Box
          maxWidth={"1100px"}
          mx={"auto"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography variant="h2" color={"white"}>
              Get 25% Off On Your First Purchase!
            </Typography>
          </Box>
          <Link to={"everything"}>
            <Box>
              <CustomButton text={"Shop Now"} icon={<FaShoppingCart />} />
            </Box>
          </Link>
        </Box>
      </Box>
      {/* Sale section ends here */}

      {/* Free Section start here */}
      <Box bgcolor={"#f8f6f3"}>
        <Box
          maxWidth={"600px"}
          mx={"auto"}
          minHeight={"100px"}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography
            textAlign={"center"}
            width={"100%"}
            variant="h3"
            color="black"
          >
            Try It For Free. No Registration Needed.
          </Typography>
        </Box>
      </Box>
      {/* Free Section ends here */}

      <Box
        maxWidth={"1200px"}
        mx={"auto"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"50px"}
        overflow={"auto"}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            color: "black",
          }}
        >
          Featured Brands:
        </Typography>
        <img src={logo1} width={"178px"} height={"100px"} />
        <img src={logo2} width={"178px"} height={"100px"} />
        <img src={logo3} width={"178px"} height={"100px"} />
        <img src={logo4} width={"178px"} height={"100px"} />
        <img src={logo5} width={"178px"} height={"100px"} />
      </Box>
    </div>
  );
};

export default HomePage;
