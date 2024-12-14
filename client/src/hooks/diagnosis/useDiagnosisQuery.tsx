import { useQuery } from "@tanstack/react-query";
import { API } from "../../API/API";
import { QUERY_KEY } from "../../lib/config";
import { APIResponse, Diagnosis } from "../../lib/types";

export default function useDiagnosisQuery({ id }: { id?: string }) {
  const diagnosisQuery = useQuery({
    queryFn: () => API.get<APIResponse<Diagnosis>>(`/diagnosis/${id}`),
    queryKey: [QUERY_KEY.DIAGNOSIS, id],
    enabled: Boolean(id),
  });
  const diagnosisData = diagnosisQuery.data?.data.data;

  return { diagnosisData, diagnosisQuery };
}
