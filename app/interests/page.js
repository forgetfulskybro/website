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
    contribution: false,
  }, {
    title: "Would You",
    image: "/WouldYou.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "An activity based bot that helps improve overall activity for your server.",
    footer: {
      start: "Aug 22, 2022",
      end: "Present",
    },
    contribution: false,
  }, {
    title: "Would You",
    image: "/WouldYou.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "An activity based bot that helps improve overall activity for your server.",
    footer: {
      start: "Aug 22, 2022",
      end: "Present",
    },
    contribution: false,
  }, {
    title: "Would You",
    image: "/WouldYou.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "An activity based bot that helps improve overall activity for your server.",
    footer: {
      start: "Aug 22, 2022",
      end: "Present",
    },
    contribution: false,
  }, {
    title: "Would You",
    image: "/WouldYou.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "An activity based bot that helps improve overall activity for your server.",
    footer: {
      start: "Aug 22, 2022",
      end: "Present",
    },
    contribution: false,
  }, {
    title: "Would You",
    image: "/WouldYou.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "An activity based bot that helps improve overall activity for your server.",
    footer: {
      start: "Aug 22, 2022",
      end: "Present",
    },
    contribution: false,
  }, {
    title: "Would You",
    image: "/WouldYou.png",
    tags: [{ name: "Discord Bot", color: "#5764F3" }],
    desc: "An activity based bot that helps improve overall activity for your server.",
    footer: {
      start: "Aug 22, 2022",
      end: "Present",
    },
    contribution: false,
  }, {
    title: "Functious",
    image: "/Functious.png",
    tags: [{ name: "Revolt Bot", color: "#FE4654" }],
    desc: "Revolt bot that allows for creating giveaways, polls, and reaction roles.",
    footer: {
      start: "Feb 18 2023",
      end: "Present",
    },
    contribution: false,
  }, {
    title: "Luau.gg",
    image: "/Luau.jpg",
    tags: [{ name: "Website", color: "#3B3E40" }],
    desc: "Website made by SamOphis on GitHub.",
    footer: {
      start: "Apr 1, 2022",
      end: "Apr 1, 2022",
    },
    contribution: true,
  }]

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div style={{ marginRight: 10 }} className='flexGrid'>

        </div>
      </Page>
    </main>
  )
}
