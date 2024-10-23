import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { newsType } from './news';
import { residentialComplex } from './building';
import { district } from './district';
import { housingType } from './housingType';
import { rooms } from './rooms';
import { completionTime } from './completionTime';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [district, housingType, rooms,blockContentType, categoryType, postType, authorType, newsType, residentialComplex, completionTime],
}
