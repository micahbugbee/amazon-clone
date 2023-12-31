import React from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            // objectFit="contain"
            className="m-2 cursor-pointer"
          />
        </div>
        {/* Search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 ml-4">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>
        {/* Right side */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="cursor-pointer link">
            <p className="hover:underline">
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div onClick={() => session && router.push('/orders')} className="cursor-pointer link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div onClick={() => router.push('/checkout')} className=" relative flex items-center cursor-pointer link">

            <span className="absolute top-0 right-0 md:left-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items.length}</span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center"> 
          <Bars3Icon className="h-6 mr-1" />
          All</p>
          <p className="link">Prime Video</p>
          <p className="link">Amazon Business</p>
          <p className="link">Today's Deals</p>
          <p className="hidden lg:inline-flex link">Electronics</p>
          <p className="hidden lg:inline-flex link">Food & Grocery</p>
          <p className="hidden lg:inline-flex link">Prime</p>
          <p className="hidden lg:inline-flex link">Buy Again</p>
          <p className="hidden lg:inline-flex link">Shopper Toolkit</p>
          <p className="hidden lg:inline-flex link">Health & Personal Care</p>
      </div>

    </header>
  );
}

export default Header;
