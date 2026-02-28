'use client'

import Image from "next/image"

const ExploreBtn = () => {
    return (
        <button type='button' id="explore-btn" onClick={() => console.log("loff")}>
            <a href="#events">Explore events <Image width={30} height={30} src={'/icons/arrow-down.svg'} alt="Arrow down" /></a>
        </button>
    )
}

export default ExploreBtn