import axios from "axios";

export async function uploadProfilePhoto(photo: File) {
    const token = localStorage.getItem("tkn");
    const formData = new FormData();

    formData.append("photo", photo);

    const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
}