import React from 'react'
import { Link } from 'react-router'

interface ButtonWithLinkProps {
  link: string
  text: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'reveal'
  size?: 'md' | 'lg'
  icon?: React.ReactNode
  onClick?: () => void
}

const variants = {
  primary: 'stamp-press bg-action text-on-action hover:bg-action-hover',
  secondary: 'border-2 border-ink bg-surface text-fg-1 hover:bg-action-tint-weak transition-colors',
  ghost: 'text-link hover:bg-action-tint-weak active:bg-action-tint transition-colors',
  // Primary colours without the lift: the icon is revealed on hover instead (header CTA).
  reveal: 'group border-2 border-ink bg-action text-on-action hover:bg-action-hover transition-all duration-200 ease-out',
}

export const ButtonWithLink = ({ link, text, variant = 'primary', size = 'md', icon, onClick }: ButtonWithLinkProps) => {
  const isExternal = link.startsWith('http://') || link.startsWith('https://');

  // reveal animates its own icon spacing, so it gets no fixed gap.
  const className = `inline-flex items-center justify-center ${variant === 'reveal' ? '' : 'gap-2'} rounded-sm px-5 text-body font-semibold whitespace-nowrap
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
