import { useContext, useState } from "react";
import { authContext } from "../../context/auth.context";
import { Helmet } from "react-helmet";
import { useMutation } from "@tanstack/react-query";
import { uploadProfilePhoto } from "./apis/upload-profile-photo.api";
import { toast } from "react-toastify";
import { IoMdImages } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";


export default function Profile() {

  const context = useContext(authContext);
  if (!context)
    return
  const { user, setUser } = context;

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const { mutate: uploadPhoto, isPending } = useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: (response) => {
      const newPhoto =
        response?.data?.user?.photo ??
        response?.data?.photo ??
        response?.user?.photo ??
        response?.photo;

      if (newPhoto && user) {
        const updatedUser = { ...user, photo: newPhoto };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      toast.success(response?.message || "Profile photo updated");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Could not upload profile photo"
      );
    },
  });
  console.log("User Data Object:", user);
  return (
    <>
      <Helmet>
        <title>Profile Page</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="h-full bg-gray-200 p-8">
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="w-full h-[250px]">
            <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
          </div>
          <div className="relative flex flex-col items-center -mt-20">
            <div className="h-40 w-40 rounded-full border-4 border-white bg-amber-50 overflow-hidden">
              <img src={photoPreview || user?.photo} alt={user?.name ?? "Profile photo"} className="h-full w-full object-cover" />
            </div>
            <label className="cursor-pointer absolute bottom-20 right-[44%] text-black bg-gray-100 rounded-full p-1 hover:text-blue-500" >
              <span className="text-2xl ">{isPending ? <ImSpinner2 className="animate-spin" /> : <IoMdImages />}  </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isPending}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (!file.type.startsWith("image/")) {
                    toast.error("اختاري ملف صورة");
                    event.target.value = "";
                    return;
                  }
                  setSelectedPhoto(file);
                  setPhotoPreview(URL.createObjectURL(file));
                  event.target.value = "";
                }}
              />
            </label>
            {selectedPhoto && (
              <div className="mt-4 flex items-center gap-3">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                  type="button"
                  disabled={isPending}
                  onClick={() => uploadPhoto(selectedPhoto)}
                >
                  {isPending ? "Uploading..." : "Update"}
                </button>

                <button
                  className="bg-gray-300  py-1 px-2 rounded"
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    setSelectedPhoto(null);
                    setPhotoPreview("");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{user?.name}</p>
              <span className="bg-blue-500 rounded-full p-1" title="Verified">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
            <p className="text-gray-700">{user?.email}</p>
          </div>
        </div>
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Full name:</span>
                  <span className="text-gray-700">{user?.name}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">UserName:</span>
                  <span className="text-gray-700">{user?.username}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-700">{user?.email}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}
