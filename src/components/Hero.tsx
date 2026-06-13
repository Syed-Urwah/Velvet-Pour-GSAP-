"use client"
import React, {useRef} from 'react';
import leftLeaf from '@/../public/images/hero-left-leaf.png'
import rightLeaf from '@/../public/images/hero-right-leaf.png'
import Image from "next/image";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/all";
import gsap from "gsap";

function Hero() {
    const bgImageUrl = "/images/noise.png";
    const videoRef = useRef<HTMLVideoElement>(null);

    useGSAP(()=>{
        // split elements with the class "split" into words and characters
        let heroSplit = SplitText.create(".title", { type: "words, chars" });
        let paragraphSplit = SplitText.create(".subtitle", { type: "lines" });

        // now animate the characters in a staggered fashion
        gsap.from(heroSplit.chars, {
            duration: 1.8,
            y: 200,
            autoAlpha: 0,
            stagger: 0.06
        });

        gsap.from(paragraphSplit.lines, {
            duration: 1,
            y: 100,
            autoAlpha: 0,
            stagger: 0.05,
            delay: 1
        });

        // Leaves animation on scroll
        gsap.timeline({
            scrollTrigger:{
                trigger: '#hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        })
        .to(".right-leaf", {y: 200}, 0)
        .to('.left-leaf', {y: -200}, 0);

        // Video scrubbing logic
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;

            gsap.timeline({
                scrollTrigger: {
                    trigger: "video",
                    start: "center 60%",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    onUpdate: (self) => {
                        if (video.duration) {
                            video.currentTime = video.duration * self.progress;
                        }
                    }
                }
            });
        }
    },[])

    return (
        <section
            id="hero"
            style={{ backgroundImage: `url(${bgImageUrl})` }}
            className="min-h-screen flex flex-col pt-[90px] relative overflow-hidden bg-cover bg-center">
            
            <div className="video absolute inset-0 -z-10">
                <video
                    ref={videoRef}
                    // className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                    src="/videos/output.mp4"
                />
            </div>

            <h1 className="title font-custom text-9xl md:text-[240px] lg:text-[300px] xl:text-[330px] text-center z-10 relative">
                MOJITO
            </h1>
            
            <Image
                id="left-leaf"
                src={leftLeaf} alt="left-leaf" width={327} height={327}
                className="left-leaf absolute top-1/4 z-20"
            />
            <Image
                id="right-leaf"
                src={rightLeaf} alt="right-leaf" width={327} height={327}
                className="right-leaf absolute right-0 top-0 z-20"
            />

            <div className="body absolute bottom-6 left-0 right-0 z-30">
                <div id="content" className="max-w-[1600px] mx-auto flex justify-between px-10">
                    <div id="left" className="space-y-4">
                        <p className="subtitle font-sans text-[16px] font-medium">Cool. Crisp. Classic.</p>
                        <h2 className="subtitle font-custom text-[50px] text-[#E7D393] leading-12">Sip the Spirit <br/> of Summer</h2>
                    </div>
                    <div id="right" className="max-w-[292px] space-y-4">
                        <p className="subtitle font-sans text-[16px] font-medium">Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. </p>
                        <a href="" className="subtitle font-sans text-[18px] font-semibold underline">View cocktails</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;