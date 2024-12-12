import React, { useState } from 'react'
import UilHome from '@iconscout/react-unicons/icons/uil-home'
import UilBuilding from '@iconscout/react-unicons/icons/uil-building'
import UilFolder from '@iconscout/react-unicons/icons/uil-folder'
import UilUser from '@iconscout/react-unicons/icons/uil-user'
import UilAnalytics from '@iconscout/react-unicons/icons/uil-analytics'
import UilTime from '@iconscout/react-unicons/icons/uil-clock'
import UilCalendar from '@iconscout/react-unicons/icons/uil-calendar-alt'
import UilAddon from '@iconscout/react-unicons/icons/uil-plus-circle'
import userAvatar from '../images/avatar.png'

import { useDarkMode } from './DarkModeContext';

const Sidebar = ({ sidebarClosed }) => {
    const { darkMode, toggleDarkMode } = useDarkMode();


    return (
        <>
            <nav className={`${sidebarClosed ? '' : 'close'}`}>
                <div className="logo-name">
                    <div className="logo-image">
                        {/* <img src="images/logo.png" alt="" /> */}
                    </div>
                    <span className="logo_name">Admin</span>
                </div>
                
            </nav>
        </>
    )
}

export default Sidebar