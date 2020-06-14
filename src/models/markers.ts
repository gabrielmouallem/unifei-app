export interface MarkerProps {

    id: number;

    // GenericMarker
    latitude: string;
    longitude: string;
    type: number;
    name: string;
    description?: string;

    // EventMarker
    event_type?: number;
    event_date?: string;

    // ConstructionMarker
    construction_type?: number;

    // StudyGroupMarker
    group_size?: number;
    discipline?: string;
    class_group?: string;

    // ExtraActivityMarker
    activity_type?: number;

}