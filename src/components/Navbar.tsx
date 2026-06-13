"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import logo from '@/../public/logo.png'
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    {
        name: "Home",
        href: "/",
    }
]

const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);

    useGSAP(()=>{
       const navTween = gsap.timeline({
           scrollTrigger:{
               trigger: navRef.current,
               start: "top top",
               end: "+=100",
               scrub: true,
           }
       })
        navTween.fromTo(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)' }, {
            backgroundColor: '#00000050',
            backdropFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        });
    }, { scope: navRef })

    return (
        <nav ref={navRef} className={`h-[90px] fixed top-0 left-0 right-0 z-50`}>
            <div className={`max-w-[1600px] flex justify-between items-center h-full mx-auto px-4`}>
                <div className="flex items-center h-full">
                    <Image src={logo} alt="logo" width={32} height={32} />
                    <h2 className={`text-3xl h-[32px] font-normal font-custom text-center`}>Velvet Pour</h2>
                </div>
                <div className="right flex items-center justify-between">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href}>{link.name}</a>
                    ))}
                </div>
            </div>

        </nav>
    );
};

export default Navbar;