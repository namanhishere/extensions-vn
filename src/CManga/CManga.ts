import {
    ContentRating,
    SourceInfo
} from '@paperback/types'
import {
    getExportVersion,
    Main
} from '../Main'

const HOST = 'CManga'
import tags from './tags.json'

export const CMangaInfo: SourceInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: getExportVersion('0.0.2'),
    name: 'CManga',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.ADULT
}

export class CManga extends Main {
    Host = HOST
    Tags = tags

    UseId = false

    SearchWithGenres = true
    SearchWithNotGenres = false
    SearchWithTitleAndGenre = true
    HostDomain = 'https://cmangaah.com/'
}
