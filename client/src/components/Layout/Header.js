import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../_actions/user_action";

import classes from "./Header.module.css";
import { FiSearch } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import UserAuth from "./UserAuth";

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 현재 경로가 로그인 페이지인 경우 Header를 렌더링하지 않음
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.list}>
          <Link to="/" className={classes.link}>
            <h1 className={classes.logo}>PANDA.</h1>
          </Link>

          <ul className={classes.list2}>
            <div className={classes.dropdown}>
              <li className={classes.list2Item}>
                <Link to="/purchase/" className={classes.purchaseLink}>
                  구매하기
                </Link>
              </li>

              <div className={classes.dropdownContent}>
                <DropdownMenu />
              </div>
            </div>

            <Link to="/addProduct/" className={classes.AddProductLink}>
              <li className={classes.list2Item}>판매하기</li>
            </Link>
          </ul>

          <div className={classes.searchBox}>
            <input type="text" className={classes.search} />

            <button>
              <FiSearch />
            </button>
          </div>
        </div>

        <div className={classes.AuthList}>
          <UserAuth
            setIsLoggedIn={props.setIsLoggedIn}
            isLoggedIn={props.isLoggedIn}
          />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
