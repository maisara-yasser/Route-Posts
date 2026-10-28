import axios from "axios";

export async function updateComment({ postId, commentId, formData,}: { postId: string; commentId: string; formData: FormData;}) {
    const token = localStorage.getItem("tkn");

    const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`,
        formData,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
}