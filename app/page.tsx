import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">
                {session ? `Welcome ${session.user?.email}!` : "Hello world"}
            </h1>
        </div>
    );
}