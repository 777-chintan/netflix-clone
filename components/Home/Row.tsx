// icons
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";

// interfaces
import { Movie } from "../../typing";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      console.log(scrollLeft, clientWidth, scrollWidth);

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="relative group md:-ml-2">
        <ChevronLeftIcon
          className={`absolute left-2 top-0 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center md:p-2 space-x-0.5 md:space-x-2.5 scrollbar-hide overflow-x-scroll"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute right-2 top-0 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
