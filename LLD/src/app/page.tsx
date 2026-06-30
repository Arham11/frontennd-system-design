import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="mb-5 text-3xl text-gray-700">Low Level Design</h1>
      <div>
        <div className="pb-3">
          <Link href={"/shimmer"}>Shimmer</Link>
        </div>
        <div className="pb-3">
          <Link href={"/multi-lingual"}>Multilingual</Link>
        </div>
        <div className="pb-3">
          <Link href={"/inifinite-scroll"}>Inifinite scroll</Link>
        </div>
        <div className="pb-3">
          <Link href={"/accordian"}>Accordian</Link>
        </div>
        <div className="pb-3">
          <Link href={"/reddit-comment"}>Reddit comment</Link>
        </div>
        <div className="pb-3">
          <Link href={"/slider"}>Slider</Link>
        </div>
        <div className="pb-3">
          <Link href={"/pagination"}>Pagination</Link>
        </div>
      </div>
    </div>
  );
}
