// Copyright 2017-2023 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyFunction } from '@polkadot/types/types';

import * as accounts from './accounts/index.js';
import * as balances from './balances/index.js';
import * as chain from './chain/index.js';
import * as contracts from './contracts/index.js';
import * as tx from './tx/index.js';

export const derive = { accounts, balances, chain, contracts, tx };

type DeriveSection<Section> = {
  [M in keyof Section]: Section[M] extends AnyFunction
    ? ReturnType<Section[M]> // ReturnType<Section[Method]> will be the inner function, i.e. without (api) argument
    : never;
};
type DeriveAllSections<AllSections> = {
  [S in keyof AllSections]: DeriveSection<AllSections[S]>
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExactDerive extends DeriveAllSections<typeof derive> {
  // keep empty, allows for augmentation
}
