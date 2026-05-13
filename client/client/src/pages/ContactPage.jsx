import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import { Link } from 'react-router-dom'
import leaf from "../assets/small_leaf.png";
import { FaPhone, FaRegEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// let labelStyle = {
//     fontSize: "14px",
//     fontFamily: "'Open Sans', sans-serif",
//     fontWeight: "700",
//     color: "#333",
//     mb: "5px",
// };

let inputStyle = {
  "& > div": {
    borderRadius: "0",
    bgcolor: "white",
  },
  "& > div > input": {
    padding: "12px",
  },
};

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactPage = () => {
  const [contactData, setContactData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateData = (value) => {
    let errors = {};
    if (!value.name) {
      errors.name = "Name is required";
    } else if (value.name.length < 4) {
      errors.name = "Name must be aleast of 4  character or long";
    } else if (!emailRegex.test(value.email)) {
      errors.email = "Enter a valid email address";
    } else if (!value.subject) {
      errors.subject = "Subject is required";
    } else if (!value.message) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const errors = validateData(contactData);
    if (Object.keys(errors).length === 0) {
      alert("Contact Details Submitted");
      setContactData(initialState);
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <Box pb={"70px"}>
      <Box bgcolor={"#f8f6f3"} py={"110px"}>
        <Typography variant="h1" textAlign={"center"}>
          Get In Touch
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"} mt={"-26px"}>
        <img style={{ height: "70px" }} src={leaf} alt="" />
      </Box>
      <Box>
        <Grid
          container
          display={"flex"}
          alignItems={"center"}
          maxWidth={"1200px"}
          p={"60px 0 120px"}
          marginRight={"auto"}
          marginLeft={"auto"}
        >
          <Grid item xs={12} md={5} py={2} width={"600px"} p={"10px"}>
            <Box
              border={"1px solid rgba(122,122,122,.25)"}
              m={"10px"}
              borderRadius={"3px"}
            >
              <Box p={"10px"}>
                <FaPhone fontSize={"18px"} color="#8bc34a" />
              </Box>
              <Box p={"8px"} mb={"25px"}>
                <Typography variant="body1"> 9876543210</Typography>
                <Typography variant="body1"> 9876543210</Typography>
              </Box>
            </Box>
            <Box
              border={"1px solid rgba(122,122,122,.25)"}
              m={"10px"}
              borderRadius={"3px"}
            >
              <Box p={"10px"}>
                <FaRegEnvelope fontSize={"20px"} color="#8bc34a" />
              </Box>
              <Box p={"8px"} mb={"25px"}>
                <Typography variant="body1"> arg@example.com</Typography>
                <Typography variant="body1">support@example.com</Typography>
              </Box>
            </Box>
            <Box
              border={"1px solid rgba(122,122,122,.25)"}
              m={"10px"}
              borderRadius={"3px"}
            >
              <Box p={"10px"}>
                <FaMapMarkerAlt fontSize={"20px"} color="#8bc34a" />
              </Box>
              <Box p={"8px"} mb={"25px"}>
                <Typography variant="body1"> Chandigarh,</Typography>
                <Typography variant="body1"> Mohali</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item p={"10px"} xs={12} md={7} py={2}>
            <Box component={"form"} onChange={handleChange} color="black">
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: "800",
                  fontSize: "30px",
                  color: "primary.main",
                  mb: "15px",
                }}
              >
                Leave Us A Message
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: "500",
                  color: "black",
                  fontSize: "13px",
                }}
              >
                Want us to contact You? Fill Out The details and we'll contact
                your as soon as possible.
              </Typography>
              <TextField
                type="text"
                label="Name"
                fullWidth
                name="name"
                value={contactData.name}
                sx={{
                  my: "15px",
                }}
              ></TextField>
              {errors.name && (
                <Box my={"8px"}>
                  <Alert severity="error">{errors.name}</Alert>
                </Box>
              )}
              <TextField
                type="email"
                label="Email"
                fullWidth
                name="email"
                value={contactData.email}
                sx={{
                  my: "15px",
                }}
              ></TextField>
              {errors.email && (
                <Box my={"8px"}>
                  <Alert severity="error">{errors.email}</Alert>
                </Box>
              )}
              <TextField
                type="text"
                label="Subject"
                fullWidth
                name="subject"
                value={contactData.subject}
                sx={{
                  my: "15px",
                }}
              ></TextField>
              {errors.subject && (
                <Box my={"8px"}>
                  <Alert severity="error">{errors.subject}</Alert>
                </Box>
              )}
              <TextField
                type="text"
                label="Message"
                multiline
                rows={4}
                fullWidth
                name="message"
                value={contactData.message}
                sx={{
                  my: "15px",
                }}
              />
              {errors.message && (
                <Box my={"8px"}>
                  <Alert severity="error">{errors.message}</Alert>
                </Box>
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}   
                sx={{
                  mt: 3,
                  bgcolor: "green.idle",
                }}
                size="large"
              >
                Submit Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactPage;

{
  /* <Box py={"150px"}>
            <Box maxWidth={"800px"} mx={"auto"}>
                <Typography variant='h1' textAlign={"center"}>
                    Oops! You must be Lost.
                </Typography>
                <Typography variant='h5' component={Link} sx={{ display: "block", mt: "20px", color: "inherit" }} to="/" textAlign={"center"}>
                    Go Back Home
                </Typography>
            </Box>
        </Box> */
}
