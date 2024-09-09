import { NextRequest, NextResponse } from "next/server";
import { auth, handlers } from "./auth";

export const { GET, POST } = handlers;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default auth((req: NextRequest) => {
    
    return NextResponse.next();
});
