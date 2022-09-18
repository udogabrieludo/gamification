import homeicon from '../../assets/images/home-icon.svg'
import profileicon from '../../assets/images/profile-icon.svg'
import leaderboardicon from '../../assets/images/leaderboard-icon.svg'
import helpicon from '../../assets/images/help-icon.svg'
import gameicon from '../../assets/images/games-icon.svg'
import gifticon from '../../assets/images/gift.svg'
// import homeicon from '../../assets/images/home-icon.svg'
export const sidebarroute = [
    {
        id: 1,
        link: '/dashboard',
        name: 'dashboard',
        icon: homeicon
    },
    {
        id: 2,
        link: '#',
        name: 'games',
        icon: gameicon,
        sub: [
            {
                id: 11,
                link: '/scramble',
                name: 'Scramble',
                icon: gameicon,
            },
            // {
            //     id: 12,
            //     link: '/guess-game',
            //     name: 'guess game',
            //     icon: gameicon,
            // },
            {
                id: 13,
                link: '/trivia-game',
                name: 'trivia game',
                icon: gameicon,
            }
        ]
    },
    {
        id: 3,
        link: '/leaderboard',
        name: 'leaderboard',
        icon: leaderboardicon
    },
    {
        id: 7,
        link: '/rewards-prizes',
        name: 'Prizes',
        icon: gifticon
    },
    {
        id: 4,
        link: '/help',
        name: 'help',
        icon: helpicon
    },
    {
        id: 5,
        link: '/profile',
        name: 'profile',
        icon: profileicon
    },
    {
        id: 6,
        link: '#',
        name: 'logout',
        icon: helpicon
    }
]
export const landingRoutes = [
    {
        id: 101,
        name: 'how to play',
        route: '/how-to-play'
    },
    {
        id: 202,
        name: 'Prizes',
        route: '/prizes'
    },
    {
        id: 303,
        name: 'help & support',
        route: '/help-support'
    }
]