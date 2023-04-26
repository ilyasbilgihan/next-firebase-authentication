import { useAuth } from "@/context/auth";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span>Hello World</span>

      {user ? (
        <div>
          <b>You are logged in as {user.email} </b>
          <br />
          <Link href="/authenticated">Go to authenticated page</Link>
        </div>
      ) : (
        <div>
          <span>You are not logged in </span>
          <br />
          <Link href="/login">Go to login page</Link>
        </div>
      )}

      <div>
        <button
          onClick={() => {
            window.open("/authenticated", "_blank");
          }}
        >
          Open authenticated page in new tab
        </button>
      </div>
    </main>
  );
}
