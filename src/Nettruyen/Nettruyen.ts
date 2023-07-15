import {
    ContentRating,
    SourceInfo,
    BadgeColor,
} from '@paperback/types'

const DOMAIN = 'https://www.nettruyenmax.com'

export const NettruyenInfo: SourceInfo = {
    version: '1.3.0',
    name: 'NetTruyen',
    icon: 'icon.jpg',
    author: 'Hoang3409',
    authorWebsite: 'https://github.com/hoang3402',
    description: 'Extension that pulls manga from NetTruyen.',
    websiteBaseURL: DOMAIN,
    contentRating: ContentRating.MATURE,
    sourceTags: [
        {
            text: 'Recommended',
            type: BadgeColor.GREEN,
        },
        {
            text: 'Notifications',
            type: BadgeColor.BLUE,
        },
    ],
}
