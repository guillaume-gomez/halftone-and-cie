
interface SliderProps {
    label: string
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    float?: boolean;
    step?: number;
}

function Slider({
    label,
    value,
    onChange,
    min,
    max,
    float = false,
    step = 1,
} : SliderProps) {
    return (
        <div>
            <label>
                <span className="text-bold text-base-content">{label} : </span>
                <span className="text-bold text-base-content">{value}</span>
            </label>
            <input
                className="range range-secondary"
                type="range"
                min={min}
                step={step}
                max={max}
                value={value}
                onChange={(e) =>
                    {
                        if(float) {
                            onChange(parseFloat(e.target.value))
                        } else {
                            onChange(parseInt(e.target.value))
                        }
                    }
                }
            />
        </div>
    );
}

export default Slider;