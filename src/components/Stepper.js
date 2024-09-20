import React, { useState, Children, useEffect } from 'react';
import "./styles/Stepper.scss"
import Button from './global/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal, { ModalButton, ModalContent } from './Modal';
import BusinessSheetTemplate from './BusinessSheetTemplate';
import PreviewHeader from './PreviewHeader';

const Stepper = ({ children, data }) => {

    const {getValue, setValue} = useLocalStorage()
    const [activeStep, setActiveStep] = useState(Number(getValue("activeStep")));
    const [previewModel, setPreviewModal] = useState(false)

    const handleNext = () => {
        setActiveStep(prev => Math.min(prev + 1, Children.count(children) - 1));
    };

    const handlePrev = () => {
        setActiveStep(prev => Math.max(0, prev - 1));
    };

    const handleTogglePreview = () => {
        console.log(data)
        setPreviewModal(prev => !prev)
    }


    useEffect(() => {
        setValue("activeStep", Number(activeStep))
    }, [activeStep, setValue, children])

    return (
        <div className="stepper-container">

            <span className='steps-number'>{activeStep + 1}/{Children.count(children)}</span>

            <progress className='progress-bar' value={activeStep + 1} max={Children.count(children)}></progress>

            <div className="steps">
                {Children.toArray(children)[activeStep]}
            </div>

            <div className="button-group">
                {activeStep !== 0 &&
                    <Button content={"戻る"} variant={"gray"} onClick={handlePrev} disabled={activeStep === 0} />}
                <Button content={"次へ"} variant={"dark"} onClick={handleNext} disabled={activeStep === Children.count(children) - 1} />
                <Modal>
                    <ModalButton>
                        <Button content={"プレビュー"} variant={"white"} onClick={handleTogglePreview} />
                    </ModalButton>
                    <ModalContent isOpen={previewModel} onClose={handleTogglePreview}>
                        <PreviewHeader />
                        <BusinessSheetTemplate data={data}/>
                    </ModalContent>
                </Modal>
            </div>

            <button className='skipBtn' onClick={handleNext}>
                スキップ
            </button>
            <span className='orBtn'>
                または
            </span>
            <span className='alreadyHaveSheet'>
                すでに略歴シートをお持ちの方はこちら
            </span>

        </div>
    );
};

export const Step = ({ children, title }) => {
    return (
        <div className="step-container">
            <h2>{title}</h2>

            <div className='step-content'>
                {children}
            </div>
        </div>
    );
};

export default Stepper;
