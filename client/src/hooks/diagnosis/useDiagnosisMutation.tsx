import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../API/API";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../../lib/config";
import { APIResponse } from "../../lib/types";

export default function useDiagnosisMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const diagnosisMutation = useMutation({
    mutationFn: (data: { base64_image: string }) =>
      API.post<APIResponse<{ id: number }>>("/diagnosis", data),
    onSuccess: (data) => {
      navigate(`/diagnosis/${data.data.data.id}`);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DIAGNOSIS] });
    },
    onError: () => {
      console.log("Something went wrong");
    },
  });

  return diagnosisMutation;
}
