import type { Notification } from "../interfaces/notify.interfaces";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComments } from "react-icons/fa6";
import { BsPersonAdd } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import { timeAgo } from "../../../Utilitis/time-age";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyRead } from "../api/notyFy.api";


export default function NotifyItem({item }:{item: Notification}) {
    
    const q = useQueryClient();

    const {mutate } = useMutation({
        onSuccess:()=>{
            q.invalidateQueries({queryKey:['notifyCount']})
            q.invalidateQueries({queryKey:['notify']})
        },
        mutationFn:notifyRead,
    })

    return (
        <>
            <article className="group relative overflow-hidden flex gap-3 rounded-xl border   transition sm:rounded-2xl  border-[#dbeafe] bg-[#edf4ff]">
                <div className="w-2 bg-blue-500 "></div>
                    <div className="p-3 sm:p-4 flex gap-3 ">
                    <div className="relative shrink-0 ">
                        <button type="button" className="block cursor-pointer">
                            <img
                                alt={item.actor.name}
                                className="h-11 w-11 rounded-full object-cover"
                                src={item.actor.photo}
                            />
                        </button>
                        <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-violet-600">
                            {item.type === 'share_post' &&  <PiShareFatLight color="brown"/>}
                            {item.type === 'like_post' &&  <IoMdHeartEmpty color="red"/> }
                            {item.type === 'comment_post' &&  <FaRegComments color="blue"/> }
                            {item.type === 'follow_user' &&  <BsPersonAdd color="orange"/> }
                            {item.type === 'mention_user' &&   <IoMdNotificationsOutline color="gray"/> }
                        </span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                            <p className="text-sm leading-6 text-slate-800">
                                <button
                                    type="button"
                                    className="font-extrabold hover:text-[#1877f2] hover:underline"
                                >
                                    {item.actor.name}
                                </button>{"  "}
                                {item.type}
                            </p>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <span className="text-xs font-semibold text-slate-500">
                                    {timeAgo(item.createdAt)}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-dot text-[#1877f2]"
                                    aria-hidden="true"
                                >
                                    <circle cx="12.1" cy="12.1" r={1} />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-0.5 text-sm text-slate-600">
                            {/* {item.createdAt} */}
                            {item.entity.body}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <button
                                onClick={()=>mutate(item._id)}
                                className="cursor-pointer inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-[#1877f2] ring-1 ring-[#dbeafe] transition hover:bg-[#e7f3ff]">
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
                                    className="lucide lucide-check"
                                    aria-hidden="true"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                                Mark as read
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}
