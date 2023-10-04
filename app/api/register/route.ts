import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export const POST = async (
    request: Request
) => {
   try{
       const body = await request.json();
       
       const {
           email,
           name,
           password
        } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    })
      return NextResponse.json(user)
   }catch(err){
      return NextResponse.json({message: "POST Error", err}, {status: 500})
   }
}

