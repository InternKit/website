import React from 'react'
import { Link } from 'react-router'
import './ButtonWithLink.css';

interface ButtonWithLinkProps {
  link: string
  text: string
  variant?: 'primary' | 'secondary' | 'on-purple'
  icon?: React.ReactNode
}

export const ButtonWithLink = ({ link, text, variant = 'primary', icon }: ButtonWithLinkProps) => {
  const isExternal = link.startsWith('http://') || link.startsWith('https://');

  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'button-primary bg-gray-50 dark:bg-white text-purple-primary dark:text-brand-dark border-transparent';
    } else if (variant === 'secondary') {
      return 'button-secondary border-gray-800 dark:border-white text-brand-dark dark:text-white hover:bg-white/10';
    } else if (variant === 'on-purple') {
      return 'button-on-purple bg-white text-brand-dark border-purple-primary';
    }
    return '';
  };

  const className = `w-full sm:w-auto px-8 py-3 md:px-6 md:py-3 border-2
    ${getVariantClasses()}
    font-semibold rounded-full transition-colors text-sm md:text-base flex items-center justify-center gap-2`;

  if (isExternal) {
    return (
      <a href={link} className={className}>
        {text}
        {icon}
      </a>
    );
  }

  return (
    <Link to={link} className={className}>
      {text}
      {icon}
    </Link>
  )
}
