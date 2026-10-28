import { Button, Select, TextInput } from "flowbite-react";
import { FiUser } from "react-icons/fi";
import { CiAt } from "react-icons/ci";
import { TbUsers } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { RegisterSchemaObj, type RegisterSchema } from "../../../Schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../Apis/register.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
// import { useNavigate } from "react-router-dom";

export default function Register() {
  // interface formData {
  //   name:string,
  //   username?:string,
  //   email:string,
  //   password: string,
  //   rePassword: string,
  //   gender: 'female'|'male',
  //   dateOfBirth:string
  // }
  const [isLoading,setLoading] = useState(false);

  // const navigate = useNavigate()

  const {register,handleSubmit,formState:{errors}} = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchemaObj) ,
    defaultValues:{
      name:'',
      username:'',
      email:'',
      dateOfBirth:'',
      password:'',
      rePassword:'',
      gender:'male'
    }
  })
  // console.log(register('password'));
  async function handleRegister(data:RegisterSchema){
    setLoading(true)
    //call api with axios
    try {
      const res = await signUp(data)
      console.log(res);
      if(res?.success){
        toast.success(res?.message)
        //navigate to login
        // navigate('/login')
      }
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
  }
  // validation 
  /*{
    required: 'is required',
    minLength:{value:2,message:'min 2 char'}
  }*/
  return (
    <>
        <div className="mt-5">
          <h2 className="text-2xl font-extrabold text-slate-900">Create a new account</h2>
          <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>
        </div>
      <form onSubmit={handleSubmit(handleRegister)} className="flex max-w-md flex-col gap-4 mt-5 mx-auto">
        <div>
          <TextInput
            {...register('name',)}
            icon={FiUser }
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
          {errors?.name&&<span className="text-rose-600">{errors.name?.message}</span>}
        </div>
        <div>
          <TextInput
          {...register('username')}
            icon={CiAt }
            id="userName"
            type="text"
            placeholder="Username (optional)"
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
          {errors?.username&&<span className="text-rose-600">{errors.username?.message}</span>}
        </div>
        <div>
          <TextInput
          {...register('email')}
            icon={CiAt }
            id="email"
            type="email"
            placeholder="Email address"
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
            {errors?.email&&<span className="text-rose-600">{errors.email?.message}</span>}
        </div>
        <div>
          <Select icon={TbUsers } id="gender" {...register('gender')}
          theme={{
            field: {
              select: {
                colors: {
                  gray: "!bg-slate-50  !text-gray-900",
                },
              },
            },
          }}
          >
            <option>Selected Gender</option>
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
          </Select>
          {errors?.gender&&<span className="text-rose-600">{errors.gender?.message}</span>}
        </div>
        <div>
          <TextInput icon={MdOutlineDateRange } id="birthDay" {...register('dateOfBirth')} type="date"
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
          {errors?.dateOfBirth&&<span className="text-rose-600">{errors.dateOfBirth?.message}</span>}
        </div>
        <div>
          <TextInput
            {...register('password')}
            icon={IoKeyOutline }
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
          {errors?.password&&<span className="text-rose-600">{errors.password?.message}</span>}
        </div>
        <div>
          <TextInput
            {...register('rePassword')}
            icon={IoKeyOutline }
            id="ConfirmPass"
            type="password"
            placeholder="Confirm Password"
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
          {errors?.rePassword&&<span className="text-rose-600">{errors.rePassword?.message}</span>}
        </div>
        <Button className="w-full cursor-pointer rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]" type="submit"
        disabled={isLoading}
        >
          {isLoading?<ImSpinner9 />:'Create New Account'}
          </Button>
      </form>
    </>
  );
}
