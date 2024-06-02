import { useEffect, useState } from "react";
import { User } from "./intreface/user";
import Loader from "./Loader";

type Props = {
  index: number;
  data: User;
};

const dummyCatImage =
  "https://wallpapers.com/images/hd/cartoon-cat-pictures-7k388g4q03hfn5yn.jpg";

const Card = (props: Props) => {
  const { data, index } = props || {};
  const [loader, setLoader] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    setImageError(false);
  }, [data.image]);

  const handleImageLoad = () => {
    setLoader(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setLoader(false);
  };

  return (
    <div
      className="pt-2 pb-8 px-2 dragElement hover:cursor-pointer border border-slate-400 flex flex-col gap-y-2 rounded-xl relative"
      draggable
      data-index={index}
    >
      <div className="px-4 bg-white border border-slate-400 rounded-lg absolute top-2 right-2">
        <p>{data.position + 1}</p>
      </div>
      <div className="h-32">
        {loader && (
          <div className="h-full bg-slate-200 flex justify-center items-center rounded-2xl">
            <Loader />
          </div>
        )}
        {data?.image && (
          <img
            className="w-full h-full rounded-2xl "
            src={imageError ? dummyCatImage : data.image}
            draggable="false"
            alt={data.type}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <h3 className="text-xl font-semibold underline">Type</h3>
        <p>{data.type}</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <h3 className="text-xl font-semibold underline">Title</h3>
        <p>{data.title}</p>
      </div>
    </div>
  );
};

export default Card;
