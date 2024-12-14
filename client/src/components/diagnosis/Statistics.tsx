import Skeleton from "react-loading-skeleton";
import { Diagnosis } from "../../lib/types";

type Props = {
  diagnosis?: Diagnosis;
  isLoading?: boolean;
};

export default function Statistics({ diagnosis, isLoading }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
      {isLoading ? (
        <>
          <Skeleton height={"4.5rem"} />
          <Skeleton height={"4.5rem"} />
        </>
      ) : (
        <>
          <div className="bg-gradient-to-r from-[#E5FAFF] to-[#FFE1FA] flex items-center justify-between p-4 rounded-md px-8">
            <p className="text-lg text-slate-800 font-semibold">Skin Age</p>
            <p className="text-4xl text-slate-800 font-semibold">
              {diagnosis?.age}
              <span className="text-[1.25rem] font-semibold text-slate-500">
                y/o
              </span>
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#E5FAFF] to-[#FFE1FA] flex items-center justify-between p-4 rounded-md px-8">
            <p className="text-lg text-slate-800 font-semibold">Skin Score</p>
            <p className="text-4xl text-slate-800 font-semibold">
              {diagnosis?.score}
              <span className="text-[1.25rem] font-semibold text-slate-500">
                /100
              </span>
            </p>
          </div>{" "}
        </>
      )}
    </div>
  );
}
