import * as zod from 'zod'; 

export const loginSchema = zod.object({
    email:zod.string().nonempty('this field is required!').email('not valid email'),
    password:zod.string().nonempty('this field is required!').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Incorrect password.'),
})

export type loginSchemaType = zod.infer<typeof loginSchema>;