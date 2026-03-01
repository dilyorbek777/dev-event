'use client'

import Image from "next/image"
import posthog from "posthog-js"

const ExploreBtn = () => {
    const handleClick = () => {
        console.log("loff")
        posthog.capture('explore_events_clicked')
    }

    return (
        <button type='button' id="explore-btn" className="text-white mx-auto my-5" onClick={handleClick}>
            <a href="#events">Explore events <Image width={30} height={30} src={'/icons/arrow-down.svg'} alt="Arrow down" /></a>
        </button>
    )
}

export default ExploreBtn