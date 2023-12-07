// Copyright 2017-2023 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiInterfaceRx } from '@polkadot/api-base/types';
import type { u32 } from '@polkadot/types';
import type { Balance, BlockNumber } from '@polkadot/types/interfaces';
import type { BN } from '@polkadot/util';
import type { ExactDerive } from './derive.js';

export * from './accounts/types.js';
export * from './balances/types.js';
export * from './type/types.js';

export interface DeriveApi extends ApiInterfaceRx {
  derive: ExactDerive;
}

export interface DeriveContractFees {
  callBaseFee: BN;
  contractFee: BN;
  creationFee: BN;
  rentByteFee: BN;
  rentDepositOffset: BN;
  surchargeReward: BN;
  tombstoneDeposit: BN;
  transactionBaseFee: BN;
  transactionByteFee: BN;
  transferFee: BN;
}

export interface DeriveFees {
  creationFee: Balance;
  existentialDeposit: Balance;
  transactionBaseFee: Balance;
  transactionByteFee: Balance;
  transferFee: Balance;
}

export interface DeriveHeartbeatAuthor {
  blockCount: u32;
  hasMessage: boolean;
  isOnline: boolean;
}

export interface RecentlyOffline {
  blockNumber: BlockNumber;
  count: BN;
}
