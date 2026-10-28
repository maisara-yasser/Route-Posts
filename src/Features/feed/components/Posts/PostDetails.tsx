import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { getSinglePosts } from "../../Apis/Posts/post.api";
import PostItem from "./PostItem";
import Loading from "../../../../Components/loading/Loading";
import { MdKeyboardBackspace } from "react-icons/md";
import PostDetailsError from "./PostDetailsError";
import Comments from "../Comments/Comments";

export default function PostDetails() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        refetchOnMount: false,
        enabled: !!id,
        queryKey: ['post', id],
        queryFn: () => getSinglePosts(id!),
    });

    // console.log(data?.data?.post);
    if (isLoading) return <Loading></Loading>;
    if (isError) return <PostDetailsError errorMsg={error.message} />;


    return (
        <>
            <div className="mx-auto my-5 w-full max-w-3xl px-3">
                <Link to={'/feed'} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 mb-1.5" > <MdKeyboardBackspace /> Back</Link>
                <PostItem post={data?.data?.post} />
                {/* Comments */}
                <Comments id={id!} />
            </div>
        </>
    )
}
