import { ReactNode } from 'react';

export const metadata = {
    title: 'RMC Admin Dashboard',
    description: 'RMC Admin Dashboard',
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
