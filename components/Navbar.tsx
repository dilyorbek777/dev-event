import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    return (
        <header>
            <nav className="text-white">
                <Link href={'/'} className="logo flex items-center justify-center gap-2 ">
                    <Image src={'/icons/logo.png'} alt="logo" width={25} height={25} />
                    <p>DevEvent</p>
                </Link>
                <ul className="flex items-center gap-5">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/events'}>Events</Link>
                    <Link href={'/create'}>Create</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar