import PeerId from 'peer-id';
import { SignJWT } from 'jose/jwt/sign';
import { CompactEncrypt } from 'jose/jwe/compact/encrypt';
import { KeyLike, JWTPayload } from 'jose/types';

// Config used for a call.
export interface Config {
  // Unique identifier for each call.
  callId: string;

  // Shared secret for signing messages between "good" peers.
  signingKey: string;
}

// Invite is an encrypted JSON Web Token.
export type Invite = SignJWT;

export type Option = (invite: Invite) => Invite;

export const intendedFor = (aud: string) => (invite: Invite) => invite.setAudience(aud);

export const expiresIn = (exp: number) => (invite: Invite) => invite.setExpirationTime(exp);

export const validAfter = (time: number) => (invite: Invite) => invite.setNotBefore(time);

// Generate a new Invite token with an optional expiration time.
export const generateInvite = (config: Config, host: PeerId, ...options: Option[]): Invite => {
  const tok = new SignJWT((config as unknown) as JWTPayload)
    .setIssuedAt()
    .setIssuer(host.toB58String());

  if (!options) return tok;

  return options.reduce((invite, opt) => opt(invite), tok);
}

// Encode and sign Invite token.
export const encodeInviteToken = async (host: PeerId, invite: Invite, key: KeyLike) => {
  const signingKey = await crypto.subtle.importKey(
    'jwk',
    host.privKey._key,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    true,
    ['sign']
  );
  const tok = await invite
                    .setProtectedHeader({ alg: 'RS256' })
                    .sign(signingKey);

  const enc = new TextEncoder();
  return await new CompactEncrypt(enc.encode(tok))
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .encrypt(key);
};
