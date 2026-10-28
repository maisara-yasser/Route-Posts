import * as zod from "zod";

export const changePasswordSchema = zod
    .object({
        password: zod
            .string()
            .nonempty("this field is required!")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Incorrect password."
            ),

        newPassword: zod
            .string()
            .nonempty("this field is required!")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Incorrect password."
            ),

        confirmPassword: zod
            .string()
            .nonempty("this field is required!"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type ChangePasswordSchema = zod.infer<typeof changePasswordSchema>;