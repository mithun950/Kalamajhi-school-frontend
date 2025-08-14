import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/marquees");
        const latest = res.data[0];
        setText(latest?.text || "");
      } catch (error) {
        console.error("Failed to fetch marquee text:", error);
      }
    };
    fetchNotice();
  }, []);

  if (!text) return null;

  return (
    <div className="w-full bg-orange-400 p-2">
      <Marquee gradient={false} speed={50}>
        <span className="px-4 text-sm font-semibold text-white">{text}</span>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;
