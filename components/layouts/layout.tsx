import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react"
import { Navbar } from '../ui/Navbar';
import { Sidebar } from '../ui/Sidebar';

interface LayoutProps {
    title?: string
    children: JSX.Element | JSX.Element[]
}

export const Layout: FC<LayoutProps> = ({title = 'OpenJira', children}) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>

            <Navbar />
            <Sidebar />

            <Box sx={{padding: '10px 20px'}}>
                {children}
            </Box>
        </Box>
    )
}