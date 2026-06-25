"use client";

import { useState } from "react";
import { Locale, translations } from "@/utils";

function Page() {
  const [lang, setLang] = useState<Locale>("en");
  const data = translations[lang];

  function handleSelect(e) {
    setLang(e.target.value);
  }

  return (
    <div>
      <div className="text-right">
        <select
          value={lang}
          onChange={handleSelect}
          className="py-1 px-2 border border-gray-700 rounded-lg"
        >
          <option value={"en"}>English</option>
          <option value={"hi"}>Hindi</option>
          <option value={"es"}>Spanish</option>
          <option value={"ru"}>Russian</option>
        </select>
      </div>
      <div>
        <h1 className="text-xl mb-3">{data.title}</h1>
        <p className="mb-2">{data.description}</p>
        <p className="mb-2">{data.content}</p>
        <p>{data.thankyou}</p>
      </div>
    </div>
  );
}

export default Page;
