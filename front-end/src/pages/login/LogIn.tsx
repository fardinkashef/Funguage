import { useContext } from "react";
import "./LogIn.scss";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "@/shared/context/AuthContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  passWord: z
    .string()
    .min(8, { message: "PassWord must be at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

function LogIn() {
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

  const handleLogIn: SubmitHandler<FormFields> = async (data) => {
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/Login", data);
      await getLoggedIn();
      navigate("/", { replace: true });
    } catch (error) {
      setError("root", {
        message: "Some thing went wrong. Couldn't log you in.",
      });
    }
  };

  return (
    <div className="LogIn">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit(handleLogIn)}>
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
          <label htmlFor="password">password</label>
          <input
            {...register("passWord")}
            type="password"
            id="password"
            placeholder="********"
          />
          {errors.passWord && <p>{errors.passWord.message}</p>}
        </div>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Log In"}
        </button>
        {errors.root && <p>{errors.root.message}</p>}{" "}
      </form>
      <NavLink to="/signup" className="switch-link">
        Don't have an account? Sign up here.
      </NavLink>
    </div>
  );
}
export default LogIn;
