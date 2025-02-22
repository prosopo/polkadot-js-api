// Copyright 2017-2023 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId, AccountIndex } from '@polkadot/types/interfaces';

export type AccountIdAndIndex = [AccountId | undefined, AccountIndex | undefined];

export type AccountIndexes = Record<string, AccountIndex>;

export interface DeriveAccountRegistration {
  display?: string | undefined;
  displayParent?: string | undefined;
  email?: string | undefined;
  image?: string | undefined;
  legal?: string | undefined;
  other?: Record<string, string> | undefined;
  parent?: AccountId | undefined;
  pgp?: string | undefined;
  riot?: string | undefined;
  twitter?: string | undefined;
  web?: string | undefined;
}

export interface DeriveAccountInfo {
  accountId?: AccountId | undefined;
  accountIndex?: AccountIndex | undefined;
}
