import { useContext } from "react";
import "./SignUp.scss";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "@/shared/context/AuthContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email(),
    userName: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    passWord: z
      .string()
      .min(8, { message: "PassWord must be at least 8 characters" }),
    confirmPassWord: z
      .string()
      .min(8, { message: "PassWord must be at least 8 characters" }),
  })
  .refine((data) => data.passWord === data.confirmPassWord, {
    path: ["confirmPassWord"],
    message: "PassWords does not match",
  });

type FormFields = z.infer<typeof schema>;

function SignUp() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    // defaultValues: {
    //   email: "test@email.com",
    // },
    resolver: zodResolver(schema),
  });

  const handleSignUp: SubmitHandler<FormFields> = async (data) => {
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/signup",
        data
      );
      await getLoggedIn();
      navigate("/", { replace: true });
    } catch (error) {
      setError("root", {
        message: "Some thing went wrong. Couldn't sign you up.",
      });
    }
  };

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div>
          <label htmlFor="email">email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="something@email.com"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="userName">user name</label>
          <input
            {...register("userName")}
            type="text"
            id="userName"
            placeholder="Johnny"
          />
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>
        <div>
          <label htmlFor="passWord">passWord</label>
          <input
            {...register("passWord")}
            type="passWord"
            id="passWord"
            placeholder="********"
          />
          {errors.passWord && <p>{errors.passWord.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassWord">Confirm PassWord</label>
          <input
            {...register("confirmPassWord")}
            type="passWord"
            id="confirmPassWord"
            placeholder="********"
          />
          {errors.confirmPassWord && <p>{errors.confirmPassWord.message}</p>}
        </div>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
        {errors.root && <p>{errors.root.message}</p>}{" "}
      </form>
      <NavLink to="/login" className="switch-link">
        Already have an account? Log in here.
      </NavLink>
    </div>
  );
}
export default SignUp;
