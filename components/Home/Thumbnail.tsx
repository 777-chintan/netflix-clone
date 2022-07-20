// next
import Image from "next/image";

// recoil
import { useSetRecoilState } from "recoil";
import { modalMovieState, modalState } from "../../atoms/modalAtom";

// interfaces
import { Movie } from "../../typing";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const setShowModal = useSetRecoilState(modalState);
  const setModalMovie = useSetRecoilState(modalMovieState);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 md:hover:scale-105 md:h-36 md:min-w-[260px] ease-out"
      onClick={() => {
        setShowModal(true);
        setModalMovie(movie);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        className="rounded-sm md:rounded object-cover"
      />
    </div>
  );
}

export default Thumbnail;
