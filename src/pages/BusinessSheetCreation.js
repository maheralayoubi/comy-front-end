import Header from '../components/global/Header';
import Stepper,{Step} from '../components/Stepper';

const BusinessSheetCreation = () => {
    return (
        <div>
            <Header />

            <Stepper>
                <Step title="Step 1">
                    <p>This is the content for Step 1.</p>
                </Step>
                <Step title="Step 2">
                    <p>This is the content for Step 2.</p>
                </Step>
                <Step title="Step 3">
                    <p>This is the content for Step 3.</p>
                </Step>
                <Step title="Step 4">
                    <p>This is the content for Step 4.</p>
                </Step>
                <Step title="Step 5">
                    <p>This is the content for Step 5.</p>
                </Step>
            </Stepper>
            
        </div>
    )
}

export default BusinessSheetCreation