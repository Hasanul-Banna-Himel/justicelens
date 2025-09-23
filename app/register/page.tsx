"use client";
import { useApp } from "@/store";
import { RegisterUser } from "@/utils/userFunction";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function Register() {
  const { userLogin } = useApp();

  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  // Profile picture upload deferred for later

  const [Error, setError] = React.useState<string | undefined>("");
  const [Loading, setLoading] = React.useState<boolean>(false);
  const [Navigate, setNavigate] = React.useState<string | undefined>(undefined);

  //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     try {
  //       const res = RegisterUser(Email, Password, userLogin, setError);
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
          Let&apos;s get started
        </h1>
        <p className="text-center font-medium">
          Please use your details to sign up.
        </p>
        <form
          onSubmit={(e) =>
            RegisterUser(
              e,
              FirstName,
              LastName,
              Email,
              Password,
              setLoading,
              setError,
              userLogin,
              setNavigate
            )
          }
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="element flex flex-col gap-2">
              <label htmlFor="FirstName">First Name:</label>
              <input
                type="FirstName"
                className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                name="FirstName"
                id="FirstName"
                required
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="element flex flex-col gap-2">
              <label htmlFor="LastName">Last Name:</label>
              <input
                type="LastName"
                className="bg-[var(--aj-background)] px-4 py-2 text-base rounded-lg"
                name="LastName"
                id="LastName"
                required
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>
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

          {/* Profile picture upload is disabled for now */}

          <button type="button" onClick={() => redirect("/login")}>
            Already have an account?
          </button>

          <button
            type="submit"
            className="bg-[var(--aj-primary)] text-[var(--aj-background)] px-6 py-3 text-xl rounded-xl"
            disabled={Loading}
          >
            {Loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </main>
  );
}
