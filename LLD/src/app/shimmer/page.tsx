"use client";

import { useEffect, useState } from "react";
import MemesCard from "./MemesCard";
import Shimmer from "./shimmer";

function Page() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    async function getMemes() {
      const getData = await fetch("https://meme-api.com/gimme/20");
      const result = await getData.json();
      setMemes(result.memes);
    }
    getMemes();
  }, []);

  return (
    <div className="px-5">
      <h1 className="py-4 font-bold text-3xl">
        This is a Memes Page with Shimmer UI
      </h1>
      <div className="flex flex-wrap -mx-3">
        {(!memes.length &&
          new Array(20).fill(null).map((_, i) => (
            <div className="w-1/4 px-3 mb-6" key={i}>
              <Shimmer />
            </div>
          ))) ||
          memes.map((memeItem, i) => (
            <div className="w-1/4 px-3 mb-6" key={i}>
              <MemesCard memeItem={memeItem} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Page;
