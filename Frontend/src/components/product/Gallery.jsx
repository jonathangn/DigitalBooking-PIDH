import { useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import Modal from '../../utils/Modal';

function Gallery({ images }) {
  const items = images || [];
  const gallery = items.map((img) => img.urlImg);
  const mainImg = gallery[0];
  const [mainImgM, setMainImgM] = useState(gallery[0]);
  const [modalActive, setModalActive] = useState(false);

  const GalleryR = items.slice(1, 5);
  const len = gallery.length;

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  const nextImg = () => {
    let index = gallery.indexOf(mainImgM);
    if (index === len - 1) {
      setMainImgM(gallery[0]);
    } else {
      setMainImgM(gallery[index + 1]);
    }
  };

  const prevImg = () => {
    let index = gallery.indexOf(mainImgM);
    if (index === 0) {
      setMainImgM(gallery[len - 1]);
    } else {
      setMainImgM(gallery[index - 1]);
    }
  };

  return (
    <>
      <div className="wrapper">
        <img
          src={mainImg}
          alt=""
          className="main-block"
          width="800"
          height="600"
          fetchPriority="high"
        />

        <div className="random">
          {GalleryR.map((img, index) => (
            <img
              key={index}
              src={img.urlImg}
              alt=""
              className="img-next"
              loading="lazy"
              width="400"
              height="300"
            />
          ))}

          <button id="modal-gallery" className="" onClick={toggleModal}>
            ver más
          </button>
        </div>
      </div>

      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper"
        >
          {gallery.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt=""
                className="img-swiper"
                loading="lazy"
                width="800"
                height="600"
              />
              <div className="swiper-slide-text">
                <h2>
                  {index + 1} / {items.length}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Modal modalActive={modalActive} toggle={toggleModal}>
        <div className="modal-container">
          <div className="g-container">
            <button id="modal-gallery" className="modal-gallery-x" onClick={toggleModal}>
              X
            </button>
            <img src={mainImgM} alt="" className="main-img" width="800" height="600" />

            <span className="arrows">
              <IoIosArrowDropleftCircle className="left-aw" onClick={prevImg} />
              <IoIosArrowDroprightCircle className="right-aw" onClick={nextImg} />
            </span>
            <div className="counter-gallery">
              <br />
              <span>{gallery.indexOf(mainImgM) + 1}</span>
              <span>/</span>
              <span>{items.length}</span>
            </div>

            <div className="carousel">
              {gallery.map((img, index) => (
                <img
                  style={{ cursor: 'pointer' }}
                  key={index}
                  src={img}
                  alt=""
                  className="img-next"
                  onClick={() => setMainImgM(img)}
                  loading="lazy"
                  width="150"
                  height="112"
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Gallery;