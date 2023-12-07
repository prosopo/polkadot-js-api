// Copyright 2017-2023 @polkadot/types-known authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideVersionedType } from '@polkadot/types/types';

import { versioned as node } from './node.js';
import { versioned as rococo } from './rococo.js';

// Type overrides for specific spec types & versions as given in runtimeVersion
export const typesSpec: Record<string, OverrideVersionedType[]> = {
  node,
  rococo,
};
