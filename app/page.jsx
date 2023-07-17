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

  // function birthday(date = "Jun 29") {
  //   if (Date().includes(date)) {
  //     return (<a>Today is my birthday, turning <a className="Blue">{calcAge(new Date("2004-06-28"))}</a> years old</a>)
  //   } else return (<a>I&apos;m currently <a className="Blue">{calcAge(new Date("2004-06-28"))}</a> years old</a>)
  // }

  return (
    <main key={usePathname()} className="main">
      <Page>
        <div style={{ width: 550, marginTop: 25 }}>
          <div className='center flexGrid'>
          <Image
          style={{ marginBottom: 15 }}
          className='hiding'
          src="/Me.png"
          height={140}
          width={140}
          draggable={false}
          alt="Avatar"
          priority
          />
            
          </div>
          <div className='sizing'>Hello, my name is <a className="Blue">ForGetFulSkyBro</a> or <a className="Blue">Sky</a> for short. I&apos;m currently <a className="Blue">{calcAge(new Date("2004-06-28"))}</a> years old and I&apos;ve been coding for <a className="Blue">{calcAge(new Date("2019-07-03"))}</a> years. I enjoy creating open source projects on my free time or whenever I&apos;m not lazy.</div>
          <div className='center flexGrid'>
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
        </div>

        <Image
          className='hide highlight'
          src="/Me.png"
          height={240}
          width={240}
          draggable={false}
          alt="Avatar"
          priority
        />
      </Page>
    </main>
  )
}
