
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/loading/Loading";
import PostItem from "../components/Posts/PostItem";
import type { Post } from "../../interfaces/posts.interface";
import { bookMark } from "../Apis/Posts/bookMarks.api";

export default function SavedPost() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['savedPosts'],
        queryFn: bookMark,
    });
    console.log("Saved Posts API Response:", data);
    if (isLoading) return <Loading />;
    if (isError) return <h2 className="text-red-500 text-center my-4">{(error as Error).message}</h2>;

    const savedPosts = data?.data?.bookmarks || [];
    return (
        <div className="flex flex-col gap-y-4">
            <h2 className="text-xl font-bold mb-2">Saved Posts</h2>

            {savedPosts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No saved posts yet.
                </div>
            ) : (
                savedPosts.map((post: Post) => (
                    <PostItem key={post._id} post={post} isSaved={true} />
                ))
            )}
        </div>
    );
}
