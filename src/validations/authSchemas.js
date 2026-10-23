import * as yup from 'yup'

export const registerSchema = yup.object({
    fullName: yup. string().required("Full Name Is Required")
    .min(3,"Full Name must be at least 3 char"),
    userName: yup. string().required("Full Name Is Required")
    .min(3, "Full Name must be at least 3 char"),
    email:yup.string().required("Email Is Required").email("Invalid Email Format"),
    password:yup. string().required("password is required")
    .min(6, "password must be at least 6 char")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain an lowercase letter")
    .matches(/[0-9]/,"Password must contain a number"),
    phoneNumber:yup. string().required("phoneNumber is required")
    .matches(/^05\d{8}$/, "phone number must start with 05 and be 10 digits")

})

export const loginSchema = yup.object({
    email:yup.string().required("Email Is Required").email("Invalid Email Format"),
    password:yup. string().required("password is required")
    .min(6, "password must be at least 6 char")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain an lowercase letter")
    .matches(/[0-9]/,"Password must contain a number")

})