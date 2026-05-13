import { createHmac, randomBytes, timingSafeEqual, pbkdf2Sync } from "node:crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const TOKEN_SECRET = process.env.LIFTLAB_TOKEN_SECRET || "liftlab-local-development-secret-change-me";

export function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = pbkdf2Sync(String(password), salt, 210000, 32, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const candidate = hashPassword(password, salt).split(":")[1];
  const left = Buffer.from(candidate, "hex");
  const right = Buffer.from(hash, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createToken(userId) {
  const payload = {
    sub: String(userId),
    exp: Date.now() + TOKEN_TTL_MS,
    nonce: randomBytes(8).toString("hex"),
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(body);
  return `${body}.${signature}`;
}

export function verifyToken(token) {
  const [body, signature] = String(token || "").split(".");
  if (!body || !signature || sign(body) !== signature) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.sub || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function sign(body) {
  return createHmac("sha256", TOKEN_SECRET).update(body).digest("base64url");
}
