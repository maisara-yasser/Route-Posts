// schema
import * as zod from 'zod'; 

export const RegisterSchemaObj = zod.object({
    name:zod.string().nonempty('this field is required!').min(2,'min 2 char').max(15,'max 15 char'),
    username:zod.string().min(2,'min 2 char').max(15,'max 15 char'),
    email:zod.string().nonempty('this field is required!').email('not valid email'),
    // gender:zod.string().regex(/^("male"|"female")$/),
    gender:zod.enum(['male','female']),
    password:zod.string().nonempty('this field is required!').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'),
    rePassword:zod.string().nonempty('this field is required!'),
    dateOfBirth:zod.string().refine((data)=>{
        const myYear = new Date(data).getFullYear()
        const thisYear = new Date().getFullYear()
        
        return thisYear - myYear > 10
        },{
        message: "age < 10 "
        }),
    }).refine((data)=>{
        return data.password === data.rePassword
    },{
        message:'don`t match',
        path:['rePassword']
    })


export type  RegisterSchema = zod.infer<typeof RegisterSchemaObj>;