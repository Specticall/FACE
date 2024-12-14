import Skeleton from "react-loading-skeleton";

type Props = {
  imageURL?: string;
};

export default function DiagnosisImage({ imageURL }: Props) {
  if (!imageURL) {
    return <Skeleton height={"40rem"} width={"100%"} />;
  }

  return (
    <img
      className="rounded-xl w-full max-lg:mb-6"
      src={imageURL}
      alt="diagnosed image"
    />
  );
}
