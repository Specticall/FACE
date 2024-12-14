import Skeleton from "react-loading-skeleton";
import { Diagnosis } from "../../lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

type Props = {
  diagnosis?: Diagnosis;
  isLoading: boolean;
};

export default function SkinConcerns({ diagnosis, isLoading }: Props) {
  if (isLoading) {
    return (
      <div>
        <Skeleton height={"1rem"} width={"8rem"} className="mt-8" />
        <Skeleton
          height={"3rem"}
          containerClassName="w-full"
          className="mt-4"
        />
        <Skeleton
          height={"3rem"}
          containerClassName="w-full"
          className="mt-4"
        />
      </div>
    );
  }

  if (diagnosis?.concerns?.length === 0) return;

  return (
    <>
      <p className="text-slate-800 font-semibold mt-12 mb-6">
        Skin Concerns
        <span className="text-slate-400 font-semibold">
          {" "}
          {diagnosis?.concerns?.length}
        </span>
      </p>
      <Accordion type="single" className="grid gap-4" collapsible>
        {diagnosis?.concerns?.map((concern, i) => {
          return (
            <AccordionItem
              key={i}
              value={`${concern.name}-${i}`}
              className="border border-slate-200 rounded-md px-4 py-1 shadow-[0_0_0.75rem_0.125rem_rgba(0,0,0,0.025)]"
            >
              <AccordionTrigger className=" ">
                <p className="text-slate-800 font-semibold">
                  {concern.name}{" "}
                  <span className="text-slate-600">({concern.location})</span>
                </p>
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-[200%]">
                {concern.summary}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
