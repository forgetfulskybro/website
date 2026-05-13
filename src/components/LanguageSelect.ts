import React from "react";

export const LangSelect = () => {
  const [data, setData] = React.useState<string | null>("");

  React.useEffect(() => {
    const handleStorageChange = () => {
      const nextLang = localStorage.getItem("language") ?? "en_EN";
      if (nextLang !== data) setData(nextLang);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [data]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const lang = localStorage.getItem("language");
      setData(lang || "en_EN");
    }
  }, []);

  return data;
};
