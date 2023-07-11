"use client";
import Image from 'next/image'
import Page from '@/components/page'
import { useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Projects() {

  const array = [{
    title: "JavaScript",
    image: "/Javascript.svg",
  }, {
      title: "HTML",
      image: "/Html5.svg",
    }, {
      title: "CSS",
      image: "/Css3.svg",
    }, {
      title: "Next.js",
      image: "/Nextjs.svg",
    }, {
      title: "React",
      image: "/React.svg",
    },{
      title: "Node.js",
      image: "/Nodejs.svg",
    },{
      title: "MongoDb",
      image: "/Mongodb.svg",
    },];

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div style={{ marginRight: 10, maxHeight: '80vh' }} className='flexGrid'>
          {array.map((project) => (
            <div key={project.title} className='interestsCard flex'>
              <div className='interestsTitle center'>
                {project.image && (
                  <Image
                    src={project.image}
                    height={25}
                    width={25}
                    draggable={false}
                    alt={project.name}
                    priority />
                )}
                <a style={{ marginLeft: 0.7 }}>{project.title}</a>
              </div>
            </div>
          ))}
        </div>
      </Page>
    </main>
  )
}
