import { Link } from 'react-router-dom';
import { timeAgo } from '../../../../Utilitis/time-age';
import type { Post } from '../../../interfaces/posts.interface'
import AddComment from '../Comments/AddComment';
import DropdownCom from './DropdownCom';
import { useContext, useState } from 'react';
import { authContext } from '../../../../context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { likePost } from '../../Apis/likes/like.api';
import { updatePost } from '../../Apis/Posts/update-post.api';



export default function PostItem({ post , isSaved = false }: { post: Post ; isSaved?: boolean}) {

    const context = useContext(authContext);
    if (!context)
        throw new Error("Auth context is not available");
    const { user } = context;

    // console.log(user._id);
    const [isEdit, setEdit] = useState<boolean>(false);

    function handleEdit() {
        setEdit(true)
    }
    function cancelEdit() {
        setEdit(false)
    }

    const query = useQueryClient();
    const { mutate, data, isPending } = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['posts' ] });
            query.invalidateQueries({ queryKey: ['savedPosts'] });
        }
    })

    
    // console.log(data);


    if (isEdit) {
        return (
            <>
                <EditPost post={post} cancelEdit={cancelEdit} userId={user?._id ?? ''} />
            </>
        )
    }
    if (!isEdit) {

        return (
            <>
                <article className="overflow-visible mb-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="p-4">
                        {/* Post Header */}
                        <div className="flex items-center gap-3">
                            <a className="shrink-0" href="#/profile" data-discover="true">
                                <img alt={post.user.name}
                                    className="h-11 w-11 rounded-full object-cover"
                                    src={
                                        post.user.photo ||
                                        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                                    } />
                            </a>
                            <div className="min-w-0 flex-1">
                                <a
                                    className="truncate text-sm font-bold text-foreground hover:underline"
                                    href="#/profile" data-discover="true" >
                                    {post.user.name}
                                </a>
                                <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                                    {post.user.username}
                                    <button type="button"
                                        className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline" >
                                        {timeAgo(post?.createdAt)}
                                    </button>
                                    <span className="mx-1">.</span>
                                    <span className="relative inline-flex items-center">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={11}
                                                height={11}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-earth"
                                                aria-hidden="true"
                                            >
                                                <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                                                <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                                                <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                                                <circle cx={12} cy={12} r={10} />
                                            </svg>
                                            Public
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={12}
                                                height={12}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-chevron-down"
                                                aria-hidden="true"
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div className="relative">
                                <DropdownCom isEdit={true} fn={handleEdit} postId={post.user._id} postsId={post._id} userId={user?._id ?? ''} initialIsSaved={isSaved || post.bookmarked || false}/>
                            </div>
                        </div>
                        {/* Post body */}
                        <div className="mt-3">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                                {post.body}
                            </p>
                        </div>

                    </div>
                    {/* Post Image */}
                    {post.image && (
                        <div className="max-h-[620px] overflow-hidden border-y border-slate-200">
                            <button
                                type="button"
                                className="group relative block w-full cursor-zoom-in"
                            >
                                <img
                                    alt={post.user.name}
                                    className="w-full object-cover"
                                    src={post.image}
                                />
                                <span className="cursor-pointer absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                            </button>
                        </div>
                    )}
                    {/* Post Actions */}
                    <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={12}
                                        height={12}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-thumbs-up"
                                        aria-hidden="true"
                                    >
                                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                                        <path d="M7 10v12" />
                                    </svg>
                                </span>
                                <Link to={`/postDetails/${post.id}`}
                                    className="font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline"
                                >
                                    {post.likesCount} Likes
                                </Link>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
                                <button className='cursor-pointer hover:bg-gray-50 px-2 rounded-md hover:text-blue-500 hover:font-bold'>
                                    <span className="inline-flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={13}
                                            height={13}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-repeat2 lucide-repeat-2"
                                            aria-hidden="true"
                                        >
                                            <path d="m2 9 3-3 3 3" />
                                            <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                                            <path d="m22 15-3 3-3-3" />
                                            <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                                        </svg>
                                        {post.sharesCount} shares
                                    </span>
                                </button>
                                <Link to={`/postDetails/${post.id}`} className='cursor-pointer hover:bg-gray-50 px-2 rounded-md hover:text-blue-500 hover:font-bold'>
                                    <span>{post.commentsCount} comments</span>
                                </Link>
                                <Link to={`/postDetails/${post.id}`} className="cursor-pointer rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                                    View details
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mx-4 border-t border-slate-200" />
                    <div className="grid grid-cols-3 gap-1 p-1">
                        <button
                            disabled={isPending}
                            onClick={() => mutate(post._id)}
                            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
                        >
                            {data?.data?.liked ? <>
                                <BiSolidLike className='text-blue-400' /> <span className='text-blue-500'>Like</span>
                            </> : <>
                                <BiLike /> <span>Like</span>
                            </>
                            }
                        </button>
                        <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-message-circle"
                                aria-hidden="true"
                            >
                                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                            </svg>
                            <span>Comment</span>
                        </button>
                        <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-share2 lucide-share-2"
                                aria-hidden="true"
                            >
                                <circle cx={18} cy={5} r={3} />
                                <circle cx={6} cy={12} r={3} />
                                <circle cx={18} cy={19} r={3} />
                                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                            </svg>
                            <span>Share</span>
                        </button>
                    </div>
                    {/* AddComment */}
                    <AddComment post={post} />
                </article>
            </>
        );
    }

}

