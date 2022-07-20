// react
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

// icons
import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import { FaPause, FaPlay } from "react-icons/fa";

// mui
import { Modal } from "@mui/material";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { modalMovieState, modalState } from "../atoms/modalAtom";

// interfaces
import { Element, Genre } from "../typing";

function TrailerModal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalMovie, setModalMovie] = useRecoilState(modalMovieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!modalMovie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          modalMovie?.media_type === "tv" ? "tv" : "movie"
        }/${modalMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      // console.log("object", data);
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [modalMovie]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-8 left-0 right-0 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="trailerModalButton h-9 w-9 absolute right-5 top-5  bg-[#181818] !z-40 border-none hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
            playing={playing}
            muted={muted}
          />
          <div className="absolute bottom-10 flex items-center justify-between px-10 w-full">
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-x-2 rounded bg-white text-black px-4 py-0.5 text-xl font-bold transition hover:bg-[#e6e6e6]"
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <FaPause className="w-7 h-7 text-black" />
                ) : (
                  <FaPlay className="w-7 h-7 text-black" />
                )}
                {playing ? "Pause" : "Play"}
              </button>
              <button className="trailerModalButton">
                <PlusIcon className="w-7 h-7" />
              </button>
              <button className="trailerModalButton">
                <ThumbUpIcon className="w-7 h-7" />
              </button>
            </div>

            <button
              className="trailerModalButton"
              onClick={() => setMuted(!muted)}
            >
              {muted ? (
                <VolumeOffIcon className="w-6 h-6" />
              ) : (
                <VolumeUpIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <div className="space-x-16 rounded-b-md bg-[#181818] px-10 py-6">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {modalMovie?.vote_average * 10}% match
              </p>
              <p className="font-light">
                {modalMovie?.release_date || modalMovie?.first_air_date}
              </p>
              <div className="flex h-4 border items-center justify-center rounded border-white/40 text-xs px-1.5">
                HD
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-x-10 gap-y-4">
              <p className="w-5/6">{modalMovie?.overview}</p>
              <div className="flex flex-col text-sm space-y-3">
                <div>
                  <span className="text-[gray]">Genre: </span>
                  {genres?.map((genre: Genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original language: </span>
                  {modalMovie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {modalMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default TrailerModal;
