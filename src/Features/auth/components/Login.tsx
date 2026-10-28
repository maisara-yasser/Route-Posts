import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { loginSchema, type loginSchemaType } from "../../../Schema/login.schema";
import { signIn } from "../Apis/login.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { authContext } from "../../../context/auth.context";

export default function Login() {

  const [isLoading,setLoading] = useState(false)
  const navigate = useNavigate()

  const context = useContext(authContext);
  if(!context) throw new Error("");

  const {setLogin,setUser} = context;
  
  //formState to visible errors
  const {handleSubmit,register,formState:{errors}} =useForm<loginSchemaType>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email:'',
      password:''
    }
  })

  async function handleLogin(data:loginSchemaType){
    setLoading(true)
    try {
      const res = await signIn(data);
      // console.log(res?.data?.token);
      if(res?.success){
        localStorage.setItem('tkn',res?.data?.token);
        localStorage.setItem('user',JSON.stringify(res?.data?.user));
        setLogin(res?.data?.token);
        setUser(res?.data?.user);
        //navigate to login
        navigate('/feed');
        toast.success(res?.message);
      }
    } catch (error: any) { 
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
        <div className="mt-5">
          <h2 className="text-2xl font-extrabold text-slate-900">Log in to Route Posts</h2>
          <p className="mt-1 text-sm text-slate-500">Log in and continue your social journey.</p>
        </div>
      <form onSubmit={handleSubmit(handleLogin)} className="flex max-w-md flex-col gap-4 mt-5 mx-auto " >
        <div>
          <TextInput
            {...register("email")}
            icon={FiUser}
            id="fullName"
            type="text"
            placeholder="Full Name"
            theme={{
              field: {
                input: {
                  colors: {
                    gray: "!bg-slate-50  !text-gray-900",
                  },
                },
              },
            }}
          />
          {/* alert error message */}
          {errors?.email && (
            <span className="text-rose-600">{errors.email?.message}</span>
          )}
        </div>
        <div>
          <TextInput
            {...register("password")}
            icon={IoKeyOutline}
            id="password"
            type="password"
            placeholder="Password"
            theme={{
              field: {
                input: {
                  colors: {
                    gray: "!bg-slate-50  !text-gray-900",
                  },
                },
              },
            }}
          />
          {errors?.password && (
            <span className="text-rose-600">{errors.password?.message}</span>
          )}
        </div>
        <Button
          className="w-full cursor-pointer rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <ImSpinner9 /> : "Log In"}
        </Button>
      </form>
    </>
  );
}
