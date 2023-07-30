import {
    ContentRating,
    SourceInfo
} from '@paperback/types'
import {
    getExportVersion,
    Main
} from '../Main'

const HOST = 'BaoTangTruyen'
import tags from './tags.json'

export const BaoTangTruyenInfo: SourceInfo = {
    description: '',
    icon: 'icon.png',
    websiteBaseURL: '',
    version: getExportVersion('0.0.3'),
    name: 'BaoTangTruyen',
    language: 'vi',
    author: 'Hoang3409',
    contentRating: ContentRating.EVERYONE
}

export class BaoTangTruyen extends Main {
    Host = HOST
    Tags = tags

    UseId = true
    
    SearchWithGenres = false
    SearchWithNotGenres = false
    SearchWithTitleAndGenre = false
    HostDomain = 'https://baotangtruyen3.com/'
}