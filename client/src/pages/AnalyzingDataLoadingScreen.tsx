import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function AnalyzingDataLoadingScreen() {
  return (
    <div className="grid place-items-center py-64">
      <LoadingSpinner size={"massive"} />
      <h1 className="text-4xl font-semibold mb-2 mt-12 text-center leading-[125%]">
        Analyzing Your Face
      </h1>
      <p className="text-slate-400 mt-2 text-center">
        Hang tight while we analyze your facial qualities
      </p>
    </div>
  );
}
