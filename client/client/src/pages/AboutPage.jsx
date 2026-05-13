import { Box, Typography } from '@mui/material'
import React from 'react'
import leaf from "../assets/small_leaf.png";
import grapes from "../assets/grapes.jpg"
import { heroBg } from "../assets/index";


const AboutPage = () => {
    return (
       <Box pb={{ xs: "40px", md: "70px" }}>
  
  {/* HERO */}
  <Box
    bgcolor="#f8f6f3"
    py={{
      xs: "60px",
      md: "90px",
    }}
    px={{
      xs: 2,
      sm: 3,
    }}
  >
    <Typography
      variant="h1"
      textAlign="center"
      sx={{
        fontSize: {
          xs: "36px",
          sm: "48px",
          md: "64px",
        },
      }}
    >
      About Us
    </Typography>
  </Box>

  {/* LEAF */}
  <Box
    display="flex"
    justifyContent="center"
    mt={{
      xs: "-15px",
      md: "-25px",
    }}
  >
    <Box
      component="img"
      src={leaf}
      alt="leaf"
      sx={{
        height: {
          xs: "50px",
          md: "70px",
        },
      }}
    />
  </Box>

  {/* ABOUT SECTION */}
  <Box
    maxWidth="1200px"
    mx="auto"
    px={{
      xs: 2,
      sm: 3,
      lg: 0,
    }}
  >
    <Box
      display="flex"
      alignItems="center"
      flexDirection={{
        xs: "column",
        md: "column",
        lg: "row",
      }}
      gap={{
        xs: 5,
        md: 6,
        lg: 8,
      }}
      py={{
        xs: "50px",
        md: "80px",
        lg: "120px",
      }}
    >
      
      {/* TEXT */}
      <Box
        flex={1}
        width="100%"
      >
        <Typography
          variant="h2"
          sx={{
            mb: "20px",

            fontSize: {
              xs: "28px",
              sm: "36px",
              md: "44px",
            },

            lineHeight: 1.2,
          }}
        >
          We are your one-stop shop for all your
          Grocery needs
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Open sans', sans-serif",
            color: "#333333",

            fontSize: {
              xs: "14px",
              sm: "15px",
              md: "16px",
            },

            lineHeight: 1.8,
          }}
        >
          Welcome to Organic Store, your ultimate
          destination for all things organic and
          wholesome. At Organic Store, we are
          passionate about providing you with the
          finest selection of organic products that
          promote a healthy and sustainable lifestyle.
          Our carefully curated range includes fresh,
          locally sourced produce, natural pantry
          essentials, and eco-friendly household
          items. We believe in supporting farmers and
          suppliers who share our commitment to
          organic practices and ethical standards.
          With a focus on quality, transparency, and
          customer satisfaction, we strive to be the
          go-to grocery store for health-conscious
          individuals and families. Embrace the
          goodness of nature with Organic Store –
          your gateway to a nourishing life.
        </Typography>
      </Box>

      {/* IMAGE */}
      <Box
        flex={1}
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <Box
          component="img"
          src={grapes}
          alt="grapes"
          sx={{
            width: "100%",

            maxWidth: {
              xs: "100%",
              sm: "500px",
              md: "580px",
            },

            borderRadius: "10px",

            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  </Box>

  {/* STATS */}
  <Box
    bgcolor="#111111"
    px={{
      xs: 2,
      sm: 3,
    }}
    py={{
      xs: "40px",
      md: "60px",
    }}
  >
    <Box
      maxWidth="1200px"
      mx="auto"
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={{
        xs: 4,
        md: 5,
      }}
      textAlign={{
        xs: "center",
        lg: "left",
      }}
    >
      
      {/* TITLE */}
      <Box>
        <Typography
          variant="h4"
          color="#ffffff"
          sx={{
            fontSize: {
              xs: "24px",
              md: "30px",
            },
          }}
        >
          Numbers Speak For Themselves!
        </Typography>
      </Box>

      {/* ITEM */}
      <Box>
        <Typography
          variant="h1"
          color="#ffffff"
          sx={{
            fontSize: {
              xs: "40px",
              md: "60px",
            },
          }}
        >
          5,000 +
        </Typography>

        <Typography variant="h5" color="#ffffff">
          Curated Products
        </Typography>
      </Box>

      {/* ITEM */}
      <Box>
        <Typography
          variant="h1"
          color="#ffffff"
          sx={{
            fontSize: {
              xs: "40px",
              md: "60px",
            },
          }}
        >
          800 +
        </Typography>

        <Typography variant="h5" color="#ffffff">
          Happy Customers
        </Typography>
      </Box>

      {/* ITEM */}
      <Box>
        <Typography
          variant="h1"
          color="#ffffff"
          sx={{
            fontSize: {
              xs: "40px",
              md: "60px",
            },
          }}
        >
          40 +
        </Typography>

        <Typography variant="h5" color="#ffffff">
          Product Categories
        </Typography>
      </Box>
    </Box>
  </Box>

  {/* BACKGROUND SECTION */}
  <Box
    sx={{
      position: "relative",

      height: {
        xs: "220px",
        sm: "280px",
        md: "350px",
      },

      overflow: "hidden",
    }}
  >
    {/* OVERLAY */}
    <Box
      sx={{
        position: "absolute",

        top: 0,
        left: 0,

        width: "100%",
        height: "100%",

        backgroundColor: "#f8f6f3",

        backgroundImage: `url(${heroBg})`,

        backgroundRepeat: "no-repeat",

        backgroundSize: {
          xs: "70% auto",
          sm: "50% auto",
          md: "28% auto",
        },

        backgroundPosition: "bottom right",

        opacity: 0.25,

        mixBlendMode: "multiply",
      }}
    />

    <Box maxWidth="1200px" mx="auto" />
  </Box>
</Box>
    )
}

export default AboutPage