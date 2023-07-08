"use client";
import Image from 'next/image'
import Page from '@/components/page'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Projects() {

  const array = [{
    title: "Would You",
    image: "/WouldYou.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "An activity based bot that helps improve overall activity for your server.",
    footer: {
      start: "Aug 22, 2022",
      end: "Present",
    },
    flags: [],
  }, {
    title: "ForGetFul",
    image: "/Forgetful.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }, { name: "Website", color: "#3B3E40" }],
    desc: "A multipurpose bot that suited for many needs.",
    footer: {
      start: "Jul 03, 2019",
      end: "Jun 12, 2023",
    },
    flags: [{ name: "Discontinued", color: "#CC222A" }],
  }, {
    title: "Support Bot",
    image: "/Support.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "Custom support bot with modmail, giveaways, suggestions, and more.",
    footer: {
      start: "Sep 30, 2022",
      end: "Present",
    },
    flags: [],
  }, {
    title: "Functious",
    image: "/Functious.png",
    tags: [{ name: "Revolt Bot", color: "#FE4654" }],
    desc: "Revolt bot that allows for creating giveaways, polls, and reaction roles.",
    footer: {
      start: "Feb 18 2023",
      end: "Present",
    },
    flags: [],
  }, {
    title: "Revolt Modmail",
    image: null,
    tags: [{ name: "Revolt Bot", color: "#FE4654" }],
    desc: "The first Modmail bot that is made in Revolt.",
    footer: {
      start: "Feb 4, 2023",
      end: "Present",
    },
    flags: [],
  }, {
    title: "Revolt Bridge",
    image: null,
    tags: [{ name: "Revolt Bot", color: "#FE4654" }],
    desc: "A very simple way to bridge your Revolt & Discord servers together.",
    footer: {
      start: "Feb 7, 2023",
      end: "Present",
    },
    flags: [],
  }, {
    title: "Durchie",
    image: "/Durchie.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "A multipurpose bot that was made to keep your members entertained.",
    footer: {
      start: "Jun 1, 2021",
      end: "Jun 9,2022",
    },
    flags: [{ name: "Contribution", color: "#4ca6ca" }, { name: "Discontinued", color: "#CC222A" }],
  }, {
    title: "AYB",
    image: "/Ayb.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }, { name: "Website", color: "#3B3E40" }],
    desc: "Involves AYB Music bot and AYB API that the website used.",
    footer: {
      start: "Dec 10, 2020",
      end: "Unknown",
    },
    flags: [{ name: "Contribution", color: "#4ca6ca" }, { name: "Discontinued", color: "#CC222A" }],
  }, {
    title: "Luau.gg",
    image: "/Luau.jpg",
    tags: [{ name: "Website", color: "#3B3E40" }],
    desc: "Website made by SamOphis on GitHub.",
    footer: {
      start: "Apr 1, 2022",
      end: "Apr 1, 2022",
    },
    flags: [{ name: "Contribution", color: "#4ca6ca" }, { name: "Discontinued", color: "#CC222A" }],
  }]

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div style={{ marginRight: 10, maxHeight: '80vh' }} className='flexGrid'>
          {array.map((project) => (
            <div key={project.title} className='projectCard flex'>
              <div className='projectTitle'>
                {project.image && (
                  <Image
                    className='img'
                    src={project.image}
                    height={25}
                    width={25}
                    draggable={false}
                    alt="Avatar"
                    priority />
                )}
                <a style={{ marginLeft: 0.7, marginTop: 1.3 }}>{project.title}</a>
              </div>
              <div className='projectDesc'>{project.desc}</div>
              <div className='tags'>
                {project.tags.map((tag) => (
                  <div key={tag.name} style={{ backgroundColor: tag.color }} className='projectTags'>{tag.name}</div>
                ))}
              </div>
              <div className='projectFooter'>{project.footer.start} <a style={{ color: '#6A6969' }}>-</a> <a style={{ color: 'white', fontWeight: 1000 }}>{project.footer.end}</a>{project.flags.length > 0 && project.flags.map(e => (<a key={e.name} style={{ color: e.color, fontWeight: 1000, marginLeft: 10 }}>{e.name}</a>))}</div>
            </div>
          ))}
        </div>
      </Page>
    </main>
  )
}
