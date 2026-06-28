import Slider from "./Slider";

function Page() {
  const data = [
    { id: 1, title: "Slide 1", url: "https://picsum.photos/id/1015/800/400" },
    { id: 2, title: "Slide 2", url: "https://picsum.photos/id/1025/800/400" },
    { id: 3, title: "Slide 3", url: "https://picsum.photos/id/1035/800/400" },
    { id: 4, title: "Slide 4", url: "https://picsum.photos/id/1043/800/400" },
    { id: 5, title: "Slide 5", url: "https://picsum.photos/id/1050/800/400" },
  ];
  return (
    <div>
      <h1 className="mb-4 text-lg">This is a Slider Component</h1>
      <Slider data={data} />
    </div>
  );
}

export default Page;
