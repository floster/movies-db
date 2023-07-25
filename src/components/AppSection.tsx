import React from 'react';

type AppSectionProps = {
    children: React.ReactNode;
    extraClass?: string;
}

export const AppSection = ({ children, extraClass }: AppSectionProps) => {
    return (
        <section className={`app-section ${extraClass}`}>
            {children}
        </section>
    )
}