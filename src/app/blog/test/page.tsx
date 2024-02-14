"use client";
import Translate from "@components/translation";
import Page from "@/components/pageSecondary";
import { usePathname } from "next/navigation";
import React, { SetStateAction } from "react";

export default function Projects() {
  const [data, setData] = React.useState<string | null>("");

  React.useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (localStorage.getItem("language") !== data)
        return setData(localStorage.getItem("language"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [data]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      return setData(
        localStorage.getItem("language")
          ? localStorage.getItem("language")
          : "en_EN"
      );
    }
  }, []);
  //  <Link style={{color: '#9A5CB4'}} target="_blank" href="">
  // <Image className="imageSource" src="" alt="Image" height="125" width="125"/>
  return (
    <main key={usePathname()} className="main">
      <Page>
        <div style={{ maxHeight: "80vh" }} className="flexGrid">
          <div className="blogPostTitle">
            <h2>👋 Hello, this is a test</h2>
            <h6 style={{ color: "#a29f9f" }}>
              {new Translate().get(data!, "Blogs.creation")}: September 20, 2023
            </h6>
          </div>

          <div className="divider"></div>

          <div className="blogPostBody">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec
              pretium vulputate sapien nec sagittis aliquam malesuada. Diam quam
              nulla porttitor massa. At risus viverra adipiscing at in tellus
              integer feugiat. Maecenas ultricies mi eget mauris pharetra et.
              Diam ut venenatis tellus in metus vulputate. Diam quis enim
              lobortis scelerisque. Vivamus at augue eget arcu dictum varius
              duis at consectetur. Feugiat in ante metus dictum at tempor
              commodo. Vitae aliquet nec ullamcorper sit. Vestibulum rhoncus est
              pellentesque elit ullamcorper dignissim. Ornare arcu dui vivamus
              arcu felis bibendum ut tristique et. Augue lacus viverra vitae
              congue eu consequat. At auctor urna nunc id.
            </p>
            <br />
            <p>
              Hac habitasse platea dictumst quisque sagittis purus sit.
              Pellentesque habitant morbi tristique senectus. Neque vitae tempus
              quam pellentesque nec nam aliquam. Quam nulla porttitor massa id.
              Dolor sit amet consectetur adipiscing elit. Velit scelerisque in
              dictum non consectetur a. Erat nam at lectus urna duis convallis.
              Id neque aliquam vestibulum morbi blandit cursus risus. Viverra
              tellus in hac habitasse platea dictumst vestibulum rhoncus est.
              Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed.
              Morbi tristique senectus et netus et malesuada. Est ultricies
              integer quis auctor elit sed vulputate. Leo vel fringilla est
              ullamcorper eget nulla facilisi etiam dignissim. Senectus et netus
              et malesuada fames ac. Libero volutpat sed cras ornare arcu.
              Nullam vehicula ipsum a arcu. Aliquam malesuada bibendum arcu
              vitae elementum curabitur vitae.
            </p>
            <br />
            <p>
              Sapien pellentesque habitant morbi tristique senectus et. Non quam
              lacus suspendisse faucibus interdum posuere lorem ipsum dolor.
              Neque ornare aenean euismod elementum nisi quis eleifend. Lobortis
              elementum nibh tellus molestie nunc non. Libero id faucibus nisl
              tincidunt eget nullam non nisi. Adipiscing elit pellentesque
              habitant morbi tristique senectus et. Mauris in aliquam sem
              fringilla ut. A pellentesque sit amet porttitor eget dolor morbi
              non. Massa id neque aliquam vestibulum morbi blandit cursus risus.
              Arcu risus quis varius quam quisque id diam vel. Purus sit amet
              volutpat consequat mauris nunc congue. Congue eu consequat ac
              felis. Posuere urna nec tincidunt praesent semper feugiat nibh sed
              pulvinar. Accumsan in nisl nisi scelerisque. Pellentesque pulvinar
              pellentesque habitant morbi tristique senectus. Elit scelerisque
              mauris pellentesque pulvinar pellentesque habitant. Elit duis
              tristique sollicitudin nibh sit amet commodo nulla facilisi.
              Lacinia quis vel eros donec ac odio tempor orci dapibus. Venenatis
              a condimentum vitae sapien pellentesque habitant morbi.
            </p>
            <br />
            <p>
              Hac habitasse platea dictumst quisque sagittis purus sit.
              Pellentesque habitant morbi tristique senectus. Neque vitae tempus
              quam pellentesque nec nam aliquam. Quam nulla porttitor massa id.
              Dolor sit amet consectetur adipiscing elit. Velit scelerisque in
              dictum non consectetur a. Erat nam at lectus urna duis convallis.
              Id neque aliquam vestibulum morbi blandit cursus risus. Viverra
              tellus in hac habitasse platea dictumst vestibulum rhoncus est.
              Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed.
              Morbi tristique senectus et netus et malesuada. Est ultricies
              integer quis auctor elit sed vulputate. Leo vel fringilla est
              ullamcorper eget nulla facilisi etiam dignissim. Senectus et netus
              et malesuada fames ac. Libero volutpat sed cras ornare arcu.
              Nullam vehicula ipsum a arcu. Aliquam malesuada bibendum arcu
              vitae elementum curabitur vitae.
            </p>
            <br />
            <p>
              Hac habitasse platea dictumst quisque sagittis purus sit.
              Pellentesque habitant morbi tristique senectus. Neque vitae tempus
              quam pellentesque nec nam aliquam. Quam nulla porttitor massa id.
              Dolor sit amet consectetur adipiscing elit. Velit scelerisque in
              dictum non consectetur a. Erat nam at lectus urna duis convallis.
              Id neque aliquam vestibulum morbi blandit cursus risus. Viverra
              tellus in hac habitasse platea dictumst vestibulum rhoncus est.
              Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed.
              Morbi tristique senectus et netus et malesuada. Est ultricies
              integer quis auctor elit sed vulputate. Leo vel fringilla est
              ullamcorper eget nulla facilisi etiam dignissim. Senectus et netus
              et malesuada fames ac. Libero volutpat sed cras ornare arcu.
              Nullam vehicula ipsum a arcu. Aliquam malesuada bibendum arcu
              vitae elementum curabitur vitae.
            </p>
            <br />
            <p>
              Hac habitasse platea dictumst quisque sagittis purus sit.
              Pellentesque habitant morbi tristique senectus. Neque vitae tempus
              quam pellentesque nec nam aliquam. Quam nulla porttitor massa id.
              Dolor sit amet consectetur adipiscing elit. Velit scelerisque in
              dictum non consectetur a. Erat nam at lectus urna duis convallis.
              Id neque aliquam vestibulum morbi blandit cursus risus. Viverra
              tellus in hac habitasse platea dictumst vestibulum rhoncus est.
              Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed.
              Morbi tristique senectus et netus et malesuada. Est ultricies
              integer quis auctor elit sed vulputate. Leo vel fringilla est
              ullamcorper eget nulla facilisi etiam dignissim. Senectus et netus
              et malesuada fames ac. Libero volutpat sed cras ornare arcu.
              Nullam vehicula ipsum a arcu. Aliquam malesuada bibendum arcu
              vitae elementum curabitur vitae.
            </p>
          </div>
        </div>
      </Page>
    </main>
  );
}
