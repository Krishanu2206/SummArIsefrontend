"use server";
import {z} from "zod";
import { cookies } from "next/headers";
import { usernamevalidation, signupschema } from "@/schemas/signupschema";
import { registerUserService, loginUserService } from "../services/auth-service";
import { cookieconfig } from "@/lib/cookieconfig";
import { redirect } from "next/navigation";
import { loginschema } from "@/schemas/signinschema";

const usernamequeryschema = z.object({
    username : usernamevalidation
})

export async function registerUserAction(prevstate : any, formData: FormData) {
  console.log("Hello From Register User Action");

  const fields = {
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  };

  const queryparams = {
    username : fields.username
  }

    //validate with ZOD (first the username then the whole form data)
    const result = usernamequeryschema.safeParse(queryparams);
    console.log(result);  
    console.log('Username zod error', result.error?.errors.map(err=> err.message).join(', '), "Username zod error end")
    if(!result.success){
        const usernameerrors = result.error?.errors.map(err=> err.message).join(', ') ;
        console.log('username errors', usernameerrors); 
        return {
            ...prevstate,
            zodErrors: result.error.flatten().fieldErrors,
            strapiErrors: null,
            message: "Missing Fields. Failed to validate username.",
        };
    }

    const validatedFields = signupschema.safeParse(fields);

    if(!validatedFields.success){
        const signuperrors = validatedFields.error?.errors.map(err=> err.message).join(', ') ;
        console.log('username errors', signuperrors); 
        return {
            ...prevstate,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
            message: "Missing Fields. Failed to Register.",
        };
    }

  console.log("#############");
  console.log(validatedFields.data);
  console.log("#############");

  const registerresponse = await registerUserService(validatedFields.data);
  console.log(registerresponse);

  if (!registerresponse) {
    return {
      ...prevstate,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (registerresponse.error) {
    return {
      ...prevstate,
      strapiErrors: registerresponse.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  console.log("#############");
  console.log("User Registered Successfully", registerresponse.jwt);
  console.log("#############");

  //setting cookies
    const cookieStore = await cookies();
    cookieStore.set("jwt", registerresponse.jwt, cookieconfig);

  redirect("/dashboard");

}

export async function loginUserAction(prevState: any, formData: FormData) {

  const validatedFields = loginschema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      StrapiErrors : null,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  console.log(responseData, "responseData");

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, cookieconfig);

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...cookieconfig, maxAge: 0 });
  redirect("/");
}