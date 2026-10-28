import axios from "axios";



export async function getNotify() {
    const token = localStorage.getItem("tkn");
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/notifications?unread=false`, {
        headers: {
            AUTHORIZATION: `Bearer ${token}`
        }
    });
    return data;
}
export async function getNotifyCount() {
    const token = localStorage.getItem("tkn");
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/notifications/unread-count`, {
        headers: {
            AUTHORIZATION: `Bearer ${token}`
        }
    });
    return data;
}
export async function notifyAllRead() {
    const token = localStorage.getItem("tkn");
    const { data } = await axios.patch(`${import.meta.env.VITE_BASE_URL}/notifications/read-all`,{}, {
        headers: {
            AUTHORIZATION: `Bearer ${token}`
        }
    });
    return data;
}
export async function notifyRead(notificationId: string) {
    const token = localStorage.getItem("tkn");
    const { data } = await axios.patch(`${import.meta.env.VITE_BASE_URL}/notifications/${notificationId}/read`,{}, {
        headers: {
            AUTHORIZATION: `Bearer ${token}`
        }
    });
    return data;
}

