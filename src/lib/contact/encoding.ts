// Codificacions amb APIs web (Web Crypto, btoa), disponibles a Node i a les funcions de Netlify.

export function base64(bytes: Uint8Array) {
  let binary = '';
  for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  return btoa(binary);
}

export const base64url = (bytes: Uint8Array) => base64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
export const utf8 = (text: string) => new TextEncoder().encode(text);
export const hex = (buffer: ArrayBuffer) => [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
export const fromHex = (value: string) => new Uint8Array((value.match(/[0-9a-f]{2}/gi) ?? []).map((pair) => Number.parseInt(pair, 16)));
export const fromBase64 = (value: string) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
