import { useQuery } from "@tanstack/react-query";
import { API } from "../../API/API";
import { QUERY_KEY } from "../../lib/config";
import { APIResponse, Diagnosis } from "../../lib/types";

export default function useAllDiagnosisQuery() {
  const allDiagnosisQuery = useQuery({
    queryFn: () => API.get<APIResponse<Diagnosis[]>>(`/diagnosis`),
    queryKey: [QUERY_KEY.DIAGNOSIS_ALL],
  });
  const allDiagnosisData = allDiagnosisQuery.data?.data.data;

  return { allDiagnosisData, allDiagnosisQuery };
}
