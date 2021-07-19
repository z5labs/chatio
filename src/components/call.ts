import PeerId from 'peer-id';
import { EncryptJWT } from 'jose/jwt/encrypt';
import { KeyLike, JWTPayload } from 'jose/types';
import { fromKeyLike } from 'jose/jwk/from_key_like';

// Config used for a call.
export interface Config {
  // Unique identifier for each call.
  callId: string;

  // Shared secret for signing messages between "good" peers.
  signingKey: string;
}

// Invite is an encrypted JSON Web Token.
export type Invite = EncryptJWT;

// Generate a new Invite token with an optional expiration time.
export const generateInvite = (config: Config, hostId: PeerId, expiresIn?: number): Invite => {
  const tok = new EncryptJWT((config as unknown) as JWTPayload).setIssuer(hostId.toB58String());

  return !expiresIn ? tok : tok.setExpirationTime(Date.now() + expiresIn);
}

// Base64 encode the invite token so it can be used in URLs.
export const encodeInviteToken = async (invite: Invite, key: KeyLike) => {
  const secret = await fromKeyLike(key);

  // TODO: extract header params from secret key
  return await invite
    .setProtectedHeader({ alg: secret.alg })
    .setIssuedAt()
    .encrypt(secret);
};
