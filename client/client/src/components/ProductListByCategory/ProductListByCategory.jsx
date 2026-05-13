import {
  Box,
  Typography,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Slider,
  Pagination,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, filterProducts, setPriceRange, setSearchQuery, setSort } from "../../slices/productSlice";
import { paginate } from "../../utils/utils";



const ProductListByCategory = () => {
  const { categoryName } = useParams()

  const dispatch = useDispatch()
  // const [sort, setSort] = useState(1);
  // const [priceRange, setPriceRange] = useState([0, 100000])
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(6)
  const {

    filteredProducts,
    searchQuery,
    priceRange,
    sort
  } = useSelector((state) => state.productState);
  const { pathname } = useLocation()

  const [range, setRange] = useState([priceRange.min, priceRange.max]);



  // const handlePriceChange = (e, value) => {
  //   setPriceRange(value);
  // };

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  useEffect(() => {
    dispatch(filterProducts());
  }, [searchQuery, priceRange, sort]);

  useEffect(() => {
    setPage(1)
  }, [pathname]);

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };


  const handlePriceChange = (e, value) => {
    // console.log(value)
    setRange(value)
    dispatch(setPriceRange({ min: value[0], max: value[1] }));
  };

  const handleClearFilter = () => {
    dispatch(setSearchQuery(""))
    dispatch(setPriceRange({ min: 0, max: 200000 }))
    dispatch(filterProducts());
    setRange([0, 200000]);

  };




  const handleSort = (e) => {
    dispatch(setSort(e.target.value))
  };

  const handlePaginate = (e, value) => {
    setPage(value);
  };


  let paginatedProducts = filteredProducts && paginate(filteredProducts?.filter(product => product.category.includes(categoryName)), page - 1, pagesize)
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
      <Box maxWidth="1280px" mx="auto">
        <Grid container spacing={{ xs: 4, md: 0 }}>

          {/* SIDEBAR */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: {
                md: "block",
              },

              borderRight: {
                md: "1px solid #ddd",
              },

              pr: {
                md: 3,
              },
            }}
          >
            {/* Search */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },

                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                label="Search"
                placeholder="Search Products..."
                size="small"
                value={searchQuery}
                onChange={handleSearch}
              />

              <IconButton
                sx={{
                  bgcolor: "green.main",
                  borderRadius: "5px",
                  color: "white",

                  "&:hover": {
                    bgcolor: "green.dark",
                  },
                }}
              >
                <FaChevronRight />
              </IconButton>
            </Box>

            {/* Price Filter */}
            <Box mt={5}>
              <Typography variant="h4" color="#333">
                Filter By Price
              </Typography>

              <Box mt={3} pr={{ md: 3 }}>
                <Slider
                  size="small"
                  getAriaLabel={() => "Price Range"}
                  value={range}
                  onChange={handlePriceChange}
                  step={200}
                  max={10000}
                />
              </Box>
            </Box>

            {/* Category Filter */}
            <Box mt={5}>
              <Typography variant="h4" color="#333">
                Filter By Category
              </Typography>

              <Box
                mt={3}
                display="flex"
                flexDirection="column"
                gap="10px"
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#8bc34a",
                  }}
                  to="/product-category/Groceries"
                >
                  Groceries
                </Link>

                <Link
                  style={{
                    textDecoration: "none",
                    color: "#8bc34a",
                  }}
                  to="/product-category/Juices"
                >
                  Juices
                </Link>
              </Box>
            </Box>

            <Button
              size="large"
              variant="contained"
              onClick={handleClearFilter}
              sx={{
                mt: 3,
                color: "white",
                width: {
                  xs: "100%",
                  md: "auto",
                },
              }}
            >
              Clear
            </Button>
          </Grid>

          {/* MAIN CONTENT */}
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                pl: {
                  md: 4,
                },
              }}
            >
              {/* Breadcrumbs */}
              <Box sx={{ py: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                  <MuiLink
                    component={Link}
                    underline="hover"
                    color="inherit"
                    to="/"
                  >
                    Home
                  </MuiLink>

                  <MuiLink
                    component={Link}
                    underline="hover"
                    color="inherit"
                    to="/everything"
                  >
                    Everything
                  </MuiLink>

                  <Typography color="text.primary">
                    {categoryName.charAt(0).toUpperCase() +
                      categoryName.slice(1)}
                  </Typography>
                </Breadcrumbs>
              </Box>

              {/* Heading */}
              <Box>
                <Typography
                  variant="h1"
                  color="green.main"
                  sx={{
                    fontSize: {
                      xs: "32px",
                      sm: "40px",
                      md: "52px",
                    },
                  }}
                >
                  {categoryName.charAt(0).toUpperCase() +
                    categoryName.slice(1)}
                </Typography>

                <Typography
                  mt={3}
                  variant="body1"
                  sx={{
                    pr: {
                      xs: 0,
                      md: 6,
                    },

                    fontSize: {
                      xs: "14px",
                      md: "16px",
                    },
                  }}
                >
                  Simplify your life with our online grocery store.
                  Explore a wide range of high-quality products,
                  order from the comfort of your home, and enjoy
                  swift doorstep delivery.
                </Typography>
              </Box>

              {/* Sorting */}
              <Box mt="40px">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },

                    gap: 2,

                    justifyContent: "space-between",
                    alignItems: {
                      xs: "flex-start",
                      sm: "center",
                    },
                  }}
                >
                  <Typography variant="subtitle1">
                    Showing {((page - 1) * pagesize) + 1} -{" "}
                    {((page - 1) * pagesize) +
                      (paginatedProducts?.length < pagesize
                        ? paginatedProducts.length
                        : pagesize)}{" "}
                    of{" "}
                    {
                      filteredProducts?.filter((product) =>
                        product.category.includes(categoryName)
                      ).length
                    }{" "}
                    results
                  </Typography>

                  <FormControl
                    size="small"
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "220px",
                      },
                    }}
                  >
                    <InputLabel>
                      Default Sorting
                    </InputLabel>

                    <Select
                      value={sort}
                      label="Default Sorting"
                      onChange={handleSort}
                    >
                      <MenuItem value={0}>
                        Unsorted
                      </MenuItem>

                      <MenuItem value={-1}>
                        Sort : High to low
                      </MenuItem>

                      <MenuItem value={1}>
                        Sort : Low to High
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Products */}
                <Box
                  py={{
                    xs: 4,
                    md: 6,
                  }}
                  minHeight="700px"
                >
                  <Box
                    sx={{
                      display: "grid",

                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                      },

                      gap: {
                        xs: "20px",
                        md: "30px",
                      },
                    }}
                  >
                    {paginatedProducts
                      ?.filter((product) =>
                        product.category.includes(categoryName)
                      )
                      ?.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                        />
                      ))}
                  </Box>
                </Box>

                {/* Pagination */}
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Pagination
                    count={
                      Math.ceil(
                        filteredProducts?.filter((product) =>
                          product.category.includes(categoryName)
                        )?.length / pagesize
                      ) || 0
                    }
                    color="primary"
                    size="small"
                    page={page}
                    onChange={handlePaginate}
                    sx={{
                      "& .Mui-selected": {
                        color: "white",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductListByCategory;
