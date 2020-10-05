import { FilterState } from "../recoils/filterRecoil"

export const handleFilter = (filter: FilterState, markerType: number) => {
    if (
        !filter.constructionMarkers &&
        !filter.eventMarkers &&
        !filter.extraActivityMarkers &&
        !filter.genericMarkers &&
        !filter.scheduleMarkers &&
        !filter.studyGroupMarkers
    )
        return true
    if (markerType === 0 && filter.studyGroupMarkers)
        return true
    if (markerType === 1 && filter.extraActivityMarkers)
        return true
    if (markerType === 2 && filter.eventMarkers)
        return true
    if (markerType === 3 && filter.genericMarkers)
        return true
    if (markerType === 4 && filter.constructionMarkers)
        return true
    else return false
}