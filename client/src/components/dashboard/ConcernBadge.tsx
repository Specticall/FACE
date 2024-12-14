import { Diagnosis } from "../../lib/types";

export default function ConcernBadge({
  concern,
}: {
  concern: Diagnosis["concerns"][number];
}) {
  return (
    <div className="relative px-6 py-1 rounded-full cursor-pointer hover:bg-slate-50 transition-all duration-200 border-slate-200 border group ">
      {concern.name}
      <div className="absolute bottom-12 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 left-[50%] translate-x-[-50%] w-fit min-w-64 leading-[175%] text-slate-400 bg-white border border-slate-200 rounded-md px-6 py-4">
        {concern.summary}
      </div>
    </div>
  );
}
