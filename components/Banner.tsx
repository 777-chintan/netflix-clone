// react
import { useEffect, useState } from "react";

// next
import Image from "next/image";

// utils
import { Movie } from "../typing";
import { baseUrl } from "../contants/movie";

// icons
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/outline";

// recoil
import { useSetRecoilState } from "recoil";
import { modalMovieState, modalState } from "../atoms/modalAtom";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const setShowModal = useSetRecoilState(modalState);
  const setModalMovie = useSetRecoilState(modalMovieState);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] -z-10 w-full">
        <Image
          src={baseUrl + `${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
        {movie?.title || movie?.name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-2 md:space-x-4">
        <button
          className="bannerButton bg-white text-black"
          onClick={() => {
            setShowModal(true);
            setModalMovie(movie);
          }}
        >
          <FaPlay className="h-4 w-4 md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setShowModal(true);
            setModalMovie(movie);
          }}
        >
          More info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
