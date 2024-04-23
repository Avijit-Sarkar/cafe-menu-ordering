"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Log-In</h1>
      <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginInProgress}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginInProgress}
        />
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        <div className="my-2 text-center text-gray-500">or</div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-2 justify-center"
        >
          <Image src={"/google.png"} alt="" width={22} height={22} />
          login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="underline">
            Register &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
