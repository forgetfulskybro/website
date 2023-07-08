"use client";
import Image from 'next/image'
import Page from '@/components/page'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function Home() {
  function calcAge(dateString) {
    let birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  }

  function birthday(date = "Jun 29") {
    if (Date().includes(date)) {
      return `Today is my birthday, turning ${calcAge(new Date("2004-06-28"))} years old`
    } else return `I'm currently ${calcAge(new Date("2004-06-28"))} years old`
  }

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div style={{ width: 550, marginTop: 25 }}>
          <div className='sizing'>Hello, my name is <a style={{ color: '#4ca6ca' }}>ForGetFulSkyBro</a> or <a style={{ color: '#4ca6ca' }}>Sky</a> for short. {birthday()} and I&apos;ve been coding for <a style={{ color: '#4ca6ca' }}>{calcAge(new Date("2019-07-03"))}</a> years. I enjoy creating open source projects on my free time or whenever I&apos;m not lazy.</div>
          <Link href="https://discord.com/users/268843733317976066" target='_blank'><div style={{ display: 'inline-block' }} className='cardSocials'>
            <Image
              style={{ marginTop: 5 }}
              src="Discord.svg"
              width={37}
              height={37}
              draggable={false}
              alt="Discord"
              priority
            />
          </div></Link>
          <Link href="https://github.com/forgetfulskybro" target='_blank'><div style={{ display: 'inline-block' }} className='cardSocials'>
            <Image
              style={{ marginTop: 5 }}
              src="Github.svg"
              width={37}
              height={37}
              draggable={false}
              alt="GitHub"
              priority
            />
          </div></Link>
          <Link href="https://rvlt.gg/functious" target='_blank'><div style={{ display: 'inline-block' }} className='cardSocials'>
            <Image
              style={{ marginTop: 5 }}
              src="Revolt.svg"
              width={37}
              height={37}
              draggable={false}
              alt="Revolt"
              priority
            />
          </div></Link>
        </div>

        <Image
          className='hide'
          src="/Me.png"
          height={240}
          width={240}
          draggable={false}
          alt="Avatar"
        />
      </Page>
    </main>
  )
}
