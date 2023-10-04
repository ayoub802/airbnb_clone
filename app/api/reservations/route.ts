import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (
    request: Request
) => {
   try{
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
      }
    const body = await request.json();
    
    const {
    listingId,
    startDate,
    endDate,
    totalPrice
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
        }
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
          },
        data:{
        reservations: {
            create: {
                userId: currentUser.id,
                startDate,
                endDate,
                totalPrice,
            }
            }
        }
    })
      return NextResponse.json(listingAndReservation)
   }catch(err){
      return NextResponse.json({message: "POST Error", err}, {status: 500})
   }
}

