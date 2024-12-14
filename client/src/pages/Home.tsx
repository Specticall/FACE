import { useGoogleLogin } from "@react-oauth/google";
import Button from "../components/ui/Button";
import heroImg from "/hero-image.png";
import useLoginMutation from "../hooks/auth/useLoginMutation";
import { useState } from "react";

export default function Home() {
  const loginMutation = useLoginMutation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      loginMutation.mutate({ access_token });
    },
  });

  return (
    <div className="grid grid-cols-2 gap-8 items-center pb-48 pt-32 max-lg:flex max-lg:flex-col-reverse overflow-x-hidden max-lg:items-center max-lg:justify-center">
      <div className="pt-8 ">
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[125%] max-lg:text-center ">
          Discover Your Skin Health with AI-Powered Insights.
        </h1>
        <p className="text-slate-400 mt-4 leading-[175%] mb-6 max-lg:text-center max-lg:max-w-[30rem] max-lg:mx-auto max-lg:mt-6 max:lg:mb-4">
          Get personalized skin assessments and expert recommendations instantly
          with cutting-edge AI technology
        </p>
        <Button
          variant={"primary"}
          className="font-medium flex items-center justify-center gap-4 max-lg:mx-auto"
          onClick={() => {
            setIsLoggingIn(true);
            login();
          }}
          isLoading={isLoggingIn}
        >
          <i className="bx bxl-google text-xl"></i>
          Login With Google
        </Button>
      </div>
      <img
        src={heroImg}
        alt="hero image"
        className="scale-[130%] max-lg:scale-[110%] z-[-1] max-lg:translate-x-[0.5rem] "
      />
    </div>
  );
}
