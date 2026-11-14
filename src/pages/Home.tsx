import { useState } from 'react'
import Login from '../Features/auth/components/Login'
import Register from '../Features/auth/components/Register'
import {Helmet} from "react-helmet";

export default function Home() {

    const [active, setActive] = useState(true)

    function toggleActive() {
        setActive(!active)
    }

    return (
        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="" />
            </Helmet>
            <div className="container ">
                <div className='mx-auto my-10 flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between'>
                    <div className="order-2 w-full max-w-xl text-center lg:order-1 lg:text-left">
                        <h1 className="text-5xl font-extrabold tracking-tight text-[#00298d] sm:text-6xl lg:block">DISCOVER MORE</h1>
                        <p className=" mt-4 text-2xl font-medium leading-snug text-slate-800 lg:block">Share Your Thoughts, Connect with the World.</p>
                        <p className=" mt-4 text-md font-medium leading-snug text-slate-600 lg:block">Explore different interests, discover new ideas, and make every visit an opportunity to find something interesting.</p>
                        {/* <div className='border my-10 shadow bg-white rounded-2xl p-4 border-brdr-color'>
                            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">ABOUT ROUTE POSTS</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">A Place Where Every Post Tells a Story</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700">Route Posts is a social platform designed to bring people and ideas together. Explore shared content, discover Place Where Every Post Tells a Story, A new perspectives, and enjoy a simple way to stay connected with the world around you. </p>
                            <div className='grid grid-cols-3 gap-3 my-4'>
                                {[...Array(5)].map(() => {
                                    return (
                                        <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2"><p className="text-base font-extrabold text-[#00298d]">2012</p><p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">Share Posts</p></div>
                                    )
                                })}
                            </div>
                        </div> */}
                        <div className='border my-10 shadow bg-white rounded-2xl p-5 border-brdr-color'>

    {/* Section Header */}
    <div className="flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">
            TRENDING TOPICS
        </p>
    </div>

    <p className="mt-2 text-xl font-bold text-slate-900">
        Explore What's Happening
    </p>

    <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Discover interesting topics, explore new ideas, and find conversations
        that match your interests.
    </p>

    {/* Topics Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">

        {[
            { icon: '💻', name: 'Technology', desc: 'Tech & Innovation' },
            { icon: '🚀', name: 'Programming', desc: 'Code & Create' },
            { icon: '✈️', name: 'Travel', desc: 'Explore Places' },
            { icon: '📸', name: 'Photography', desc: 'Capture Moments' },
            { icon: '🎮', name: 'Gaming', desc: 'Play & Share' },
        ].map((topic, index) => {

            return (
                <div
                    key={index}
                    className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-3 transition-all duration-300 hover:bg-[#e5edff] hover:-translate-y-1 cursor-pointer"
                >
                    <p className="text-2xl mb-2">
                        {topic.icon}
                    </p>

                    <p className="text-sm font-extrabold text-[#00298d]">
                        {topic.name}
                    </p>

                    <p className="text-[11px] font-medium text-slate-600 mt-1">
                        {topic.desc}
                    </p>
                </div>
            )

        })}

    </div>

    <p className="text-center text-xs text-slate-500 font-medium">
        ✨ There's always something interesting to discover!
    </p>

</div>
                    </div>
                    <div className="order-1 lg:order-2 md:w-[40%] w-full nav rounded-2xl bg-white p-4 sm:p-6">
                        <div className='border  shadow bg-white  rounded-2xl overflow-hidden border-brdr-color'>
                            <div className='flex text-center items-center text-social-blue font-bold bg-[#f0f2f5] p-1 rounded'>
                                <div className="w-1/2 cursor-pointer">
                                    <span onClick={toggleActive} style={active ? { backgroundColor: 'white' ,color:'#00298d' } : {}} className='block rounded-xl py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800'>Login</span>
                                </div>
                                <div className="w-1/2 cursor-pointer">
                                    <span className='block  rounded-xl py-2 text-sm font-extrabold transition text-slate-600 hover:text-slate-800' onClick={toggleActive} style={!active ? { background: 'white' ,color:'#00298d'} : {}} >Register</span>
                                </div>
                            </div>
                        </div>
                        {/* toggle register/login */}
                        {
                            active ? <Login></Login> : <Register></Register>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
