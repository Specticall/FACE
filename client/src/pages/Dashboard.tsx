import DiagnosisTable from "../components/dashboard/DiagnosisTable";
import TakePictureCTA from "../components/dashboard/TakePictureCTA";
import UploadPhotoCTA from "../components/dashboard/UploadPhotoCTA";
import useDiagnosisMutation from "../hooks/diagnosis/useDiagnosisMutation";
import AnalyzingDataLoadingScreen from "./AnalyzingDataLoadingScreen";

export default function Dashboard() {
  const diagnosisMutation = useDiagnosisMutation();

  if (diagnosisMutation.isPending) {
    return <AnalyzingDataLoadingScreen />;
  }

  return (
    <div className="py-4 mt-24">
      <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>
      <ul className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
        <TakePictureCTA />
        <UploadPhotoCTA
          onInput={(base64File) => {
            diagnosisMutation.mutate({ base64_image: base64File });
          }}
        />
      </ul>
      <DiagnosisTable />
    </div>
  );
}
