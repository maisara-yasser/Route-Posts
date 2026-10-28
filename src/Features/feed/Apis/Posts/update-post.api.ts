import axios from "axios";


export async function updatePost({postId,body}:{postId:string ; body: string}, ){
    const token = localStorage.getItem('tkn');
    const {data} = await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`,{body},{
        headers:{
            AUTHORIZATION: `Bearer ${token}`
        } 
    });
    return data;
}