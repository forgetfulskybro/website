import React from "react";

export const LangSelect = () => {
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

  return data;
};
