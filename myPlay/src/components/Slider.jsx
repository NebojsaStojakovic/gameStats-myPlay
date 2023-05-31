import { AnimatePresence, motion } from "framer-motion";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const Slider = ({
  allTeam,
  currentIndex,
  setCurrentIndex,
  direction,
  setDirection,
}) => {
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? allTeam?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setDirection(-1);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === allTeam?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setDirection(1);
  };

  const sliderAnimation = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  return (
    <>
      <div className='slider__container'>
        <div className='slider__content-helper'>
          <div>
            <div
              onClick={goToPrevious}
              className='slider__arrows slider__arrows-left'
            >
              <MdOutlineArrowBackIosNew />
            </div>
            <div
              onClick={goToNext}
              className='slider__arrows slider__arrows-right'
            >
              <MdOutlineArrowForwardIos />
            </div>
          </div>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className='slider__content'
              key={currentIndex}
              variants={sliderAnimation}
              custom={direction}
              initial='enter'
              animate='center'
              exit='exit'
              whileDrag={{ cursor: "grabbing" }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                duration: 0.3,
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                e.stopPropagation();
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  goToNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  goToPrevious();
                }
              }}
            >
              <p>
                {currentIndex !== 0
                  ? allTeam[currentIndex]?.firstName +
                    " " +
                    allTeam[currentIndex]?.lastName
                  : "ALL TEAM"}
              </p>
              <img
                src={
                  currentIndex !== 0
                    ? allTeam[currentIndex]?.avatar
                      ? allTeam[currentIndex]?.avatar
                      : "https://ionicframework.com/docs/img/demos/avatar.svg"
                    : allTeam[0]?.logo
                }
                alt={
                  currentIndex !== 0
                    ? allTeam[currentIndex]?.avatar
                      ? allTeam[currentIndex]?.avatar
                      : "https://ionicframework.com/docs/img/demos/avatar.svg"
                    : allTeam[0]?.logo
                }
              />
              <h4>
                {currentIndex !== 0
                  ? allTeam[currentIndex]?.firstName +
                    " " +
                    allTeam[currentIndex]?.lastName
                  : allTeam[0]?.name}
                <span>
                  {currentIndex !== 0
                    ? "Number:" + " " + allTeam[currentIndex]?.number
                    : ""}
                </span>
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Slider;
