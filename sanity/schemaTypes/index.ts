import type { SchemaTypeDefinition } from 'sanity';
import { episodeType } from './episode';
import { guestType } from './guest';
import { topicType } from './topic';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [episodeType, guestType, topicType],
};
