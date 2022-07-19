import Image from "next/image";
import { Movie } from "../../typing";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 md:hover:scale-105 md:h-36 md:min-w-[260px] ease-out">
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
