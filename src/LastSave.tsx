import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "./redux/store";
import moment from "moment";
import { IoMdRefresh } from "react-icons/io";

type Props = {
  userData: { saveDate: string };
};

const LastSave = (props: Props) => {
  const { userData } = props || {};

  const { saveDate } = userData || {};

  const [timeDifference, setTimeDifference] = useState<string>("");

  const getTimeDifference = (timestamp: string = saveDate) => {
    const currentTime = moment();
    const pastTime = moment(timestamp);

    const duration = moment.duration(currentTime.diff(pastTime));

    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    let readableText = "";
    if (hours > 0) {
      readableText += `${hours} hrs`;
    }
    if (minutes > 0) {
      readableText += `${minutes} mins.`;
    }
    if (seconds > 0) {
      readableText += `${seconds} secs.`;
    }

    setTimeDifference(readableText);
  };

  useEffect(() => {
    if (saveDate) {
      getTimeDifference(saveDate);
    }
  }, [saveDate]);

  return (
    <>
      <div className="flex flex-row gap-x-2">
        <div
          onClick={() => getTimeDifference()}
          className="mt-1 hover:cursor-pointer"
          title="Refresh to get updated time difference"
        >
          <IoMdRefresh />
        </div>{" "}
        <p className="text-slate-600">
          {timeDifference ? timeDifference : "0 secs."} Since last update
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps)(LastSave);
