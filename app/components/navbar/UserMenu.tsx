import Image from 'next/image';
import React, { FC, useCallback, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from './MenuItem';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModel';
import useLoginModal from '@/app/hooks/useLoginModel';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';

interface UserMenuProps {
  currentUser?: SafeUser | null
}

export const UserMenu: FC<UserMenuProps> = ({
  currentUser
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const registerModal = useRegisterModal();
    const rentModal = useRentModal();
    const loginModal = useLoginModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
      }, []);

    const onRent = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }

      rentModal.onOpen();
    }, [loginModal, rentModal, currentUser]);
  return (
    <div className='relative'>
        <div className="flex flex-row items-center gap-3">
            <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                Airbnb your home
            </div>
            <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                <AiOutlineMenu />
                <div className="hidden md:block">
                   <Image 
                    className="rounded-full" 
                    height="30" 
                    width="30" 
                    alt="Avatar" 
                    src={currentUser?.image || '/images/placeholder.jpg'}
                    />
                </div>
            </div>
        </div>
        {
            isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                      {
                        currentUser ? (
                          <>
                              <MenuItem 
                                label='My trips'
                                onClick={() => router.push('/trips')}
                              />
                              <MenuItem 
                                label='My favorites'
                                onClick={() => router.push('/favorites')}
                              />
                              <MenuItem 
                                label='My reservations'
                                onClick={() => router.push('/reservations')}
                              />
                              <MenuItem 
                                label='My properties'
                                onClick={() => router.push('/properties')}
                              />
                              <MenuItem 
                                label='Airbnb your home'
                                onClick={rentModal.onOpen}
                              />

                              <hr></hr>
                              <MenuItem 
                                label='Logout'
                                onClick={() => signOut()}
                              /> 
                          </>
                        ) : (
                          <>
                          <MenuItem 
                            label='Login'
                            onClick={loginModal.onOpen}
                          />
                          <MenuItem 
                            label='Sign up'
                            onClick={registerModal.onOpen}
                          />
                          </>
                        )
                      }
                    </div>
                </div>
            )
        }
    </div>
  )
}
