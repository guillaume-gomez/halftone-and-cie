import { ReactNode } from "react";

interface CardProps {
    title: ReactNode;
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
}

function Card({ title, children, className = "bg-base-200", bodyClassName = "" } : CardProps) {
    return (
        <div className={`card ${className} border border-4 border-black`}>
          <div className={`card-body ${bodyClassName}`}>
            <div className="bg-neutral-300 p-2">
                <h2 className="card-title text-2xl text-black">{title}</h2>
            </div>
            {children}
          </div>
        </div>
    );
}

export default Card;