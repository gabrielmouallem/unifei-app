

import BlueDot from '../assets/images/blue-dot-old.png';
import EventIcon from '../assets/images/event-icon.png';
import StudyGroupIcon from '../assets/images/study-group-icon.png';
import ConstructionIcon from '../assets/images/construction-icon.png';
import ExtraActivityIcon from '../assets/images/extra-activity-icon.png';

export const MARKER_TYPES = [
    'Grupo de Estudos',     // [0]
    'Atividade Extra',      // [1]
    'Eventos',              // [2]
    'Sala ou Local',        // [3]
    'Obra',                 // [4]
]

export const EVENT_TYPES = [
    'Workshop',             // [0]
    'Cursos',               // [1]
    'Seminário',            // [2]
    'Encontro',             // [3]
    'Semana',               // [4]
    'Simpósio',             // [5]
    'Jornada',              // [6]
    'Mesa-redonda',         // [7]
    'Conferência',          // [8]
    'Congresso',            // [9]
    'Painel',               // [10]
    'Fórum',                // [11]
    'Colóquio',             // [12]
]

export const CONSTRUCTION_TYPES = [
    'Em uma Sala',          // [0]
    'Em um Corredor',       // [1]
    'Em um Bloco',          // [2]
    'Em uma Rua',           // [3]
    'Em um Predio',         // [4]
    'Em um Banheiro'        // [5]
]

export const MARKER_ICON_TYPES = [
    StudyGroupIcon,
    ExtraActivityIcon,
    EventIcon,
    BlueDot,
    ConstructionIcon
]