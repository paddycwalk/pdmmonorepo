"use client";

import { getCookie } from "cookies-next/client";
import NextImage, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  token?: string;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  token,
}: ImageProps) => {
  const getHeaders = () => {
    const getToken = getCookie("token");

    console.log("getToken:", getToken);

    const headers: HeadersInit = {};
    headers["Authorization"] = `Bearer ${getToken}`;
    headers["accept"] = "*/*";
    headers["accept-encoding"] = "gzip, deflate, br";
    headers["cache-control"] = "no-cache";
    return headers;
  };

  const fetchAsBlob = async (url: RequestInfo): Promise<Blob | null> => {
    const response = await fetch(url, {
      method: "get",
      headers: getHeaders(),
    });
    if (response.status !== 200) {
      return null;
    }

    return response.blob();
  };
  console.log("image token:", token);

  const [srcUrl, setSrcUrl] = useState<string>();

  useEffect((): void => {
    fetchAsBlob(src as string)
      .then((response: Blob | null): Blob => {
        if (!response) {
          throw `Error fetching '${src}'`;
        }
        return response;
      })
      .then((blob: Blob | string): void => {
        if (typeof blob === "string") {
          throw `Error: Expected Blob but received string`;
        }
        setSrcUrl(URL.createObjectURL(blob));
      })
      .catch((err): void => {
        console.error(err);
      });
  }, []);

  console.log("srcUrl:", srcUrl);

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`Image ${className}`}
      onClick={onClick}
      priority
      // layout="responsive"
      // objectFit="cover"
    />
  );
};
