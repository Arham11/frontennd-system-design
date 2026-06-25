import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Low Level Design</h1>
      <div>
        <Link href={"/shimmer"}>Shimmer UI</Link>
      </div>
    </div>
  );
}
