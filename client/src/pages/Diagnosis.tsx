import { useNavigate, useParams } from "react-router-dom";
import SkinConcerns from "../components/diagnosis/SkinConcerns";
import SkinType from "../components/diagnosis/SkinType";
import Statistics from "../components/diagnosis/Statistics";
import useDiagnosisQuery from "../hooks/diagnosis/useDiagnosisQuery";
import DiagnosisImage from "../components/diagnosis/DiagnosisImage";

export default function Diagnosis() {
  const { diagnosisId } = useParams();
  const navigate = useNavigate();
  const { diagnosisData, diagnosisQuery } = useDiagnosisQuery({
    id: diagnosisId,
  });

  return (
    <main className="grid grid-cols-[7fr_10fr] gap-x-16 max-w-[1400px] mx-auto py-10 mt-14 max-lg:grid-cols-1 max-lg:gap-y-6">
      <div
        className="col-span-2 flex items-center mb-8 hover:opacity-40 transition-all duration-100 cursor-pointer max-lg:col-span-1 max-lg:mb-0"
        onClick={() => navigate("/dashboard")}
      >
        <i className="bx bx-chevron-left text-2xl"></i>
        Go Back
      </div>
      <DiagnosisImage imageURL={diagnosisData?.imgURL} />
      <div>
        <h2 className="font-semibold text-4xl mb-4">Diagnosis Result</h2>
        <p className="text-slate-400 mb-8">
          Please note that the results may not be entirely accurate and should
          be interpreted with caution.
        </p>
        <Statistics
          diagnosis={diagnosisData}
          isLoading={diagnosisQuery.isLoading}
        />
        <SkinType
          diagnosis={diagnosisData}
          isLoading={diagnosisQuery.isLoading}
        />
        <SkinConcerns
          diagnosis={diagnosisData}
          isLoading={diagnosisQuery.isLoading}
        />
      </div>
    </main>
  );
}
