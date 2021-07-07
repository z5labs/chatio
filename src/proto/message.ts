/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'chatio';

export interface Message {
  user: string;
  body: Uint8Array;
  created: number;
}

const baseMessage: object = { user: '', created: 0 };

export const Message = {
  encode(
    message: Message,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user);
    }
    if (message.body.length !== 0) {
      writer.uint32(18).bytes(message.body);
    }
    if (message.created !== 0) {
      writer.uint32(24).uint64(message.created);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessage } as Message;
    message.body = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string();
          break;
        case 2:
          message.body = reader.bytes();
          break;
        case 3:
          message.created = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Message {
    const message = { ...baseMessage } as Message;
    message.body = new Uint8Array();
    if (object.user !== undefined && object.user !== null) {
      message.user = String(object.user);
    } else {
      message.user = '';
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = bytesFromBase64(object.body);
    }
    if (object.created !== undefined && object.created !== null) {
      message.created = Number(object.created);
    } else {
      message.created = 0;
    }
    return message;
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user);
    message.body !== undefined &&
      (obj.body = base64FromBytes(
        message.body !== undefined ? message.body : new Uint8Array()
      ));
    message.created !== undefined && (obj.created = message.created);
    return obj;
  },

  fromPartial(object: DeepPartial<Message>): Message {
    const message = { ...baseMessage } as Message;
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = '';
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = new Uint8Array();
    }
    if (object.created !== undefined && object.created !== null) {
      message.created = object.created;
    } else {
      message.created = 0;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(''));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
