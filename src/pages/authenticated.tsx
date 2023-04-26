import React from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebaseClient";
import nookies from "nookies";

import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import verifyAuth from "@/utils/verifyAuth";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = nookies.get(ctx).token;
  const auth = await verifyAuth(token, "/login");
  if (!auth.user) return auth;

  // FETCH AUTHENTITCATED DATA HERE

  return {
    props: {
      message: `Hello ${auth.user.email}`,
    },
  };
};

function AuthenticatedPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  return (
    <div>
      <p>{props.message}</p>
      <button
        onClick={async () => {
          await auth.signOut().then(() => {
            router.push("/");
          });
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default AuthenticatedPage;
