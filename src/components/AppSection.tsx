import React from 'react';

type AppSectionProps = {
    children: React.ReactNode;
}

export const AppSection = ({ children }: AppSectionProps) => {
    return (
        <section className="app-section m-random_media">
            {children}
        </section>
    )
}