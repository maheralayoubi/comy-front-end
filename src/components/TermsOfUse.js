import React, { useState } from "react";
import "./styles/TermsOfUse.scss";

const TermsOfUse = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="terms-of-use-container">
      <h2>利用規約の同意</h2>

      <div className="terms-box">
        <p>
          利用規約
          <br />
          そのころわたくしは、モリーオ市の博物局に勤めて居りました。
          <br />
          そのころわたくしは、モリーオ市の博物局に勤めて居りました。
          十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給ほうきゅうもほんのわずかでしたが、
          受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。
          <br />
          殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すとそのころわたくしは、
          モリーオ市の博物局に勤めて居りました
          受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。
          <br />
          殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すとそのころわたくしは、
          モリーオ市の博物局に勤めて居りました
          受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。
          <br />
          殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すとそのころわたくしは、
          モリーオ市の博物局に勤めて居りました
          受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。
          <br />
          殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すとそのころわたくしは、
          モリーオ市の博物局に勤めて居りました
          受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。
          <br />
          殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すとそのころわたくしは、
          モリーオ市の博物局に勤めて居りました
          モリーオ市の博物局に勤めて居りました
          受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。
          <br />
          殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すとそのころわたくしは、
          モリーオ市の博物局に勤めて居りました
        </p>
      </div>

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="agree"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="agree">利用規約に同意する</label>
      </div>

      <button
        type="button"
        disabled={!isChecked}
        className={isChecked ? "enabled" : "disabled"}
        onClick={() => {
          window.location.href = "/stripe-payment";
        }}
      >
        次へ
      </button>
    </div>
  );
};

export default TermsOfUse;
