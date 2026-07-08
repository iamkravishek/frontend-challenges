import  {useState} from "react";

function ProgressBar() {
    const [widthPercentage, setWidthPercentage] = useState(0);

    const increment = () => {
        if (widthPercentage === 100) return;
        setWidthPercentage((prev) => {
            return prev + 10;
        })
    }

    const decreament = () => {
        if (widthPercentage === 0) return;
        setWidthPercentage((prev) => {
            return prev - 10;
        })
    }
    return (
        <div>
            <div
                style={{
                    width: '200px',
                    height:"20px",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    color: '#000',
                    border: '1px solid #000',
                    overflow: 'hidden',
                    borderRadius: '0.5rem',
                    position: 'relative'  
                }}
            >
                <div
                    className="progressbar"
                    id="testBgColor"
                    style={{
                        width: `${widthPercentage}%`, 
                        height: '100%',
                        textAlign: 'center', 
                        backgroundColor: widthPercentage < 40 ? 'red' : widthPercentage <= 79 ? 'orange' : 'green',
                        
                    }}
                >
                    <span style={{position:'absolute',left:'50%'}}>{widthPercentage}%</span>
                </div>
            </div>
            <div>
                <button onClick={decreament}>-10%</button>
                <button onClick={increment}>+10%</button>
            </div>
        </div>
    );
}

export default ProgressBar;
