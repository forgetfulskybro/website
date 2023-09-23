/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import Image from "next/image";
import Page from "@/components/pageSecondary";
import { usePathname } from "next/navigation";

export default function Projects() {
  // <Link className="link" target="_blank" href="">
  // <Image className="imageSource" src="" alt="Image" height="125" width="125"/>
  return (
    <main key={usePathname()} className="main">
      <Page>
        <div style={{ maxHeight: "80vh" }} className="flexGrid">
          <div className="blogPostTitle">
            <h2>Revolt Awareness</h2>
            <h6 style={{ color: "#a29f9f" }}>September 23, 2023</h6>
          </div>

          <div className="divider"></div>

          <div className="blogPostBody">
            <div>
              All content posted on this blog page were gathered from sources
              (that will be listed down below) and some remarks or new
              information I&apos;ve found since these were made. If you would
              like to check those articles out, I suggest doing so and spreading
              awareness about Revolt and their staff team.
              <br />
              <br />
              <a className="blogHeader">Sources</a>
              <br />•{" "}
              <Link
                className="link"
                target="_blank"
                href="https://qyint-community.github.io/feed/qyint-community-feed/post11.html">
                Qyint Community Feed
              </Link>
              <br />•{" "}
              <Link
                className="link"
                target="_blank"
                href="https://rentry.org/rebolt">
                Rebolt
              </Link>
            </div>
            <br />
            <br />
            <div>
              <a className="blogHeader">A: Illegal Activity</a>
              <br />
              <br />
              The{" "}
              <Link
                className="link"
                target="_blank"
                href="https://revolt.chat/aup">
                Revolt AUP
              </Link>{" "}
              clearly states:
              <span className="blockquote">
                &quot;[We do not allow] using Revolt for illegal operations.
                These include, but are not limited to, hacking, the cracking or
                distribution of pirated software, [...] for our or another
                company or person&apos;s service.&quot;
              </span>
              <br />
              <br />
              The Revolt administration hypocritically allows{" "}
              <strong>Lea</strong> (@Lea#5128), another Revolt admin, to{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.io/pEATcep_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=grand">
                publicly share a link to a self-hosted repository of 3.6TB of
                unethically pirated Nintendo content
              </Link>
              , which include games as new as those for the Nintendo Switch. A
              broken justification for this clear AUP violation was given from a
              moderator by the name of Vale (@Vale#0210){" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.io/z3XDmYL_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=grand">
                right here
              </Link>
              , where he says that the "content isn't hosted on Revolt," but if
              "hosting" is the problem and not the "distribution" (i.e., linking
              to a website), which is a direct opposition to what the AUP
              states, how come did{" "}
              <Link
                className="link"
                target="_blank"
                href="https://rentry.org/rebolt#islamportal">
                Med's (Link to his article)
              </Link>{" "}
              server (i.e., IslamPortal) get banned from the platform for
              linking a free speech site (which is not illegal nor AUP-violating
              unlike <strong>Lea</strong>'s website)? Well, there is kind of an
              answer coming from a moderator named Vale (@Vale#0210){" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.com/z3XDmYL_d.webp?maxwidth=760&fidelity=grand">
                right here
              </Link>
              . But if hosting is the issue, how come a user's YouTube video was{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.com/FA9WtTA_d.webp?maxwidth=760&fidelity=grand">
                removed from their profile
              </Link>
              ?
            </div>
            <br />
            <div>
              To add onto this, after Med made his article talking about Lea
              having such link in his profile, Lea has since then{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.com/T9bHjFi_d.webp?maxwidth=760&amp;shape=thumb&amp;fidelity=grand">
                removed it from the profile
              </Link>
              . Another thing, I've recently{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.com/PSu29Zv_d.webp?maxwidth=760&amp;shape=thumb&amp;fidelity=grand">
                contacted Nintendo's piracy email
              </Link>{" "}
              about such website as it is blatant stealing of copyrighted
              content and Lea is even bosting about it in his Revolt profile.
              Once Nintendo has emailed me back, I'll add more images.
            </div>
            <br />
            <br />
            <div>
              <a className="blogHeader">B: Politics</a>
              <div style={{ fontSize: "11px" }}>
                - Everything listed in this area comes from{" "}
                <Link
                  className="link"
                  target="_blank"
                  href="https://qyint-community.github.io/feed/qyint-community-feed/post11.html">
                  Qynit Community
                </Link>{" "}
                of "No Politics!".
              </div>
              <br />
              The{" "}
              <Link
                className="link"
                target="_blank"
                href="https://rvlt.gg/RXJK3m0H">
                Revolt Lounge's
              </Link>{" "}
              rules include Rule 3 that states:
              <div className="blockquote">
                &quot;Unless directly related to Revolt, please avoid any
                politics discussion on this server.&quot;
              </div>
              <br />
              Now, I wouldnt even know how to enforce such a Rule. Politics is
              fighting over Peoples Interests, or as others would define it:
              "the total complex of relations between people living in society"
              So where do you draw the Line between a normal and a political
              Conversation? Free & Open-Source, for example, is an inherently
              leftist and thus political Concept.
              <br />
              <br />
              Anyway, if Politics arent allowed and I keep getting warned for
              it, how come Staff is allowed to{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.com/Bt6Vg8y_d.webp?maxwidth=760&fidelity=grand">
                insult an entire Group of People for their Political Position
              </Link>{" "}
              while we were talking about Apes?
              <br />
              <br />I also dont see how it is okay to{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.com/7XceCVr_d.webp?maxwidth=760&fidelity=grand">
                bring up
              </Link>{" "}
              - and misrepresent - my Stance on a completely different political
              Topic to make me seem bad. No explanation needed, Staff simply
              accepts this Defamation.{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.com/ryRDRYu_d.webp?maxwidth=760&fidelity=grand">
                Here
              </Link>{" "}
              is the Clarification of my Position btw. I did not post this in
              the Revolt Lounge though, as it would probably be considered
              political anyway. Everything they disagree with is called
              "political" so it breaks a Rule, while their own Politics can
              stay. The Infractions seem completely arbitrary.
            </div>
            <br />
            <br />
            <a className="blogHeader">B: Politics</a>
            <br />
            <br />
            <div>
              For being such "tolerant" leftists who cry about "acceptance" and
              "inclusivity," the Revolt admins seem to be unbelievably racist
              and bigoted, and by themselves allow lots of hateful racist
              content both on their platform and their official server, Revolt
              Lounge. While there exist no rules on the AUP condemning or
              suppressing hate speech (within the legal boundaries) at all, this
              still is relevant in two ways; the admins are breaking their own
              server rules, and they're employing double standards when it comes
              to who is made fun of. For instance, we see recently the same{" "}
              <strong>Lea</strong> up here shamelessly{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.io/VvkjBrX_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium">
                equating apes and monkeys
              </Link>{" "}
              with{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.io/62ZuaP7_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium">
                black people
              </Link>
              . The excuse was that "it's just a joke," but according to that
              logic, similar anti-LGBT memes and comments should be allowed to
              stay in the Revolt Lounge too. Reasoning? "It's just a joke," but
              apparently, homophobia and transphobia (even if you didn't mean
              it, like unintentional misgendering) seem to be a promise of an
              instant ban; not only on Revolt Lounge, but on the entire platform
              as well.
            </div>
            <br />
            <br />
            <a className="blogHeader">C: Privacy</a>
            <br />
            <br />
            <div>
              It's ridiculous that a "transparent" and "privacy-friendly"
              project that "focuses only on the user" doesn't prioritize
              fundamental aspects of privacy, like End-to-End-Encryption (E2EE)
              and a{" "}
              <Link
                className="link"
                target="_blank"
                href="https://i.imgur.io/GRG8vnZ_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium">
                commitment to staying 100% free &amp; open-source
              </Link>
              , as they still have proprietary blobs on their service such as
              the Admin Panel and the Discover section, both of which are huge
              parts of Revolt as a software. Revolt is no safer nor more private
              than Discord in this current state.
            </div>
            <br />
            <br />
            <a className="blogHeader">D: Politics</a>
            <br />
            <div>
              What I love about the Revolt admins is their maturity; their
              shaping of a welcoming aura and a safe chatting environment for
              newcomers, like <strong>Lea</strong>'s{" "}
              <Link
                href="https://i.imgur.io/0gytSKS_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium"
                className="link"
                target="_blank">
                constant rambling about child porn
              </Link>{" "}
              so much that it breaks the search system, the official moderation
              bot's{" "}
              <Link
                href="https://i.imgur.io/zwEGJG6_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium"
                className="link"
                target="_blank">
                decent profile banner
              </Link>
              ,{" "}
              <Link
                href="https://i.imgur.io/JrYQmK6_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium"
                className="link"
                target="_blank">
                ruling out disagreement with their worldviews as "hate speech"
              </Link>
              , add to that their professional moderation of their platform
              where they arbitrarily ban people for proper reasons like "
              <Link
                href="https://i.imgur.io/hVWfMd7_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium"
                className="link"
                target="_blank">
                being dumb
              </Link>
              ," "
              <Link
                href="https://i.imgur.io/2GHYUup_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium"
                className="link"
                target="_blank">
                annoying the chat (a.k.a., being a black gorilla)
              </Link>
              ," and "
              <Link
                href="https://i.imgur.io/tUWF0dV_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium"
                className="link"
                target="_blank">
                talking back to a moderator
              </Link>
              ." Oh, don't forget that the same admins{" "}
              <Link
                href="https://i.imgur.io/SubkjM4_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium"
                className="link"
                target="_blank">
                complain about having to moderate a simple server
              </Link>{" "}
              and have a tendency to{" "}
              <Link
                href="https://i.imgur.io/4FDrSBa_d.webp?maxwidth=640&amp;shape=thumb&amp;fidelity=medium"
                className="link"
                target="_blank">
                reject simple questions about the justification of mod abuse
              </Link>{" "}
              for transparency's sake. How mature!
            </div>
          </div>
        </div>
      </Page>
    </main>
  );
}
