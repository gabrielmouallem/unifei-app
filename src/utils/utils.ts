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

export function uuidv4() {
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    console.log(uuid);
    return uuid;
}