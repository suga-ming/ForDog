import { useRef } from "react";
import { ITagContainer } from "../newFeed";

export const HashTag = ({ tag, tags, setTag, setTags }: ITagContainer) => {
  const ref = useRef<HTMLInputElement>(null);
  const onClick = () => {
    ref.current?.focus();
  };

  const onTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.currentTarget.value;

    if (str[str.length - 1] === " " && str.replace(/\s/gi, "") !== "") {
      const newTags = Array.from(new Set([...tags, str.replace(/\s/gi, "")]));
      setTags(newTags);
      setTag("");
    } else setTag(e.currentTarget.value);
  };

  const onDeleteTag = (tag: string) => {
    const newTags = [...tags].filter((v) => v !== tag);
    setTags(newTags);
  };

  return (
    <div
      className="border-[1px] border-mono-3 rounded-md py-1.5 px-4 min-h-[100px] space-x-1.5"
      onClick={onClick}
    >
      {tags.map((value, idx) => (
        <button
          type="button"
          key={idx}
          className="bg-pet_pink mb-2 py-0.5 px-3 text-white rounded-3xl space-x-1 cursor-default"
        >
          <span className="text-sm font-bold"> #{value}</span>
          <span
            className="inline-block p-1 pr-0 text-sm cursor-pointer"
            onClick={() => onDeleteTag(value)}
          >
            X
          </span>
        </button>
      ))}

      {tags.length < 6 ? (
        <input
          type="text"
          ref={ref}
          className="border-0 w-20 mt-2 focus:outline-none"
          value={tag}
          onChange={onTagChange}
          maxLength={5}
          placeholder="태그 입력"
        />
      ) : null}
    </div>
  );
};
