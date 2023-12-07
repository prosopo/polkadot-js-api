// Copyright 2017-2023 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@polkadot/types-augment';

import { assert } from '@polkadot/util';

import { TypeRegistry } from './create/index.js';

const registry = new TypeRegistry();

// Should be Codec, we don't know this one
const bb = registry.createType('Something');

assert(bb.toHuman(), 'All ok');

// tuple & struct
const vs = registry.createType('(u8, {"a":"u32","b":"(u32,u64)"},(u8,u16),{"foo":"Bar"},u16)');
// set
const st = registry.createType('{"_set": { "A": 1, "B": 2, "C": 4 } }');
// enum
const en = registry.createType('{"_enum": { "A": 1, "B": 2, "C": 4 } }');

assert(vs.toHuman() && st.strings && en.index, 'All ok');

// Should end up as Raw
const gg = registry.createType('[ u8   ;678]');

assert(gg.subarray(1), 'All ok');

// Should end up as VecFixed<u128>
const hh = registry.createType('[u128; 32]');
// maps and sets
const ms = registry.createType('(BTreeSet<u8>, BTreeMap<u16, u32>, HashMap<u64, u128>)');

assert(hh[0].bitLength() && ms[0].strings && ms[1].values() && ms[2].keys, 'All ok');

// tuple! ITuple<[u32, Compact<u64>, u128, Codec]>
const tt1 = registry.createType('(u32, Compact<u64>,    u128  , Something)');
// unwraps into a u32
const tt2 = registry.createType('(((u32)))');
// TEST: Adding a single param makes this go over the recursion limit in 4.4.4
// lots and lots of params (indicates recursion limit)
const tt4 = registry.createType('(u8,u16,u32,u64,u128,u256,u8,u16,u32,u64,u128,u256,u8,u16,u32,u64,u128,u256,u8)');
// empty
const tt5 = registry.createType('()');
// nested tuples
const tt6 = registry.createType('(u8, (u16, (u32, u64, u128)), (u64, u128))');
// more nested tuples
const tt7 = registry.createType('(((u8, u16, u32), (u32, u16, u8)), u128, u256)');
// nested tuples with a wrapper
const tt8 = registry.createType('(u8, Vec<(u16, u32)>, Option<(u128, u128)>)');
// same example as above
const tt9 = registry.createType('(u32, (u32, u64), Vec<u8>, Vec<(u32, u64)>, [u8;32], [u128;32])');
// tuple with nested fixed
const tta = registry.createType('([u8;32], [u16;5])');

assert(tt1[2].bitLength() && tt2.bitLength() && tt4[3].bitLength() && tt5.isEmpty && tt6[1].toHuman() && tt7.toHuman() && tt8.toHuman() && tt9.toHuman() && tta[1][1].bitLength(), 'All ok');
