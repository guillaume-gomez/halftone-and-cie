import { ReactNode } from "react";

interface CardProps {
    title: string
    children: ReactNode;
    className?: string
}

function Card({ title, children, className = "bg-base-200" } : CardProps) {
    return (
        <div className={`card ${className} border border-2`}>
          <div className="card-body">
            <h2 className="card-title text-2xl">{title}</h2>
            {children}
          </div>
        </div>
    );
}

export default Card;