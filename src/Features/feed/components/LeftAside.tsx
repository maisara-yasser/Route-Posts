import { NavLink } from 'react-router-dom';

export default function LeftAside() {
  return (
    <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[10px] xl:block">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <NavLink to={'/feed'} className={({ isActive })=>` mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition  hover:bg-slate-100
                ${isActive ? "bg-[#e7f3ff] text-[#1877f2]" : "text-slate-700"}
            `}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-newspaper"
                    aria-hidden="true"
                >
                    <path d="M15 18h-5" />
                    <path d="M18 14h-8" />
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                    <rect width={8} height={4} x={10} y={6} rx={1} />
                </svg>
                Feed
            </NavLink>
            <NavLink to={'/feed/saved'}  className={({ isActive })=>` mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition  hover:bg-slate-100
                ${isActive ? "bg-[#e7f3ff] text-[#1877f2]" : "text-slate-700"}
            `}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark"
                    aria-hidden="true"
                >
                    <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                </svg>
                Saved
            </NavLink>
        </div>
    </aside>
  );
}
