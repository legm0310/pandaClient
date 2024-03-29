import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../_actions/productAction";
import { setItem } from "../../utils";

import classes from "../../styles/headers/Header.module.css";
import { Box, Button, Paper, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const DesktopNavMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onSearchProducts = (event) => {
    event.preventDefault();
    const filter = {};
    setItem("searchWord", searchTerm);
    filter.search = searchTerm;
    navigate(`/products/all?category=%&search=${searchTerm}`);
  };
  return (
    <Fragment>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
        }}
      >
        <Link
          to='/products/all?category=%&search=%'
          className={classes.purchaseLink}
        >
          <Button
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: "black",
              fontWeight: 700,
              fontFamily: "GongGothicMedium",
              whiteSpace: "nowrap",
            }}
          >
            구매하기
          </Button>
        </Link>

        <Link to='/products/add' className={classes.purchaseLink}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: "black",
              fontWeight: 700,
              fontFamily: "GongGothicMedium",
              whiteSpace: "nowrap",
            }}
          >
            판매하기
          </Button>
        </Link>

        {/* <Link to="Loading" className={classes.purchaseLink}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: "black",
              fontWeight: 700,
              fontFamily: "GongGothicMedium",
            }}
          >
            로딩버튼
          </Button>
        </Link> */}

        <Paper
          component='form'
          sx={{
            p: "2px 4px",
            ml: 3,
            display: "flex",
            alignItems: "center",
            width: 400,
            borderRadius: 5,
            height: 37,
            justifyContent: "center",
            border: 1.5,
            display: { xs: "none", md: "flex" },
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder='검색어를 입력하세요...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            type='submit'
            onClick={onSearchProducts}
            sx={{ p: "10px" }}
            aria-label='search'
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default DesktopNavMenu;
