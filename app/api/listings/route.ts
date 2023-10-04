import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (
    request: Request
) => {
   try{
       const body = await request.json();
       const currentUser = await getCurrentUser();

       if (!currentUser) {
        return NextResponse.error();
      }
       const {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            location,
            price,
        } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
        });    
    
    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })
      return NextResponse.json(listing)
   }catch(err){
      return NextResponse.json({message: "POST Error", err}, {status: 500})
   }
}

