import React, { useState, Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/Stepper.scss";

import useLocalStorage from "../../hooks/useLocalStorage";
import { createBusinessSheet } from "../../api/businessSheet";

import { messages } from "../../constants/messages";
import PreviewModal from "./PreviewModal";
import Button from "../global/Button";

const Stepper = ({ children, data, handleInit, submitForm }) => {
  const { getValue, setValue, clearAll } = useLocalStorage();
  const [message, setMessage] = useState({ type: "", content: "" });
  const [activeStep, setActiveStep] = useState(Number(getValue("activeStep")));
  const [loading, setLoading] = useState(false);
  const numberOfChildern = Children.count(children);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, numberOfChildern - 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    setMessage({ type: "", content: "" });

    await submitForm(async (data) => {
      try {
        setLoading(true);
        const result = await createBusinessSheet(data);

        switch (result.status) {
          case 201:
            setActiveStep(0);
            clearAll();
            handleInit();
            navigate("/profile");
            console.log("succsessfull");
            break;

          default:
            setMessage({ type: "error", content: messages.tryAgain });
        }
      } catch (error) {
        setMessage({ type: "error", content: messages.tryAgain });
      } finally {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setValue("activeStep", Number(activeStep));
  }, [activeStep, setValue, children]);

  return (
    <div className="stepper-container">
      {/* step number */}
      <>
        <span className="steps-number">
          {activeStep + 1}/{numberOfChildern}
        </span>

        <progress
          className="progress-bar"
          value={activeStep + 1}
          max={numberOfChildern}
        ></progress>

        <div className="steps">{Children.toArray(children)[activeStep]}</div>
      </>

      {/* control buttons */}
      <div className="button-group">
        {/* previouse */}
        {activeStep !== 0 && (
          <Button content={"戻る"} variant={"gray"} onClick={handlePrev} />
        )}

        {/* next */}
        {activeStep !== numberOfChildern - 1 && (
          <Button
            content={"次へ"}
            variant={"dark"}
            onClick={handleNext}
            disabled={activeStep === numberOfChildern - 1}
          />
        )}

        {/* submit */}
        {activeStep === numberOfChildern - 1 && (
          <Button
            isLoading={loading}
            content={"提出する"}
            variant={"dark"}
            onClick={handleSubmit}
          />
        )}

        {/* preview */}
        <PreviewModal data={data} />
      </div>

      {/* Enhanced message display with dynamic styling */}
      {message.content && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.content}
        </p>
      )}

      {/* skip */}
      {activeStep !== numberOfChildern - 1 && (
        <button className="skipBtn" onClick={handleNext}>
          スキップ
        </button>
      )}

      {/* <span className="orBtn">または</span>
      <span className="alreadyHaveSheet">
        すでに略歴シートをお持ちの方はこちら
      </span> */}
    </div>
  );
};

export const Step = ({ children, title }) => {
  return (
    <div className="step-container">
      <h2>{title}</h2>

      <div className="step-content">{children}</div>
    </div>
  );
};

export default Stepper;
