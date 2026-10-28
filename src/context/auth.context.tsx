import React, { createContext, useState } from "react";


type propsPage = {
    isLogin: null | string,
    setLogin: React.Dispatch<React.SetStateAction<null | string>>,
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}
type User = {
    '_id': string,
    'name': string,
    'username': string,
    'email': string,
    'photo': string,
    'cover': string,
}

const getStoredUser = (): User | null => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    try {
        return JSON.parse(storedUser) as User;
    } catch {
        return null;
    }
};

export const authContext = createContext<propsPage | null>(null);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {

    //lazy init
    const [isLogin, setLogin] = useState<null | string>(() => { return localStorage.getItem('tkn') });
    const [user, setUser] = useState<User | null>(getStoredUser);
    // mounting
    // useEffect(()=>{
    //     if(localStorage.getItem('tkn'))
    //         setLogin(localStorage.getItem('tkn'))
    // },[])    

    return <authContext.Provider value={{ isLogin, setLogin, user, setUser }}>
        {children}
    </authContext.Provider>
}