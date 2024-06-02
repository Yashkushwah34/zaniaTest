import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  fetchCards,
  saveFetchCards,
  userSliceActions,
} from "./redux/slice/userSlice";
import { RootState, AppDispatch } from "./redux/store";
import { User } from "./intreface/user";
import Card from "./Card";
import Model from "./Model";
import AddNewDocument from "./AddNewDocument";
import LastSave from "./LastSave";
import SaveSpinner from "./SaveSpinner";

type Props = {
  userData: { data: User[]; savingLoader: boolean };
  fetchData: () => void;
  saveDragData: () => void;
  rearrangeCards: (data: User[]) => void;
};

const App = (props: Props) => {
  const { userData, fetchData, saveDragData, rearrangeCards } = props || {};
  const { data: cardData, savingLoader } = userData || {};
  const [modelData, setModelData] = useState<string | null>(null);
  const [openModel, setOpenModel] = useState<boolean>(false);

  const draggingIndexRef = useRef<number | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  let dragCall = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (cardData.length === 0) {
      fetchData();
    }
    const parentElement = parentRef.current;
    if (!parentElement) return;

    parentElement.addEventListener("dragstart", handleDragStart);
    parentElement.addEventListener("dragover", handleDragOver);
    parentElement.addEventListener("drop", handleDrop);
    parentElement.addEventListener("dragend", handleDragEnd);
    parentElement.addEventListener("click", handleMouseUp, true);

    return () => {
      parentElement.removeEventListener("dragstart", handleDragStart);
      parentElement.removeEventListener("dragover", handleDragOver);
      parentElement.removeEventListener("drop", handleDrop);
      parentElement.removeEventListener("dragend", handleDragEnd);
      parentElement.removeEventListener("click", handleMouseUp);
    };
  }, [cardData]);

  const handleMouseUp = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;

    const cardElement = targetElement.closest(".dragElement") as HTMLElement;

    if (cardElement) {
      const index = parseInt(cardElement.dataset.index || "");
      let imageElement = "";
      if (!isNaN(index)) {
        imageElement = cardData[index].image;
      }
      if (imageElement) {
        setModelData(imageElement);
        setOpenModel(true);
      }
    }
  };

  const handleDragStart = (e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (target?.className?.includes("dragElement")) {
      const index = target.dataset.index;
      if (index !== undefined) {
        draggingIndexRef.current = parseInt(index);
        e.dataTransfer!.effectAllowed = "move";
      }
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.className.includes("dragElement")) {
      const index = target.dataset.index;
      if (draggingIndexRef.current !== null && index !== undefined) {
        const currentIndex = draggingIndexRef.current;
        const newIndex = parseInt(index);
        if (currentIndex !== newIndex) {
          const updatedItems = [...cardData];
          const [draggedItem] = updatedItems.splice(currentIndex, 1);
          updatedItems.splice(newIndex, 0, draggedItem);
          draggingIndexRef.current = newIndex;
          rearrangeCards(updatedItems);
          debounceSaveDragData();
        }
      }
    }
  };

  const debounceSaveDragData = () => {
    if (dragCall.current !== null) {
      clearTimeout(dragCall.current);
    }
    dragCall.current = setTimeout(() => {
      saveDragData();
    }, 5000);
  };

  const handleDrop = () => {
    draggingIndexRef.current = null;
  };

  const handleDragEnd = () => {
    draggingIndexRef.current = null;
  };

  return (
    <>
      {savingLoader && <SaveSpinner />}
      <Model
        isModelOpen={openModel}
        imageString={modelData}
        setOpenModel={setOpenModel}
      />
      <div className="px-20">
        <div className="w-full text-center text-4xl font-semibold py-5">
          <h1>Zania Test</h1>
        </div>
        <AddNewDocument />
        <div className="flex flex-row gap-x-10">
          <button
            onClick={fetchData}
            className="mb-7 px-2 rounded-md hover:bg-slate-400 hover:text-white border border-slate-200"
          >
            Get Original Data
          </button>
          <LastSave />
        </div>
        <div
          ref={parentRef}
          className="w-full grid grid-cols-3 gap-5 parentElement"
        >
          {cardData.map((el: User, index: number) => (
            <Card data={el} index={index} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    userData: state,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    fetchData: () => dispatch(fetchCards()),
    saveDragData: () => dispatch(saveFetchCards()),
    rearrangeCards: (data: User[]) =>
      dispatch(userSliceActions.rearrangeCards(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
