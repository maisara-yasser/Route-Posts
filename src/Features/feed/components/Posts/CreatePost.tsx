import type React from "react";
import { useContext, useState } from "react";
import { HiX } from "react-icons/hi";
import { addPost } from "../../Apis/Posts/add-post.api";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineClear } from "react-icons/md";
import { ImSpinner9 } from "react-icons/im";
import { authContext } from "../../../../context/auth.context";



export default function CreatePost() {
    const context = useContext(authContext);
    
    if (!context) {
        throw new Error("Auth context is not available");
    }

    const { user } = context;

    const [body, setBody] = useState<string>('');
    const [image, setImage] = useState<File|null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const queryClient =  useQueryClient();
    const {isPending,mutate} = useMutation({
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey:['posts']});
        },
        mutationFn: addPost,
    });

    function handleBody(e:React.ChangeEvent<HTMLTextAreaElement>){
        setBody(e.target.value);
    }
    function handleImage(e:React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if(!file) return;
            setImage(file);  
        const imgSrc = URL.createObjectURL(file);
        setImagePreview(imgSrc);
    }
    async function handlePost(){
        const formData = new FormData();
        formData.append('body', body);
        if(image)
            formData.append('image', image);

        mutate(formData);
        handleCancel();
        // const x = await addPost(formData);
        // console.log(x);
    }
    function handleCancel(){
        setBody('');
        setImage(null);
        setImagePreview('');
    }

  return (
    <>
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-start gap-3">
            <img
                alt={user?.name}
                className="h-11 w-11 rounded-full object-cover"
                src={user?.photo}
            />
            <div className="flex-1">
                <p className="text-base font-extrabold text-slate-900">
                    {user?.name}
                </p>
                <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
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
                    className="lucide lucide-earth"
                    aria-hidden="true"
                >
                    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                    <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                    <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                    <circle cx={12} cy={12} r={10} />
                </svg>
                <select className="bg-transparent outline-none">
                    <option value="public">Public</option>
                    <option value="following">Followers</option>
                    <option value="only_me">Only me</option>
                </select>
                </div>
            </div>
            </div>
            <div className="relative">
            <textarea
                onChange={handleBody}
                rows={4}
                placeholder={`What's on your mind, ${user?.name.split(" ",1)}?`}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
                value={body}
            />
            </div>
            {imagePreview && (
                <div className="relative w-50 h-50 m-2">
                    <button onClick={()=>setImagePreview('')} className="absolute top-1 right-1 text-xl rounded-full text-white bg-gray-800 opacity-70 cursor-pointer"><HiX /></button>
                    <img src={imagePreview} alt="" className="rounded-md" />
                </div>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
            <div className="relative flex items-center gap-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
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
                    className="lucide lucide-image text-emerald-600"
                    aria-hidden="true"
                >
                    <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                    <circle cx={9} cy={9} r={2} />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span className="hidden sm:inline">Photo/video</span>
                <input accept="image/*" className="hidden" type="file" onChange={handleImage} />
                </label>
                <button
                type="button"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
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
                    className="lucide lucide-smile text-amber-500"
                    aria-hidden="true"
                >
                    <circle cx={12} cy={12} r={10} />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1={9} x2="9.01" y1={9} y2={9} />
                    <line x1={15} x2="15.01" y1={9} y2={9} />
                </svg>
                <span className="hidden sm:inline">Feeling/activity</span>
                </button>
            </div>
            <div className="flex items-center gap-3">
                <button
                onClick={handleCancel}
                // disabled
                className="flex items-center gap-2 rounded-lg bg-gray-200 px-5 py-2 text-sm font-extrabold text-black shadow-sm transition-colors hover:bg-gray-300 disabled:opacity-60"
                >
                Cancel
                <MdOutlineClear/>
                </button>
                <button
                onClick={handlePost}
                // disabled
                className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
                >
                {isPending?'Posting ...  ' : 'Post' }
                {isPending?
                    <ImSpinner9 className="animate animate-spin"/>
                :
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
                        className="lucide lucide-send"
                        aria-hidden="true"
                    >
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                        <path d="m21.854 2.147-10.94 10.939" />
                    </svg> 
                }
                </button>
                
            </div>
            </div>
            
        </div>
    </>
  );
}
