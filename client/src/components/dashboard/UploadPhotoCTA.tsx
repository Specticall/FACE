import { useRef } from "react";
import { useToast } from "../ui/Toast";

const MAX_FILE_SIZE = 0.5 * 1024 * 1024; // 0.5MB -> 500kb

type Props = {
  onInput: (base64Image: string) => void;
};

export default function UploadPhotoCTA({ onInput }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds maximum limit of 500kb");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      if (typeof base64Image !== "string") return;
      onInput(base64Image);
    };
    reader.readAsDataURL(file);
  };

  return (
    <li
      className="p-3 rounded-md shadow-[0_0_1rem_0.5rem_rgba(0,0,0,0.025)] cursor-pointer hover:opacity-75 transition-all duration-200"
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <input
        type="file"
        className="fixed z-[-100] invisible"
        ref={inputRef}
        onChange={handleChange}
      />
      <div className="px-6 py-7 flex items-center gap-8 border-[2px] border-slate-200 rounded-md border-dashed max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <i className="bx bx-upload text-[3.5rem]"></i>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Upload Photo
          </h2>
          <p className="text-slate-400 mt-1">
            Browse your device for pictures to analyze
          </p>
        </div>
      </div>
    </li>
  );
}
