import PostItem from "../components/Posts/PostItem";
import type { Post } from "../../interfaces/posts.interface";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/loading/Loading";
import { getPosts } from "../Apis/Posts/posts.api";

export default function MainFeed() {
    const { data, isLoading, isError, error } = useQuery<{ data: { posts: Post[] } }>({
        queryKey: ['posts'],
        queryFn: getPosts,
    });

    if (isLoading) return <Loading />;
    if (isError) return <h2>{error.message}</h2>;

    return (
        <>
            {data?.data?.posts?.map((post: Post) => (
                <PostItem key={post._id} post={post} />
            ))}
        </>
    );
}