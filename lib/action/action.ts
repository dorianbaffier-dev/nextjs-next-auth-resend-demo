"use server";

import { signIn } from "@/auth";
import { z } from "zod";
import { DEFAULT_STATE } from "./action.type";

const authSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const sendLink = async (
    formState: DEFAULT_STATE,
    formData: FormData
) => {
    const validated = authSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validated.success) {
        return <DEFAULT_STATE>{
            success: "",
            error: validated.error.errors[0]?.message,
        };
    }

    try {
        await signIn("resend", {
            email: validated.data.email,
            redirect: false,
            callbackUrl: "/",
        });
        return <DEFAULT_STATE>{
            error: "",
            success: "Magic link sent! Check your email.",
        };
    } catch (error) {
        return <DEFAULT_STATE>{
            success: "",
            error: "Failed to send magic link. Please try again.",
        };
    }
};
