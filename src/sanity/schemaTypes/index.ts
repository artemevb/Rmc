import { type SchemaTypeDefinition } from 'sanity'

// import {blockContentType} from './blockContentType'
// import {categoryType} from './categoryType'
// import {postType} from './postType'
// import {authorType} from './authorType'
import { newsType } from './news';
import { residentialComplex } from './building';
import { district } from './district';
import { housingType } from './housingType';
import { rooms } from './rooms';
import { completionTime } from './completionTime';

import { floorFilter } from './floorFilter';
import { roomsFilterLayouts } from './roomsFilterLayouts';
import { layouts } from './Layouts';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [district, housingType, rooms, newsType, residentialComplex, completionTime,
    floorFilter, roomsFilterLayouts, layouts],
}
