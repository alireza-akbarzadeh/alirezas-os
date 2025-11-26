import { MoveRight } from "lucide-react";

export function SafariPostList({ posts }: { posts: any[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post, index) => (
        <article
          key={post.id}
          className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-gray-800"
          style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {post.date}
            </div>
            <h3 className="mb-3 line-clamp-2 text-xl leading-snug font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {post.title}
            </h3>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-all hover:gap-3 dark:text-blue-400"
            >
              Continue Reading
              <MoveRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
