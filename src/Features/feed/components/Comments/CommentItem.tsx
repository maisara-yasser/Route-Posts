import { timeAgo } from "../../../../Utilitis/time-age";
import type { CommentInterface } from "../../../interfaces/Comments.interface";
import { AiOutlineLike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import DropDownComm from "./DropDownComm";
import { useContext, useState } from "react";
import { authContext } from "../../../../context/auth.context";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../Apis/comment/delete-comment.api";
import { updateComment } from "../../Apis/comment/update-comment.api";

export default function CommentItem({ comment, postId }: { comment: CommentInterface; postId: string }) {
    const context = useContext(authContext);

    if (!context) {
        throw new Error("Auth context is not available");
    }

    const { user } = context;

    const queryClient = useQueryClient();

    const { mutate: removeComment, isPending: isDeleting } = useMutation({
        mutationFn: deleteComment,
        onSuccess: (data) => {
            toast.success(data?.message || "Comment deleted");
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Could not delete comment"
            );
        },
    });

    const handleDelete = () => {
        removeComment({
            postId,
            commentId: comment._id,
        });
    };
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content ?? "");

    const { mutate: saveComment, isPending: isUpdating } = useMutation({
        mutationFn: updateComment,
        onSuccess: (data) => {
            toast.success(data?.message || "Comment updated");
            setIsEditing(false);
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Could not update comment"
            );
        },
    });
    const handleEdit = () => {
        setEditContent(comment.content ?? "");
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        const formData = new FormData();
        formData.append("content", editContent);

        saveComment({
            postId,
            commentId: comment._id,
            formData,
        });
    };


    return (
        <div className="flex items-start my-2  space-x-2">
            {/* صورة المستخدم وبطاقة التعريف (Tooltip) */}
            <div className="group relative flex flex-shrink-0 self-start cursor-pointer">
                <img
                    {...{ "x-on:mouseover": "open1 = true", "x-on:mouseleave": "open1 = false", }}
                    src={comment.commentCreator.photo || "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"}
                    alt={comment.commentCreator.username}
                    className="h-8 w-8 object-fill rounded-full"
                />
            </div>
            {/* محتوى التعليق */}
            <div className="flex flex-col">
                <div className="flex  items-center space-x-2">
                    <div className="bg-gray-100 w-60 rounded-xl px-2 py-1">
                        <div className="font-medium">
                            <a href="#" className="underline hover:text-gray-600  text-sm font-bold">
                                {comment.commentCreator.username}
                            </a>
                        </div>
                        <div className="text-xs ms-1.5 text-gray-800 mt-1">
                            {isEditing ? (
                                <div className="mt-2">
                                    <textarea
                                        value={editContent}
                                        onChange={(event) => setEditContent(event.target.value)}
                                        className="w-full rounded border p-2"
                                    />

                                    <div className="mt-2 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleSaveEdit}
                                            disabled={isUpdating || !editContent.trim()}
                                        >
                                            {isUpdating ? "Saving..." : "Save"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            disabled={isUpdating}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                comment.content
                            )}
                            {
                                comment.image &&
                                <img src={comment.image} className="py-2 rounded" alt="" />
                            }
                        </div>
                    </div>
                </div>
                {/* تفاعلات التعليق (إعجاب، رد، الوقت) */}
                <div className="flex justify-start items-center text-xs w-full mt-1 px-1">
                    <div className="font-semibold text-gray-700 flex items-center space-x-1">
                        <button className="cursor-pointer hover:underline">
                            {comment.likes}
                            <small className="text-[14px] hover:text-blue-600"> <AiOutlineLike /></small>
                        </button>
                        <small className="self-center">.</small>
                        <button className="hover:underline cursor-pointer">
                            {comment.repliesCount > 0 && comment.repliesCount}
                            <small className="text-[14px] hover:text-blue-600"> <BsReply /></small>
                        </button>
                        <small className="self-center">.</small>
                        <button className="hover:underline text-gray-500">
                            <small className="text-[12px]">{timeAgo(comment.createdAt)}</small>
                        </button>
                    </div>
                </div>
            </div>
            <DropDownComm commentCreatorId={comment.commentCreator._id} currentUserId={user?._id ?? ""} onEdit={handleEdit} onDelete={handleDelete} isDeleting={isDeleting} />
        </div>
    );
}


