import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-gray-700 mb-5">Low Level Design</h1>
      <div>
        <div className="pb-3">
          <Link href={"/shimmer"}>Shimmer UI</Link>
        </div>
        <div className="pb-3">
          <Link href={"/multi-lingual"}>Multilingual UI</Link>
        </div>
        <div className="pb-3">
          <Link href={"/inifinite-scroll"}>Inifinite scroll UI</Link>
        </div>
        <div className="pb-3">
          <Link href={"/accordian"}>Accordian UI</Link>
        </div>
        <div className="pb-3">
          <Link href={"/reddit-comment"}>Reddit comment UI</Link>
        </div>
      </div>
    </div>
  );
}
