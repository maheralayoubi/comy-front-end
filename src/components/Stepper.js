import React, { useState, Children, useEffect } from "react";
import "./styles/Stepper.scss";
import Button from "./global/Button";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { createBusinessSheet } from "../api/businessSheet";
import PreviewModal from "./PreviewModal";

const Stepper = ({ children, data, handleInit }) => {
  const { getValue, setValue, clearAll } = useLocalStorage();
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
    try {
      setLoading(true);
      const result = await createBusinessSheet(data);
      console.log(result);
      if (result.status === 201) {
        setActiveStep(0);
        clearAll();
        handleInit();
        navigate("/profile");
        console.log("succsessfull");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("activeStep", Number(activeStep));
  }, [activeStep, setValue, children]);

  return (
    <div className="stepper-container">
      <span className="steps-number">
        {activeStep + 1}/{numberOfChildern}
      </span>

      <progress
        className="progress-bar"
        value={activeStep + 1}
        max={numberOfChildern}
      ></progress>

      <div className="steps">{Children.toArray(children)[activeStep]}</div>

      <div className="button-group">
        {activeStep !== 0 && (
          <Button content={"戻る"} variant={"gray"} onClick={handlePrev} />
        )}
        {activeStep !== numberOfChildern - 1 && (
          <Button
            content={"次へ"}
            variant={"dark"}
            onClick={handleNext}
            disabled={activeStep === numberOfChildern - 1}
          />
        )}
        {activeStep === numberOfChildern - 1 && (
          <Button
            isLoading={loading}
            content={"提出する"}
            variant={"dark"}
            onClick={handleSubmit}
          />
        )}
        <PreviewModal data={data} />
      </div>

      {activeStep !== numberOfChildern - 1 && (
        <button className="skipBtn" onClick={handleNext}>
          スキップ
        </button>
      )}

      <span className="orBtn">または</span>
      <span className="alreadyHaveSheet">
        すでに略歴シートをお持ちの方はこちら
      </span>
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
