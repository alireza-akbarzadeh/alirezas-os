import { MoveRight } from "lucide-react";

export function SafariFeaturedPost({
  post,
  searchQuery,
}: {
  post: any;
  searchQuery: string;
}) {
  if (!post) return null;
  return (
    <div className="mx-auto -mt-12 mb-12 max-w-5xl px-8">
      <div className="hover:shadow-3xl group overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-gray-800">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative h-64 overflow-hidden md:h-auto">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase">
              {searchQuery ? "Match" : "Featured"}
            </div>
          </div>
          <div className="flex flex-col justify-center p-8">
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              {post.date}
            </div>
            <h2 className="mb-4 text-3xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {post.title}
            </h2>
            <p className="mb-6 line-clamp-3 text-gray-600 dark:text-gray-400">
              Dive deep into the world of TypeScript and discover why it's
              become the go-to choice for modern developers building scalable
              applications.
            </p>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-semibold text-blue-600 transition-all hover:gap-3"
            >
              Read Full Article
              <MoveRight className="h-5 w-5 transition-transform group-hover/link:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
