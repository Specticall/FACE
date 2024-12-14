import { useNavigate } from "react-router-dom";
import useAllDiagnosisQuery from "../../hooks/diagnosis/useAllDiagnosisQuery";
import { formatDate } from "../../lib/utils";
import ConcernBadge from "./ConcernBadge";
import Skeleton from "react-loading-skeleton";

export default function DiagnosisTable() {
  const { allDiagnosisData, allDiagnosisQuery } = useAllDiagnosisQuery();
  const navigate = useNavigate();

  const gridTemplateColumns =
    "minmax(4rem,0.75fr) minmax(16rem,1.5fr) repeat(3,minmax(8rem,1fr)) minmax(16rem,2fr)";

  return (
    <div className="mt-12 min-w-[60rem]">
      {allDiagnosisQuery.isLoading ? (
        <Skeleton height={"1.5rem"} width={"16rem"} className="mb-6" />
      ) : (
        <p className="text-slate-800 text-lg mb-6">
          Previous Diagnoses{" "}
          <span className="text-slate-400">({allDiagnosisData?.length})</span>
        </p>
      )}
      <div className="sticky left-0 right-0 top-20 z-10">
        <ul
          className="grid [&>li]:text-slate-500 bg-slate-50 px-6 py-3 rounded-md"
          style={{ gridTemplateColumns }}
        >
          <li>Image</li>
          <li>Diagnose Date</li>
          <li>Score</li>
          <li>Skin Type</li>
          <li>Age</li>
          <li>Concerns</li>
        </ul>
      </div>
      <div>
        {allDiagnosisQuery.isLoading &&
          new Array(5).fill("x").map((_, i) => {
            return (
              <Skeleton
                key={i}
                height={"4rem"}
                width={"100%"}
                className="mt-4"
              />
            );
          })}
        {allDiagnosisData?.map((data, i) => {
          return (
            <ul
              key={i}
              className="hover:bg-slate-50/50 transition-all duration-100 cursor-pointer grid [&>li]:text-slate-800 px-6 py-6 border-b-[1px] border-slate-200 items-center"
              style={{ gridTemplateColumns }}
              onClick={() => navigate(`/diagnosis/${data.id}`)}
            >
              <li>
                <img
                  src={data.imgURL}
                  className="w-12 h-12 rounded-md object-cover"
                />
              </li>
              <li>{formatDate(data.date_created)}</li>
              <li>
                {data.score}
                <span className="text-slate-400">/100</span>
              </li>
              <li>{data.type}</li>
              <li>
                {data.age} <span className="text-slate-400">y/o</span>
              </li>
              <li className="flex gap-2">
                {data.concerns?.length === 0 && "No concerns found"}
                {data.concerns.map((concern, j) => {
                  return <ConcernBadge key={`${j}${i}`} concern={concern} />;
                })}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
