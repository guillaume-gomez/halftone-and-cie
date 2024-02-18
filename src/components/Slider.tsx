
interface SliderProps {
    label: string
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

function Slider({ label, value, onChange, min, max } : SliderProps) {
    return (
        <div>
            <label>
                <span class="text-bold">{label} : </span>
                {value}
            </label>
            <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(parseInt(e.target.value))}/>
        </div>
    );
}

export default Slider;