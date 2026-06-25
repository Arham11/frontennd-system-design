"use client";

import { useEffect, useState } from "react";
import Shimmer from "../shimmer/shimmer";
import MemesCard from "../shimmer/MemesCard";

function Page() {
  const [memes, setMemes] = useState<any[]>([]);
  const [isShimmmer, setisShimmer] = useState<boolean>(false);

  const handleScroll = function () {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      fetchMemes();
    }
  };

  async function fetchMemes() {
    setisShimmer(true);
    const data = await fetch("https://meme-api.com/gimme/20");
    const json = await data.json();
    setisShimmer(false);
    setMemes((memes) => [...memes, ...json.memes]);
  }

  useEffect(() => {
    fetchMemes();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-5">
      <h1 className="py-4 font-bold text-3xl">
        This is a Memes Page with Shimmer UI
      </h1>
      <div className="flex flex-wrap -mx-3">
        {memes.map((memeItem, i) => (
          <div className="w-1/4 px-3 mb-6" key={i}>
            <MemesCard memeItem={memeItem} />
          </div>
        ))}
        {isShimmmer &&
          new Array(20).fill(null).map((_, i) => (
            <div className="w-1/4 px-3 mb-6" key={i}>
              <Shimmer />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Page;
