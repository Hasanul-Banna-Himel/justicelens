"use client";
import { useApp } from "@/store";
import { LogInUser } from "@/utils/userFunction";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function Login() {
  const { userLogin } = useApp();

  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");

  const [Error, setError] = React.useState<string | undefined>();
  const [Loading, setLoading] = React.useState<boolean>(false);
  const [Navigate, setNavigate] = React.useState<string | undefined>(undefined);

  //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     try {
  //       const res = await LogInUser(Email, Password);
  //       setError("");

  //       //   userLogin(true, res);
  //       console.info(res);
  //       redirect("/dashboard");
  //     } catch (error) {
  //       setError(error.code);
  //       userLogin(false, {});
  //       console.error(
  //         `Couldn't Login to your account.\nError: ${error.code} \nPlease try again.`
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    if (typeof Navigate === "string") {
      redirect("/");
    }
  }, [Navigate]);

  return (
    <main className="">
      <div className="w-[min(500px,100%)] mx-auto mt-8 bg-[var(--aj-background-substitute)] text-[var(--aj-foreground)] p-8 rounded-2xl">
        <h1 className="text-center text-4xl font-[var(--font-primary)] text-[var(--aj-primary)]">
          Welcome Back
        </h1>
        <p className="text-center font-medium">
          Please use your details to sign in.
        </p>
        <form
          onSubmit={(e) =>
            LogInUser(
              e,
              Email,
              Password,
              userLogin,
              setLoading,
              setError,
              setNavigate
            )
          }
          className="flex flex-col gap-4"
        >
          <div className="element flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
              name="email"
              id="email"
              required
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
            />
          </div>

          <div className="element flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
              name="password"
              id="password"
              required
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              pattern=".{8,30}"
            />
            {Error && <div className="error text-sm text-red-500">{Error}</div>}
          </div>

          <button type="button" onClick={() => redirect("/register")}>
            Don&apos;t have an account?
          </button>

          <button
            type="submit"
            className="bg-[var(--aj-primary)] text-[var(--aj-background)] px-6 py-3 text-xl rounded-xl"
            disabled={Loading}
          >
            {Loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
