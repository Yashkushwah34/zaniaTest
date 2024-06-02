import Loader from "./Loader";

const SaveSpinner = () => {
  return (
    <>
      <div className="z-10 fixed w-screen h-screen flex justify-center items-center bg-[#e2e9f0c0]">
        <Loader />
      </div>
    </>
  );
};

export default SaveSpinner;
