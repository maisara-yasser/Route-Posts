import { useState } from "react";
import type { Post } from "../../../interfaces/posts.interface";
import { addComment } from "../../Apis/comment/add-comment.api";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { HiX } from "react-icons/hi";
import { toast } from "react-toastify";

export default function AddComment({ post }: { post: Post }) {

    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<File|null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const query =  useQueryClient();
    const {data,mutate} = useMutation({
        onSuccess : (data) => {
            query.invalidateQueries({queryKey:['comments', post._id]});
            toast.success(data?.message );
        },
        mutationFn: addComment,
    });
    console.log(data);
    
// stop video 11:30 min 
    function handleContent(e:React.ChangeEvent<HTMLInputElement>){
        setContent(e.target.value);
    }
    function handleImage(e:React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if(!file) return;
            setImage(file);  
        const imgSrc = URL.createObjectURL(file);
        setImagePreview(imgSrc);
    }
    async function handleComment(){
        const formData = new FormData();
        formData.append('content', content);
        if(image)
            formData.append('image', image);

        mutate({formData,postId:post._id});
        handleCancel();
    }
    function handleCancel(){
        setContent('');
        setImage(null);
        setImagePreview('');
    }
    
    return (
        <>
            <div className="mt-3 p-2">
                <div className="flex items-start gap-2">
                    <img
                        alt={post.user.name}
                        className="h-9 w-9 rounded-full object-cover"
                        src={post.user.photo ||
                            "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"} />
                    <div className="w-full rounded-2xl border border-slate-200 px-2.5 py-1.5 focus-within:border-[#c7dafc]  "
                        data-comment-mention-root="true">
                        <input type="text" 
                            className='rounded-lg border-0 bg-gray-100 focus-within:bg-gray-200 w-full focus:border-2 border-blue-200' placeholder='add your comment ...' 
                            onChange={handleContent}
                            value={content}
                        />
                        <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-image"
                                        aria-hidden="true"
                                    >
                                        <rect
                                            width={18}
                                            height={18}
                                            x={3}
                                            y={3}
                                            rx={2}
                                            ry={2}
                                        />
                                        <circle cx={9} cy={9} r={2} />
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                    </svg>
                                    <input accept="image/*" className="hidden" type="file" onChange={handleImage} />
                                </label>
                                <button type="button"
                                    className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-amber-500" >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-smile"
                                        aria-hidden="true"
                                    >
                                        <circle cx={12} cy={12} r={10} />
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                        <line x1={9} x2="9.01" y1={9} y2={9} />
                                        <line x1={15} x2="15.01" y1={9} y2={9} />
                                    </svg>
                                </button>
                            </div>
                            <button onClick={handleComment}
                                className="inline-flex cursor-pointer h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100" >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-send-horizontal"
                                    aria-hidden="true"
                                >
                                    <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                                    <path d="M6 12h16" />
                                </svg>
                            </button>
                        </div>
                        {imagePreview && (
                            <div className="relative w-50 h-50 m-2 overflow-hidden object-cover">
                                <button onClick={()=>setImagePreview('')} className="absolute top-1 right-1 text-xl rounded-full text-white bg-gray-800 opacity-70 cursor-pointer"><HiX /></button>
                                <img src={imagePreview} alt="" className="rounded-md" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
