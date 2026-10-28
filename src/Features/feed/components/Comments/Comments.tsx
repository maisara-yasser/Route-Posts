import { useQuery } from "@tanstack/react-query"
import { getPostComments } from "../../Apis/comment/comment.api"
import Loading from "../../../../Components/loading/Loading";
import type { CommentInterface } from "../../../interfaces/Comments.interface";
import CommentItem from "./CommentItem";

export default function Comments({ id }: { id: string }) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => getPostComments(id!),
    })
    // console.log(data?.data?.comments);

    if (isLoading) return <Loading />

    if (isError) return <h2>{error.message}</h2>
    return (
        <>
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                {data?.data?.comments?.map((comment: CommentInterface) => (
                    <CommentItem key={comment._id} comment={comment} postId={id}></CommentItem>
                ))}
            </div>
        </>
    )
}
