import { ReactNode } from "react";

interface CardProps {
    title: string
    children: ReactNode;
    className?: string
}

function Card({ title, children, className = "bg-base-200" } : CardProps) {
    return (
        <div className={`card ${className} border border-4`}>
          <div className="card-body">
            <div className="bg-neutral-300 p-2">
                <h2 className="card-title text-2xl text-black">{title}</h2>
            </div>
            {children}
          </div>
        </div>
    );
}

export default Card;