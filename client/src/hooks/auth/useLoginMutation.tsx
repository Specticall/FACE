import { useMutation } from "@tanstack/react-query";
import { API } from "../../API/API";
import { APIResponse } from "../../lib/types";
import { useNavigate } from "react-router-dom";

export default function useLoginMutation() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (data: { access_token: string }) =>
      API.post<APIResponse<{ token: string }>>("/auth/login", data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.data.token);
      navigate("/dashboard");
    },
    onError: () => {
      console.log("Failed to login");
    },
  });

  return loginMutation;
}
