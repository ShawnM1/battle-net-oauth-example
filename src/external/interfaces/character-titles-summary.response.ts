export interface CharacterTitlesSummaryResponse {
    titles: Title[]
    active_title: Title
}

interface ActiveTitle extends Title {
    display_string: string
}

interface Title {
    name: string
    id: number
}
