import React, { useState } from "react";
import Link from "next/link";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import verifyAuth from "@/utils/verifyAuth";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = nookies.get(ctx).token;
  const auth = await verifyAuth(token, "/login");

  if (auth.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/authenticated",
      },
      props: {} as never,
    };
  }

  return {
    props: {} as never,
  };
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div>
      <Link href="/">Go back to home page</Link>
      <div className="mt-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"} />
        <br />
        <input
          type={"password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder={"Password"}
        />
      </div>
      <div>
        <button
          onClick={async () => {
            await createUserWithEmailAndPassword(getAuth(), email, pass);
            router.push("/authenticated");
          }}
        >
          Create account
        </button>
        <br />
        <button
          onClick={async () => {
            let auth = getAuth();
            // await setPersistence(auth, browserLocalPersistence);
            await signInWithEmailAndPassword(auth, email, pass);

            //window.open("/authenticated", "_blank");
            //router.push("/authenticated");
          }}
        >
          Log in
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            window.open("/authenticated", "_blank");
          }}
        >
          Open authenticated page in new tab
        </button>
        <br />
        <button
          onClick={() => {
            window.open("/", "_blank");
          }}
        >
          Open home page in new tab
        </button>
      </div>
    </div>
  );
}
