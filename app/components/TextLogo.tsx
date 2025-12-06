import React from 'react'
import { usePreferences } from '~/contexts/PreferencesContext';

export function Logo() {

    const { theme } = usePreferences();
    return (
        <div className="flex flex-row items-center gap-4">
            <img
                src="/logo.svg"
                alt="logo"
                className="w-10 h-10 rounded-lg"

            />
            {/* divider */}

            <span className="tracking-widest text-gray-900 dark:text-white text-lg font-semibold">
                INTERNKIT
            </span>
        </div>
  );
}
