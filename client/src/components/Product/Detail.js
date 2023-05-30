import { Fragment } from "react";
import classes from "./Detail.module.css";
import Slide from "./Slide";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Detail = (props) => {
  return (
    <Fragment>
      <section className={classes.productDetailWrap}>
        <div className={classes.productDetail}>
          <div className={classes.productImgWrap}>
            <Slide className={classes.Slide} />
          </div>

          <div className={classes.producContentWrap}>
            <div>
              <div className={classes.category}>홈 - 남성의류</div>
              <div className={classes.title}>중부대 로고 팝니다</div>
              <div className={classes.price}>100,000원</div>
              <div className={classes.time}>올라온 시간 및 조회 찜</div>
            </div>

            <div className={classes.buttonWrap}>
              <button className={classes.productPut}>
                <FaHeart />
                <span>찜하기</span>
              </button>
              <button className={classes.productMessage}>
                <TbMessageCircle2Filled />
                <span>톡하기</span>
              </button>
              <button className={classes.productPurchase}>
                <IoCart />
                <span>구매하기</span>
              </button>
            </div>
          </div>
        </div>

        <div className={classes.informationWrap}>
          <div className={classes.storeInformation}>
            <div className={classes.storeInfoHeader}>상점정보</div>
            <div className={classes.store}>
              <div className={classes.StoreIcon}>
                <FaUserCircle />
              </div>
              이승훈
            </div>
          </div>

          <div className={classes.productInformation}>
            <div className={classes.productInfoHeader}>상품내용</div>
            <div className={classes.productInfoDescription}>
              이것은 예시입니다. <br />
              얼마 사용하지 않았고 돈이 필요하여 싸게 판매합니다. <br />
              궁금한것 있으면 톡으로 연락주세요.
            </div>
          </div>
        </div>

        <div className={classes.relationproductWrap}></div>
      </section>
    </Fragment>
  );
};

export default Detail;
