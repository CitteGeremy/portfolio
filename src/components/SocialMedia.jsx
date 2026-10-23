import React from 'react';
import { BsDiscord, BsLinkedin, BsTwitch, BsYoutube } from 'react-icons/bs';

const socialLinks = [
  { label: 'Discord', href: 'https://discord.com/users/213819400191606785', Icon: BsDiscord },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/g%C3%A9r%C3%A9my-citt%C3%A9/', Icon: BsLinkedin },
  { label: 'Twitch', href: 'https://www.twitch.tv/kaiizer971', Icon: BsTwitch },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCJc0vbzF6xAi83sHeYqfZsw', Icon: BsYoutube },
];

const SocialMedia = () => (
  <aside className="app__social" aria-label="Réseaux sociaux">
    {socialLinks.map(({ label, href, Icon }) => (
      <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
        <Icon aria-hidden="true" />
      </a>
    ))}
  </aside>
);

export default SocialMedia;
