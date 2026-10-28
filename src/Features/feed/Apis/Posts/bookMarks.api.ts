import axios from "axios";

export async function bookMark(){
    const token = localStorage.getItem('tkn');
    const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/bookmarks`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}