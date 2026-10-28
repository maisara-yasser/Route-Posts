import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { deletePost } from "../../Apis/Posts/delete-post.api";
import { MdOutlineAutoDelete } from "react-icons/md";
import { savePost } from "../../Apis/Posts/save-post.api";
import { BsBookmarkCheckFill } from "react-icons/bs";


export default function DropdownCom({ postId , userId ,postsId , isEdit , fn ,initialIsSaved}: { postId: string; userId: string; postsId: string; isEdit: boolean; fn: ()=> void;initialIsSaved?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    const query = useQueryClient()
    
    const {mutate,isPending} = useMutation({
        onSuccess:()=>{
            query.invalidateQueries({queryKey:['posts']});
            query.invalidateQueries({ queryKey: ['savedPosts'] });
        },
        mutationFn:deletePost
    })
    function handleDeletePost(){
        mutate(postsId)
    }
    const [isSaved,setSaved]= useState<boolean>(initialIsSaved ?? false);

    const q = useQueryClient();
    const {mutate:bookMark} = useMutation({
        mutationFn: savePost,
        onSuccess:()=>{
            q.invalidateQueries({queryKey:['posts' ]});
            q.invalidateQueries({queryKey:['savedPosts']});
            setSaved((prev) => !prev)
        }
    })
  return (
    <>
        <div className=" flex items-center justify-center">
            <div className="relative inline-block text-left">
                <button onClick={toggleDropdown}
                    className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 cursor-pointer">
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
                        className="lucide lucide-ellipsis"
                        aria-hidden="true"
                    >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                        <circle cx={5} cy={12} r={1} />
                    </svg>
                </button>
                { isOpen &&
                    <div id="dropdown-menu" className="origin-top-right absolute z-20 right-0 mt-2 w-36 rounded-md shadow-lg bg-white ">
                        <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                            <a 
                                onClick={() => bookMark(postsId)}
                                className="flex items-center gap-2  block rounded-md px-1 py-2 text-sm text-gray-900 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem">
                                {isSaved && <> 
                                        <BsBookmarkCheckFill />
                                        Saved Post
                                    </>
                                }
                                {!isSaved && <>
                                        <CiBookmark /> Save Post
                                    </>
                                }
                                
                            </a>
                            
                            {
                            postId === userId &&
                            <>
                                {
                                    isEdit && 
                                <a
                                    onClick={fn}
                                    className="flex items-center gap-2 block rounded-md px-1 py-2 text-sm text-gray-900 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem">
                                    <CiEdit />
                                    Edit Post
                                </a>
                                }
                                <a onClick={handleDeletePost}
                                    className="flex items-center gap-2 block rounded-md px-1 py-2 text-sm text-red-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer" role="menuitem">
                                    {isPending? <>
                                    <MdOutlineAutoDelete/>
                                    Delete ...
                                    </> :
                                    <>
                                    <RiDeleteBinLine />
                                    Delete Post
                                    </>
                                    }
                                </a>
                            </>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>

    </>
  )
}
