import { useEffect, useState } from "react";

type Props = {
  isModelOpen: boolean;
  imageString: string | null;
  setOpenModel: (data: boolean) => void;
};

const dummyCatImage =
  "https://wallpapers.com/images/hd/cartoon-cat-pictures-7k388g4q03hfn5yn.jpg";

const Model = (props: Props) => {
  const { isModelOpen, imageString, setOpenModel } = props || {};
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setImageError(false);
    };
  }, [imageString]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const targetKey = e.key;
    if (targetKey === "Escape") {
      setOpenModel(false);
    }
  };

  useEffect(() => {
    if (isModelOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModelOpen]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {isModelOpen && (
        <div className="fixed bg-[#e2e9f0c0] w-screen h-screen z-10 justify-center items-center flex">
          <div className="modal-content w-1/3">
            {imageString && (
              <img
                src={imageError ? dummyCatImage : imageString}
                alt="Model Image"
                className="w-full h-full"
                onError={handleImageError}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
