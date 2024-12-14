import Skeleton from "react-loading-skeleton";
import { Diagnosis } from "../../lib/types";
import { cn } from "../../lib/utils";

const details = {
  Oily: "Oily skin is characterized by a shiny, humid appearance, often with visible pores. This is due to overactive sebaceous glands producing excess oil (sebum). The condition is largely influenced by genetics and hormonal factors, which is why it's common in adolescents and young adults, particularly those under 30. Oily skin is also often associated with acne, as the overproduction of sebum can clog pores.",

  Normal:
    "Normal skin is well-balanced, neither too oily nor too dry. It has a smooth, even texture, minimal imperfections, and is not prone to breakouts or irritation. People with normal skin usually have a healthy glow with small, nearly invisible pores.",

  Dry: "Dry skin feels tight and rough, often appearing flaky or dull. This skin type lacks moisture due to insufficient oil production by the sebaceous glands. Dry skin may feel itchy or uncomfortable and is more prone to developing fine lines and wrinkles. External factors like weather, harsh cleansers, or aging can also contribute to dryness.",

  Combination:
    "Combination skin exhibits characteristics of both oily and dry skin. Typically, the T-zone (forehead, nose, and chin) is oily, while other areas like the cheeks remain dry or normal. People with this skin type may experience fluctuations in oil production depending on environmental factors, hormonal changes, or skincare routines.",
} as const;
const types = Object.keys(details);

type Props = {
  diagnosis?: Diagnosis;
  isLoading: boolean;
};

export default function SkinType({ diagnosis, isLoading }: Props) {
  return (
    <>
      <p className="text-slate-800 font-semibold mt-12">Your Skin Type</p>
      <ul className="grid grid-cols-4 mt-6 place-items-center gap-4 max-md:grid-cols-2">
        {types.map((type) => {
          if (isLoading) {
            return (
              <Skeleton
                height={"3rem"}
                width={"100%"}
                containerClassName="w-full"
              />
            );
          }

          return (
            <li
              className={cn(
                "border border-slate-200 rounded-md w-full text-center py-3",
                diagnosis?.type === type &&
                  "bg-gradient-to-r from-[#E5FAFF] to-[#FFE1FA] font-semibold border-none"
              )}
            >
              {type}
            </li>
          );
        })}
      </ul>
      {isLoading && (
        <div className="mt-4">
          <Skeleton count={4} className="mt-3" />
        </div>
      )}
      <p className="leading-[230%] mt-6 text-slate-500">
        {diagnosis?.type && details[diagnosis?.type as keyof typeof details]}
      </p>
    </>
  );
}
