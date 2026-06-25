interface IMemeItemProps {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
}

function MemesCard({ memeItem }: Readonly<{ memeItem: IMemeItemProps }>) {
  return (
    <div className="p-3 h-full border border-gray-500 rounded-lg">
      <p className="pb-2.5 truncate">Author = {memeItem.author}</p>
      <div className="flex items-center justify-center h-50">
        <img
          src={memeItem.url}
          alt={memeItem.title}
          className="mx-auto max-h-50"
        />
      </div>
    </div>
  );
}

export default MemesCard;
