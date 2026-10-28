
import { getPosts } from "./Apis/Posts/posts.api";
import Loading from "../../Components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import LeftAside from "./components/LeftAside";
import RightAside from "./components/RightAside";
import { Outlet } from "react-router-dom";
import CreatePost from "./components/Posts/CreatePost";
import { Helmet } from "react-helmet";
// import axios from "axios";


export default function Feed() {

    //GET => useQuery();
    const { isLoading, isError, error } = useQuery({
        refetchOnWindowFocus: false, // to prevent refetching when the window is focused
        refetchOnMount: false, // to prevent refetching when the component is mounted
        // refetchInterval: 5000, // to refetch every 5 seconds
        staleTime: 3000, // to prevent refetching when the data is fresh for 3 seconds
        // gcTime: 600000, // to prevent refetching when the data is garbage collected after 10 minutes
        // enabled:false, // to prevent refetching when the component is mounted
        queryKey: ['posts'],// required
        queryFn: getPosts,// required
    });
    // console.log('data', data);
    // console.log('isLoading', isLoading);
    // console.log('isError', isError);
    // console.log('isFetching', isFetching);

    //POST ,PUT ,DELETE (mutation)
    // const { isLoading, isFetching, data, isError, error } = useQuery({
    //     refetchInterval: 5000,
    //     refetchOnMount: false,
    //     staleTime: 3000,
    //     refetchOnWindowFocus: false,
    //     queryKey: ['posts'],
    //     queryFn: getPosts,
    // });

    if (isLoading)
        return <Loading></Loading>

    if (isError)
        return <h2>{error.message}</h2>
    return (
        <>  
            <Helmet>
                <title>Feed Page</title>
                <meta name="description" content="" />
            </Helmet>
            <div className="container my-5 flex flex-col gap-3 xl:flex-row">
                {/* <button onClick={() =>refetch()}>fetch data</button> */}
                <div className="hidden xl:block xl:w-1/4">
                    <LeftAside />
                </div>
                <div className="w-full xl:w-2/4">
                    <CreatePost />
                    <Outlet />
                </div>
                <div className="hidden xl:block xl:w-1/4">
                    <RightAside />
                </div>
            </div>
            
        </>
    )
}
// const context = useContext(authContext);
// if (!context) throw new Error('');

// const { isLogin } = context;
// console.log(isLogin);

// const [posts, setPosts] = useState<Post[]|null>(null);
// const [isLoading, setIsLoading] = useState(false);

// async function handleGetPosts() {
//     setIsLoading(true);
//     try {
//         const res = await getPosts();
//         setPosts(res?.data?.posts);
//     } catch (error) {
//         toast.error(error.response.data.message);
//     } finally {
//         setIsLoading(false);
//     }
// }

// useEffect(() => {
//     handleGetPosts();
// }, [])
