import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import * as paths from "../../constants/paths";

const ImageControl = ({
  src,
  folder,
  isThumb,
  specificWidth,
  isLazy,
  classes
}) => {
  let url = paths.API_UPLOADS_URL; //temp
  isThumb = isThumb ?? false;
  isLazy = isLazy ?? false;
  specificWidth = specificWidth ?? false;

  if (!src) {
    if (isThumb) {
      src = "/images/dummy_img.png";
    } else if (specificWidth) {
      src = "/images/dummy_img.png";
    } else {
      src = "/images/dummy_img.png";
    }
  } else {
    if (isThumb) {
      src = `${url}${folder}/thumb_${src}`;
    } else if (specificWidth) {
      src = `${url}${folder}/${specificWidth}${src}`;
    } else {
      src = `${url}${folder}/${src}`;
    }
  }

  return (
    <>
      {isLazy ? (
        <LazyLoadImage
          alt="Error While Loading Image"
          effect="blur"
          src={src}
          className={classes && classes}
        />
      ) : (
        <img
          alt="Error While Loading Image"
          src={src}
          className={classes && classes}
        />
      )}
    </>
  );
};

export default ImageControl;
