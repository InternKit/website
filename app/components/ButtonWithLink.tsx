import React from 'react'
import { Link } from 'react-router'

interface ButtonWithLinkProps {
  link: string
  text: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  icon?: React.ReactNode
  onClick?: () => void
}

const variants = {
  primary: 'stamp-press bg-action text-on-action hover:bg-action-hover',
  secondary: 'border-2 border-ink bg-surface text-fg-1 hover:bg-action-tint-weak transition-colors',
  ghost: 'text-link hover:bg-action-tint-weak active:bg-action-tint transition-colors',
}

export const ButtonWithLink = ({ link, text, variant = 'primary', size = 'md', icon, onClick }: ButtonWithLinkProps) => {
  const isExternal = link.startsWith('http://') || link.startsWith('https://');

  const className = `inline-flex items-center justify-center gap-2 rounded-sm px-5 text-body font-semibold whitespace-nowrap
    ${size === 'lg' ? 'h-13 w-full sm:w-auto' : 'h-11'} ${variants[variant]}`;

  if (isExternal) {
    return (
      <a href={link} className={className} onClick={onClick}>
        {text}
        {icon}
      </a>
    );
  }

  return (
    <Link to={link} className={className} onClick={onClick}>
      {text}
      {icon}
    </Link>
  )
}
