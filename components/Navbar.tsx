'use client'

import Image from "next/image"
import Link from "next/link"
import posthog from "posthog-js"

const Navbar = () => {
    const handleNavClick = (label: string, href: string) => {
        posthog.capture('nav_link_clicked', {
            nav_label: label,
            nav_href: href,
        })
    }

    return (
        <header>
            <nav className="text-white">
                <Link href={'/'} className="logo flex items-center justify-center gap-2 " onClick={() => handleNavClick('Logo', '/')}>
                    <Image src={'/icons/logo.png'} alt="logo" width={25} height={25} />
                    <p>DevEvent</p>
                </Link>
                <ul className="flex items-center gap-5">
                    <Link href={'/'} onClick={() => handleNavClick('Home', '/')}>Home</Link>
                    <Link href={'/events'} onClick={() => handleNavClick('Events', '/events')}>Events</Link>
                    <Link href={'/create'} onClick={() => handleNavClick('Create', '/create')}>Create</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar