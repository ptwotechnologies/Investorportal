import React, { useState } from "react";
import Cropper from "react-easy-crop";

export const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // ✅ add this
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        resolve(new File([blob], "cropped.jpeg", { type: "image/jpeg" }));
      }, "image/jpeg");
    };

    image.onerror = (err) => {
      reject(new Error("Image load error"));
    };
  });
};
