export default function RightAside() {
    return (
        <aside className="hidden h-fit xl:sticky xl:top-[10px] xl:block">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
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
                            className="lucide lucide-users text-[#1877f2]"
                            aria-hidden="true"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <circle cx={9} cy={7} r={4} />
                        </svg>
                        <h3 className="text-base font-extrabold text-slate-900">
                            Suggested Friends
                        </h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                        5
                    </span>
                </div>
                <div className="mb-3">
                    <label className="relative block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={15}
                            height={15}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            aria-hidden="true"
                        >
                            <path d="m21 21-4.34-4.34" />
                            <circle cx={11} cy={11} r={8} />
                        </svg>
                        <input
                            placeholder="Search friends..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                            defaultValue=""
                        />
                    </label>
                </div>
                <div className="space-y-3">
                    <div className="rounded-xl border border-slate-200 p-2.5">
                        <div className="flex items-center justify-between gap-2">
                            <button
                                type="button"
                                className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                            >
                                <img
                                    alt="Ahmed Abd Al-Muti"
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775310477363-9f97d1ff-699a-4b66-a04f-bd6dee14d2b7-496835614_1859398661547861_5183785968671576388_n.webp"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                                        Ahmed Abd Al-Muti
                                    </p>
                                    <p className="truncate text-xs text-slate-500">@ahmedmutti</p>
                                </div>
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
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
                                    className="lucide lucide-user-plus"
                                    aria-hidden="true"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx={9} cy={7} r={4} />
                                    <line x1={19} x2={19} y1={8} y2={14} />
                                    <line x1={22} x2={16} y1={11} y2={11} />
                                </svg>
                                Follow
                            </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5">
                                325 followers
                            </span>
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-2.5">
                        <div className="flex items-center justify-between gap-2">
                            <button
                                type="button"
                                className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                            >
                                <img
                                    alt="Alaa Ashraf "
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775412292104-abcb6dbf-b0cd-4392-8084-3dc4d79abf8d-profile.webp"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                                        Alaa Ashraf{" "}
                                    </p>
                                    <p className="truncate text-xs text-slate-500">@alaaashraf</p>
                                </div>
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
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
                                    className="lucide lucide-user-plus"
                                    aria-hidden="true"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx={9} cy={7} r={4} />
                                    <line x1={19} x2={19} y1={8} y2={14} />
                                    <line x1={22} x2={16} y1={11} y2={11} />
                                </svg>
                                Follow
                            </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5">
                                263 followers
                            </span>
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-2.5">
                        <div className="flex items-center justify-between gap-2">
                            <button
                                type="button"
                                className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                            >
                                <img
                                    alt="MrMo"
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1778937681231-9d4544cb-667c-4af2-95fe-78ac83b54f55-profile.webp"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                                        MrMo
                                    </p>
                                    <p className="truncate text-xs text-slate-500">@mrmo</p>
                                </div>
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
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
                                    className="lucide lucide-user-plus"
                                    aria-hidden="true"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx={9} cy={7} r={4} />
                                    <line x1={19} x2={19} y1={8} y2={14} />
                                    <line x1={22} x2={16} y1={11} y2={11} />
                                </svg>
                                Follow
                            </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5">
                                203 followers
                            </span>
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-2.5">
                        <div className="flex items-center justify-between gap-2">
                            <button
                                type="button"
                                className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                            >
                                <img
                                    alt="menna"
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                                        menna
                                    </p>
                                    <p className="truncate text-xs text-slate-500">@gbngssssb</p>
                                </div>
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
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
                                    className="lucide lucide-user-plus"
                                    aria-hidden="true"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx={9} cy={7} r={4} />
                                    <line x1={19} x2={19} y1={8} y2={14} />
                                    <line x1={22} x2={16} y1={11} y2={11} />
                                </svg>
                                Follow
                            </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5">
                                163 followers
                            </span>
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-2.5">
                        <div className="flex items-center justify-between gap-2">
                            <button
                                type="button"
                                className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                            >
                                <img
                                    alt="abdalla diaa"
                                    className="h-10 w-10 rounded-full object-cover"
                                    src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1776007886436-57b1a765-2eec-4b09-9f80-6fa91a44ca94-qDEuDVfUSjCOIqgqwpn0pA.webp"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                                        abdalla diaa
                                    </p>
                                    <p className="truncate text-xs text-slate-500">
                                        @abdalla_diaa
                                    </p>
                                </div>
                            </button>
                            <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
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
                                    className="lucide lucide-user-plus"
                                    aria-hidden="true"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx={9} cy={7} r={4} />
                                    <line x1={19} x2={19} y1={8} y2={14} />
                                    <line x1={22} x2={16} y1={11} y2={11} />
                                </svg>
                                Follow
                            </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                            <span className="rounded-full bg-slate-100 px-2 py-0.5">
                                155 followers
                            </span>
                        </div>
                    </div>
                </div>
                <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                    View more
                </button>
            </div>
        </aside>
    );
}
