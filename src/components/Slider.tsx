
interface SliderProp {
    label: string
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

function Slider({ label, value, onChange, min, max } : SliderProp) {
    return (
        <div>
            <label>{label}</label>
            <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(parseInt(e.target.value))}/>
        </div>
    );
}

export default Slider;