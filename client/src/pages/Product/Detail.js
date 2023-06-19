import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSDK, useAddress } from "@thirdweb-dev/react";
import { setLoadings } from "../../_actions/uiAction";
import { getProduct, purchase } from "../../_actions/productAction";
import { addRoom } from "../../_actions/roomAction";

import Slide from "./DetailSlide";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Button from "../../components/UI/Button";
import ProductStore from "./ProductStore";
import ProductInformation from "./ProductInformation";

import classes from "../../styles/Detail.module.css";

const Detail = (props) => {
  const [activeMenu, setActiveMenu] = useState("productInformation");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetail = useSelector(
    (state) => state.product.productDetail?.product
  );
  const userId = useSelector((state) => state.user.userId);
  const sellerId = productDetail?.seller_id;
  const { productId } = useParams();

  const sdk = useSDK();
  console.log(productDetail);

  const createRoomNumber = () => {
    const totalId = [userId, sellerId];
    return totalId
      .map(Number)
      .sort((a, b) => a - b)
      .join("_");
  };
  const roomName = createRoomNumber();
  console.log(`roomName : ${roomName}`);

  useEffect(() => {
    dispatch(getProduct(productId)).then((response) => console.log(response));
  }, [dispatch, productId]);

  const onMenuHandler = (menu) => {
    setActiveMenu(menu);
  };

  const onPurchaseHandler = () => {
    dispatch(setLoadings({ isLoading: true }));
    const data = {
      productId,
      userId,
      sdk,
    };
    dispatch(purchase(data)).then((response) => {
      console.log(response);
      if (response.payload.updated) {
        alert("에스크로 결제 완료");
        navigate("/userinfo");
      } else {
        alert("구매 신청에 실패했습니다.");
      }
    });
  };

  const onCreateRoomHandler = (event) => {
    event.preventDefault();
    dispatch(setLoadings({ isLoading: true }));

    let body = {
      seller_id: sellerId,
      buyer_id: userId,
      room_name: roomName,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(body));

    const data = {
      formData: formData,
    };

    for (const value of formData.values()) {
      console.log(value);
    }

    dispatch(addRoom(data)).then((response) => {
      if (response.addRoomSuccess) {
        alert("채팅방 생성 완료");
        navigate(`/chat/${roomName}`);
      } else {
        alert("방 생성에 실패했습니다.");
      }
    });
  };

  return (
    <Fragment>
      <section className={classes.productDetailWrap}>
        <div className={classes.productDetail}>
          <div className={classes.productImgWrap}>
            <Slide className={classes.Slide} />
          </div>

          <div className={classes.producContentWrap}>
            <div>
              <div className={classes.category}>{productDetail?.category}</div>
              <div className={classes.title}>{productDetail?.title}</div>
              <div className={classes.price}>{productDetail?.price}원</div>
              <div className={classes.time}>{productDetail?.createdAt}</div>
            </div>

            <div className={classes.buttonWrap}>
              <div className={classes.putMessageButton}>
                <Button>
                  <div className={classes.productPutWrap}>
                    <div className={classes.productPut}>
                      <FaHeart />
                      <span className={classes.buttonText}>찜하기</span>
                    </div>
                    <span className={classes.prodPutborder}></span>
                  </div>
                </Button>

                <Button onClick={onCreateRoomHandler}>
                  <div className={classes.productMessageWrap}>
                    <div className={classes.productMessage}>
                      <TbMessageCircle2Filled />
                      <span className={classes.buttonText}>판다톡</span>
                    </div>
                    <span className={classes.prodMessageborder}></span>
                  </div>
                </Button>
              </div>

              <Button onClick={onPurchaseHandler}>
                <div className={classes.productPurchaseWrap}>
                  <div className={classes.productPurchase}>
                    <IoCart />
                    <span className={classes.buttonText}>구매하기</span>
                  </div>
                  <span className={classes.prodPurchaseborder}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className={classes.informationWrap}>
          <div className={classes.prodInformation}>
            <div className={classes.prodInfoButton}>
              <Button onClick={() => onMenuHandler("productInformation")}>
                <div
                  className={`${classes.infoButton} ${
                    activeMenu === "productInformation" ? classes.active : ""
                  }`}
                >
                  상품정보
                </div>
              </Button>

              <Button onClick={() => onMenuHandler("productStore")}>
                <div
                  className={`${classes.storeButton} ${
                    activeMenu === "productStore" ? classes.storeactive : ""
                  }`}
                >
                  판매자정보
                </div>
              </Button>
            </div>

            <div className={classes.ProdinfoExplanation}>
              {activeMenu === "productStore" && <ProductStore />}
              {activeMenu === "productInformation" && <ProductInformation />}
            </div>
          </div>
        </div>

        <div className={classes.relationproductWrap}>
          <div className={classes.relationProduct}>
            <div className={classes.relationProductHeader}>연관 상품</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Detail;
