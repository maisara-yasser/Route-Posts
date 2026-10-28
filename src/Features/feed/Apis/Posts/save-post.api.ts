import axios from "axios";

export async function savePost(postId:string){
    const token = localStorage.getItem('tkn');

    const {data} = await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/bookmark`,{},{
        headers:{
            AUTHORIZATION: `Bearer ${token}`
        }
    })
    return data;
}