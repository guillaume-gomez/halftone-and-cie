
interface ColorProps {
    label: string
    value: string;
    onChange: (value: string) => void;
}

function Color({ label, value, onChange } : ColorProps) {
    return (
        <div>
            <label>{label} : </label>
            <input type="color" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}

export default Color;