export function EditPost({ post, cancelEdit, userId }: { post: Post; cancelEdit: () => void; userId: string }) {
    const query = useQueryClient();
    const { mutate, data, isPending } = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    const [content, setContent] = useState<string>(post.body ?? '');

    const Query = useQueryClient();
    
    const {mutate:update,isPending:updatePending} = useMutation({
        mutationFn: updatePost,
        onSuccess:()=>{
            Query.invalidateQueries({queryKey:['posts']});
            cancelEdit();
        }
    })

    function handleSave() {
        const safeContent = content ?? '';
        update({ postId: post._id, body: safeContent });
    }

    return (
        <>
            <article className="overflow-visible mb-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="p-4">
                    {/* Post Header */}
                    <div className="flex items-center gap-3">
                        <a className="shrink-0" href="#/profile" data-discover="true">
                            <img alt={post.user.name}
                                className="h-11 w-11 rounded-full object-cover"
                                src={
                                    post.user.photo ||
                                    "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                                } />
                        </a>
                        <div className="min-w-0 flex-1">
                            <a
                                className="truncate text-sm font-bold text-foreground hover:underline"
                                href="#/profile" data-discover="true" >
                                {post.user.name}
                            </a>
                            <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                                {post.user.username}
                                <button type="button"
                                    className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline" >
                                    {timeAgo(post?.createdAt)}
                                </button>
                                <span className="mx-1">.</span>
                                <span className="relative inline-flex items-center">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={11}
                                            height={11}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-earth"
                                            aria-hidden="true"
                                        >
                                            <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                                            <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                                            <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                                            <circle cx={12} cy={12} r={10} />
                                        </svg>
                                        Public
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={12}
                                            height={12}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-chevron-down"
                                            aria-hidden="true"
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="relative">
                            <DropdownCom isEdit={false} fn={cancelEdit} postId={post.user._id} postsId={post._id} userId={userId} />
                        </div>
                    </div>
                    {/* Post body */}
                    <div className="mt-3">
                        <h3 className="text-sm font-bold mb-2">Edit Post</h3>
                        <textarea
                            defaultValue={post.body}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#1877f2] focus:ring-2"
                        />
                        <div className="mt-2 flex items-center justify-end gap-2">
                            <button
                                onClick={cancelEdit}
                                disabled={updatePending}
                                className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={updatePending}
                                className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#166fe5] cursor-pointer"
                            >
                                {updatePending ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                    {/* <div className="mt-3">
                        <textarea
                            maxLength={5000}
                            className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:ring-2"
                            defaultValue={
                                'Route Posts\n<div>\n  create poste "test"<div className="mt-2 flex items-center justify-end gap-2"><button className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100">Cancel</button><button className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#166fe5] disabled:opacity-60">Save</button></div><div className="max-h-[620px] overflow-hidden border-y border-slate-200"><button type="button" className="group relative block w-full cursor-zoom-in"><img alt="post" className="w-full object-cover" src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1790860237676-8f534bf0-d509-43c9-9b01-16847023cd3e-wepik-export-20230805104111EHVj.webp" /><span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" /></button></div><div className="px-4 pb-2 pt-3 text-sm text-slate-500"><div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2"><span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white"><svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up" aria-hidden="true"><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /><path d="M7 10v12" /></svg></span><button type="button" className="font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline">1 likes</button></div><div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm"><span className="inline-flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat2 lucide-repeat-2" aria-hidden="true"><path d="m2 9 3-3 3 3" /><path d="M13 18H7a2 2 0 0 1-2-2V6" /><path d="m22 15-3 3-3-3" /><path d="M11 6h6a2 2 0 0 1 2 2v10" /></svg>0 shares</span><span>5 comments</span><button className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">View details</button></div></div></div><div className="mx-4 border-t border-slate-200" /><div className="grid grid-cols-3 gap-1 p-1"><button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm bg-[#e7f3ff] text-[#1877f2]"><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up" aria-hidden="true"><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /><path d="M7 10v12" /></svg><span>Like</span></button><button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg><span>Comment</span></button><button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2 lucide-share-2" aria-hidden="true"><circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg><span>Share</span></button></div><div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3"><p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">Top Comment</p><div className="flex items-start gap-2"><img alt="Maisara Yasser" className="h-8 w-8 rounded-full object-cover" src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1791277934096-76767a2b-51fa-44a5-8841-fcfefdc10a29-MyImg.webp" /><div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2"><p className="truncate text-xs font-bold text-slate-900">Maisara Yasser</p><p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">test comment</p></div></div><button className="mt-2 text-xs font-bold text-[#1877f2] hover:underline">View all comments</button></div>\n</div>\n'
                            }
                        />
                    </div> */}
                </div>
                {/* Post Image */}
                {post.image && (
                    <div className="max-h-[620px] overflow-hidden border-y border-slate-200">
                        <button
                            type="button"
                            className="group relative block w-full cursor-zoom-in"
                        >
                            <img
                                alt={post.user.name}
                                className="w-full object-cover"
                                src={post.image}
                            />
                            <span className="cursor-pointer absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                        </button>
                    </div>
                )}
                {/* Post Actions */}
                <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={12}
                                    height={12}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-thumbs-up"
                                    aria-hidden="true"
                                >
                                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                                    <path d="M7 10v12" />
                                </svg>
                            </span>
                            <Link to={`/postDetails/${post.id}`}
                                className="font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline"
                            >
                                {post.likesCount} Likes
                            </Link>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
                            <button className='cursor-pointer hover:bg-gray-50 px-2 rounded-md hover:text-blue-500 hover:font-bold'>
                                <span className="inline-flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={13}
                                        height={13}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-repeat2 lucide-repeat-2"
                                        aria-hidden="true"
                                    >
                                        <path d="m2 9 3-3 3 3" />
                                        <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                                        <path d="m22 15-3 3-3-3" />
                                        <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                                    </svg>
                                    {post.sharesCount} shares
                                </span>
                            </button>
                            <Link to={`/postDetails/${post.id}`} className='cursor-pointer hover:bg-gray-50 px-2 rounded-md hover:text-blue-500 hover:font-bold'>
                                <span>{post.commentsCount} comments</span>
                            </Link>
                            <Link to={`/postDetails/${post.id}`} className="cursor-pointer rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                                View details
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mx-4 border-t border-slate-200" />
                <div className="grid grid-cols-3 gap-1 p-1">
                    <button
                        disabled={isPending}
                        onClick={() => mutate(post._id)}
                        className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
                    >
                        {data?.data?.liked ? <>
                            <BiSolidLike className='text-blue-400' /> <span className='text-blue-500'>Like</span>
                        </> : <>
                            <BiLike /> <span>Like</span>
                        </>
                        }
                    </button>
                    <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-message-circle"
                            aria-hidden="true"
                        >
                            <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                        </svg>
                        <span>Comment</span>
                    </button>
                    <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-share2 lucide-share-2"
                            aria-hidden="true"
                        >
                            <circle cx={18} cy={5} r={3} />
                            <circle cx={6} cy={12} r={3} />
                            <circle cx={18} cy={19} r={3} />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                        </svg>
                        <span>Share</span>
                    </button>
                </div>
                {/* AddComment */}
                <AddComment post={post} />
            </article>
        </>
    )
}
