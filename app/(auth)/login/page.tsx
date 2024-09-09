"use client";

import { sendLink } from "@/lib/action/action";
import { DEFAULT_STATE_ACTION } from "@/lib/action/action.type";
import { useActionState, useTransition } from "react";

export default function Home() {
    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(sendLink, DEFAULT_STATE_ACTION);

    const submitAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition(async () => {
            const formData = new FormData(event.currentTarget);
            formAction(formData);
        });
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1>Form</h1>
                <form
                    className="flex flex-col gap-4 w-full max-w-md"
                    onSubmit={submitAction}
                >
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="off"
                            required
                        />
                        {state?.error && (
                            <p className="text-red-500">{state.error}</p>
                        )}
                        {state?.success && (
                            <p className="text-green-500">{state.success}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        {isPending ? "Sending..." : "Send Magic Link"}
                    </button>
                    <p className="text-black">
                    {isPending}
                        </p>
                </form>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    );
}
