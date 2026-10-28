import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordSchema } from "../../Schema/change-pass.schema";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "./api/change-password.api";
import { toast } from "react-toastify";
export default function Settings() {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            toast.success(data?.message || "Password changed successfully");
            reset();
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Could not change password"
            );
        },
    });

    function handleChangePassword(values: ChangePasswordSchema) {
        const { password, newPassword } = values;

        mutate({ password, newPassword });
    }
    return (
        <div>
            <div className="mx-auto max-w-7xl px-3 py-3.5">
                <main className="min-w-0">
                    <div className="mx-auto max-w-2xl">
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={18}
                                        height={18}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-key-round"
                                        aria-hidden="true"
                                    >
                                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                                    </svg>
                                </span>
                                <div>
                                    <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                                        Change Password
                                    </h1>
                                    <p className="text-sm text-slate-500">
                                        Keep your account secure by using a strong password.
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(handleChangePassword)} noValidate className="space-y-4">
                                <label className="block">
                                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                                        Current password
                                    </span>
                                    <input
                                        placeholder="Enter current password"
                                        className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                                        type="password"
                                        {...register("password")}
                                    />
                                    {errors.password && <span>{errors.password.message}</span>}
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                                        New password
                                    </span>
                                    <input
                                        placeholder="Enter new password"
                                        className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                                        type="password"
                                        {...register("newPassword")}
                                    />
                                    {errors.newPassword && <span>{errors.newPassword.message}</span>}
                                    <span className="mt-1 block text-xs text-slate-500">
                                        At least 8 characters with uppercase, lowercase, number,
                                        and special character.
                                    </span>
                                </label>
                                <label className="block">
                                    <span className="mb-1.5 block text-sm font-bold text-slate-700">
                                        Confirm new password
                                    </span>
                                    <input
                                        placeholder="Re-enter new password"
                                        className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                                        type="password"
                                        {...register("confirmPassword")}
                                    />
                                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                                </label>
                                {/* <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                                    jwt expired
                                </div> */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isPending ? "Updating..." : "Update password"}
                                </button>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
