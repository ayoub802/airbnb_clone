'use client';

import useRegisterModal from '@/app/hooks/useRegisterModel';
import React, { useCallback, useState } from 'react'
import axios from "axios";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { 
    FieldValues, 
    SubmitHandler,
    useForm
  } from "react-hook-form";
import Button from '../Button';
import { AiFillGithub } from 'react-icons/ai';
import Input from '../inputs/input';
import Heading from '../Heading';
import { Modal } from './Modal';
import useLoginModal from '@/app/hooks/useLoginModel';
import { useRouter } from 'next/navigation';


export const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          email: '',
          password: ''
        },
      });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
       setIsLoading(true);
       signIn('credentials', {
        ...data,
        redirect: false,
       })
       .then((callback) => {
         setIsLoading(false);
         
         if(callback?.ok) {
            toast.success('Logged in');
            router.refresh();
            loginModal.onClose();
         }

         if(callback?.error){
            toast.error(callback.error);
         }
       });
    }
    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [registerModal, loginModal])


    const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Welcome back"
            subtitle="Login to your account!"
          />
          <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
    
      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button 
            outline 
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')} 
          />
          <Button 
            outline 
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
          />
          <div 
            className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
          >
            <p>First time using Airbnb?
              <span 
                onClick={onToggle} 
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                > Create an account</span>
            </p>
          </div>
        </div>
      )
  return (
    <Modal
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel="Continue"
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
  />
  )
}
