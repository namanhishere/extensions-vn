import {
    ContentRating,
    SourceInfo
} from '@paperback/types'
import {
    getExportVersion,
    Main
} from '../Main'

const HOST = 'SayHentai'

export const SayHentaiInfo: SourceInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: getExportVersion('0.0.1'),
    name: 'SayHentai',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.ADULT
}

export class SayHentai extends Main {
    Host = HOST
}