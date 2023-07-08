"use client";
import Link from 'next/link';
import TransitionEffect from "@/components/TransitionEffect";
import Image from 'next/image'
import { usePathname } from 'next/navigation';


export default function Page({ children }) {
    return (
        <TransitionEffect>
            <div className="parent center">
                <div className="card boxes">
                    <div className='cardSlider'>
                        <Link href="/" prefetch={true}>
                            <span style={{ marginTop: 8 }} className={usePathname() === "/" ? "dot home homeHigh" : "dot home"}>
                                <Image
                                    style={{ marginTop: 7 }}
                                    src="House.svg"
                                    width={17}
                                    height={17}
                                    draggable={false}
                                    alt="House"
                                    priority
                                />
                            </span>
                        </Link>
                        <Link href="/projects" prefetch={true}>
                            <span className={usePathname() === "/projects" ? "dot projects projectsHigh" : "dot projects"}>
                                <Image
                                    style={{ marginTop: 7 }}
                                    src="Folder.svg"
                                    width={17}
                                    height={17}
                                    draggable={false}
                                    alt="House"
                                    priority
                                />
                            </span>
                        </Link>
                        <Link href="/interests" prefetch={true}>
                            <span className={usePathname() === "/interests" ? "dot interests interestsHigh" : "dot interests"}>
                                <Image
                                    style={{ marginTop: 7 }}
                                    src="Interests.svg"
                                    width={17}
                                    height={17}
                                    draggable={false}
                                    alt="House"
                                    priority
                                />
                            </span>
                        </Link>
                    </div>

                    <div className='description'>
                        {children}
                    </div>
                </div>
            </div>
        </TransitionEffect >
    )
}