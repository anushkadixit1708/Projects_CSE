import { useEffect, useState } from "react";
import axiosForBackend from "../../utils/axiosForBackend";
import sleep from "../../utils/sleep";
import fallback from "./fallback.jpg";
const ImageWindow = () => {
  const [image, setImage] = useState("");
  useEffect(() => {
    const getFrame = async () => {
      // const [data] =
      Promise.all([
        axiosForBackend.get<{ img: string }>("/feed"),
        sleep(500),
      ]).then(([data]) => {
        try {
          const img = data.data.img;
          const image = img.substring(
            img.indexOf("'") + 1,
            img.lastIndexOf("'")
          );
          //   console.log(image);
          setImage(image);
          //   console.log(data);
        } catch (err) {
          //   console.log(err);
        } finally {
          getFrame();
        }
      });
    };

    getFrame();
  }, []);
  return (
    <div className="relative">
      <h1 className="py-4">
        Place your face such that nose is on the green marking
      </h1>
      <img
        className="mx-auto"
        src={image ? `data:image/jpeg;base64,${image}` : fallback}
      />
      <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
        <div className="p-4 border-success border rounded-full">
          <div className="h-2 w-2 z-40 bg-success "></div>
        </div>
      </div>
      <p className="text-danger font-medium mt-2">
        NOTE: This is an approximation of what the algorithm will be judging you
        on, the actual judgement frames might be slightly different, depending
        on your machine speed
      </p>
    </div>
  );
};

export default ImageWindow;
