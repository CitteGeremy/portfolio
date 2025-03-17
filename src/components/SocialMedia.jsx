import React from 'react'
import { BsDiscord, BsLinkedin, BsTwitch, BsYoutube } from 'react-icons/bs';

const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>

        <a className='link-discord' href='https://discord.gg/Nf4gj97' target="_blank" rel="noreferrer">
            <BsDiscord  />
        </a>

        </div>
        <div>

        <a className='link-linkedin' href='https://www.linkedin.com/in/g%C3%A9r%C3%A9my-citt%C3%A9/' target="_blank" rel="noreferrer">
            <BsLinkedin />
        </a>

        </div>
        <div>

        <a className='link-twitch' href='https://www.twitch.tv/kaiizer971' target="_blank" rel="noreferrer">
            <BsTwitch />
        </a>

        </div>
        <div>

        <a className='link-yt' href='https://www.youtube.com/channel/UCJc0vbzF6xAi83sHeYqfZsw' target="_blank" rel="noreferrer">
            <BsYoutube />
        </a>

        </div>
    </div>
  )
}

export default SocialMedia