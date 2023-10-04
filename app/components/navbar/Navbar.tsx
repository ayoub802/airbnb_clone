"use client"

import Image from "next/image";
import Container from "../Container";
import { useRouter } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { SafeUser } from "@/app/types";
import { FC } from "react";
import Categories from "./Categories";
import Search from "./Search";

interface NavbarProps {
    currentUser?: SafeUser | null;
  }
  

const Navbar: FC<NavbarProps> = ({
    currentUser
}) => {
    console.log(currentUser);
    
    const router = useRouter();
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Image
                            onClick={() => router.push('/')}
                            className="hidden md:block cursor-pointer" 
                            src="/images/logo.png" 
                            height="100" 
                            width="100" 
                            alt="Logo" 
                        />

                        <Search />
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}
export default Navbar;