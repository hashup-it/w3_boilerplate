export const trimAddress = (address: string, to = 6, from = 38) => `${address.toString().slice(0, to)} … ${address.toString().slice(from)}`;
