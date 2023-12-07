// Copyright 2017-2023 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Observable } from 'rxjs';
import type { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';
import type { DeriveAccountInfo, DeriveAccountRegistration, DeriveApi } from '../types.js';

import { map, of, switchMap } from 'rxjs';

import { memo } from '../util/index.js';

/**
 * @name info
 * @description Returns aux. info in regard to an account, current that includes the accountId, accountIndex
 */
export function info (instanceId: string, api: DeriveApi): (address?: AccountIndex | AccountId | Address | Uint8Array | string | null) => Observable<DeriveAccountInfo> {
  return memo(instanceId, (address?: AccountIndex | AccountId | Address | Uint8Array | string | null): Observable<DeriveAccountInfo> =>
    api.derive.accounts.idAndIndex(address).pipe(
      switchMap(([accountId, accountIndex]): Observable<[Partial<DeriveAccountInfo>, DeriveAccountRegistration, string | undefined]> =>
        accountId
          ? api.derive.accounts.info(accountId).pipe(
            map((info): [Partial<DeriveAccountInfo>, DeriveAccountRegistration, string | undefined] => [info, {}, undefined])
          )
          : accountIndex
            ? api.derive.accounts.indexToId(accountIndex).pipe(
              switchMap((accountId): Observable<[Partial<DeriveAccountInfo>, DeriveAccountRegistration, string | undefined]> =>
                api.derive.accounts.info(accountId).pipe(
                  map((info): [Partial<DeriveAccountInfo>, DeriveAccountRegistration, string | undefined] => [info, {}, undefined])
                )
              )
            )
            : of([{ accountId, accountIndex }, {}, undefined])

      ),
      map(([{ accountId, accountIndex }]): DeriveAccountInfo => ({
        accountId, accountIndex
      }))
    ));
}
