import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
interface IParams {
    listingId?: string;
  }


export const POST = async (
    request: Request,
    { params }: { params: IParams }
) => {
   try{
       const currentUser = await getCurrentUser();

       if (!currentUser) {
        return NextResponse.error();
      }
      const { listingId } = params;

      if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
      }
    
      let favoriteIds = [...(currentUser.favoriteIds || [])];

      favoriteIds.push(listingId);
    
      const user = await prisma.user.update({
        where: {
          id: currentUser.id
        },
        data: {
          favoriteIds
        }
      });
    
      return NextResponse.json(user);
   }catch(err){
      return NextResponse.json({message: "POST Error", err}, {status: 500})
   }
}

export const DELETE = async (
    request: Request,
    { params }: { params: IParams }
) => {
   try{
       const currentUser = await getCurrentUser();

       if (!currentUser) {
        return NextResponse.error();
      }
      const { listingId } = params;

      if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
      }
    
      let favoriteIds = [...(currentUser.favoriteIds || [])];
    
      favoriteIds = favoriteIds.filter((id) => id !== listingId);
    
      const user = await prisma.user.update({
        where: {
          id: currentUser.id
        },
        data: {
          favoriteIds
        }
      });
    
      return NextResponse.json(user);
   }catch(err){
      return NextResponse.json({message: "DELETE Error", err}, {status: 500})
   }
}