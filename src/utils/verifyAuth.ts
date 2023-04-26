import { firebaseAdmin } from "@/lib/firebaseAdmin";

export default async function verifyAuth(token: string, redirect: string) {
  try {
    const user = await firebaseAdmin.auth().verifyIdToken(token);
    return { user };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: redirect,
      },
      props: {} as never,
    };
  }
}
