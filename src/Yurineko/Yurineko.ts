import {
    ContentRating,
    SourceInfo
} from '@paperback/types'
import {
    getExportVersion,
    Main
} from '../Main'

const HOST = 'Yurineko'
import tags from './tags.json'

export const YurinekoInfo: SourceInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: getExportVersion('0.0.2'),
    name: 'Yurineko',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.ADULT
}

const Domain = 'yurineko.net'

export class Yurineko extends Main {
    Host = HOST
    Tags = tags

    HostDomain = `https://${Domain}/`
    UseId = true

    SearchWithGenres = true
    SearchWithNotGenres = false
    SearchWithTitleAndGenre = true
}