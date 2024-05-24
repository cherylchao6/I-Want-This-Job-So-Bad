"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const posts = [
  {
    id: 1,
    title: "Best Resume Tool Ever",
    href: "#",
    description:
      "Before I struggled with crafting a resume that stood out. This tool transformed my resume into a professional and visually appealing document. Within weeks, I started getting interview calls from top companies. Highly recommended!",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Cheryl Chao",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "/person1.png",
    },
  },
  {
    id: 2,
    title: "Incredible Results",
    href: "#",
    description:
      "I was skeptical at first, but this resume optimization service exceeded my expectations. The feedback was thorough and helped me highlight my skills more effectively. I landed my dream job in just a month!",
    date: "Apr 22, 2021",
    datetime: "2021-04-22",
    category: { title: "Technology", href: "#" },
    author: {
      name: "Elon Musk",
      role: "Senior Developer",
      href: "#",
      imageUrl: "/person2.png",
    },
  },
  {
    id: 3,
    title: "A Game Changer",
    href: "#",
    description:
      "This resume tool is a game changer! It not only made my resume look more professional but also tailored it to the job descriptions perfectly. I've seen a significant increase in responses from employers.",
    date: "Feb 5, 2022",
    datetime: "2022-02-05",
    category: { title: "Business", href: "#" },
    author: {
      name: "LeBron James",
      role: "Product Manager",
      href: "#",
      imageUrl: "/person3.png",
    },
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              I Want This Job So Bad
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Transforming Resumes, Transforming Lives
            </p>
          </div>
          <div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => router.push("/resume")}
            >
              Get Your Dream Job Now
            </button>
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <Image
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                  width={200}
                  height={200}
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
