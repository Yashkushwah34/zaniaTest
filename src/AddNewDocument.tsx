import { FormEvent, useState } from "react";

import { connect } from "react-redux";
import { AppDispatch } from "./redux/store";
import { addNewCard } from "./redux/slice/userSlice";
import { UserData } from "./intreface/user";

type Props = {
  addNewCard: (data: UserData) => void;
};

const AddNewDocument = (props: Props) => {
  const { addNewCard } = props;

  const [showForm, setShowForm] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(() => false);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const imageLink = formData.get("imageLink") as string;
    if (!type.trim() || !title.trim() || !imageLink.trim()) {
      setFormError(() => true);
    } else {
      const obj = { type, title, image: imageLink };
      addNewCard(obj);
      setShowForm(() => false);
    }
  };

  return (
    <>
      <div className="mb-7 flex flex-col gap-y-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-2 py-1 rounded-md hover:bg-slate-400 hover:text-white border border-slate-200 w-fit"
        >
          Add New Document
        </button>
        {showForm && (
          <form
            onSubmit={onSubmitHandler}
            className="grid grid-cols-3 gap-x-3 gap-y-2"
          >
            <div className="flex flex-col">
              <h4 className="">Type</h4>
              <input
                className="px-2 border border-slate-300"
                placeholder="type"
                name="type"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="">Title</h4>
              <input
                className="px-2 border border-slate-300"
                placeholder="title"
                name="title"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="">Image Link</h4>
              <input
                className="px-2 border border-slate-300"
                placeholder="image Link"
                name="imageLink"
              />
            </div>
            <div>
              {formError && (
                <p className="text-red-400">* Please fill the complete form</p>
              )}
              <button
                type="submit"
                className="px-2 py-1 rounded-md hover:bg-green-700 text-white border border-slate-200 bg-emerald-800"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setFormError(false);
                  setShowForm(false);
                }}
                className="px-2 py-1 rounded-md hover:bg-red-700 text-white border border-slate-200 bg-red-800"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addNewCard: (data: UserData) => dispatch(addNewCard(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddNewDocument);
