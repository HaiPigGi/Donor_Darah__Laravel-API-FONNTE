import axios from "axios";
import { useEffect, useState, Suspense } from "react";

export default function ArticleSection() {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;
    const [posts, setPosts] = useState([]);

    const getAllDataPost = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/posts/all-data`);
            setPosts(response.data.posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const ShowAllCards = () => {
        return posts.map((post) => {
            return (
                <li className="rounded-md text-center w-[20rem] h-[25rem] relative hover:transform border-2">
                    <Suspense fallback={<p className="text-black">Loading ...</p>}>
                        <img
                            src={post.image.url}
                            alt={post.title}
                            layout="fill"
                            className="object-cover mx-auto rounded-md w-full h-full"
                        />
                    </Suspense>
                    <h1 className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent text-white rounded-b-md text-xl font-bold flex items-center justify-center">
                        {post.title}
                    </h1>
                </li>
            );
        });
    };

    useEffect(() => {
        getAllDataPost();
    }, []);

    return (
        <section className="h-screen overflow-hidden relative">
            <section className="bg-white h-[45rem] p-5">
                <div className="md:container mx-auto">
                    <h1 className="text-5xl font-Title text-center">Artikel</h1>
                    <div className="">
                        <Suspense fallback={<p className="text-black">Loading ...</p>}>
                            <ul className="overflow-x-auto grid grid-flow-col grid-row-2 gap-4 py-10 items-center h-[40rem]">
                                <ShowAllCards />
                            </ul>
                        </Suspense>
                    </div>
                </div>
            </section>
        </section>
    );
}
