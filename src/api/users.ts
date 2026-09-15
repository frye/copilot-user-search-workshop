export interface User {
  readonly id: string;
  readonly fullName: string;
  readonly team: string;
}

export const users: readonly User[] = Object.freeze([
  Object.freeze({ id: 'u-003', fullName: 'Casey Lee', team: 'research' }),
  Object.freeze({ id: 'u-001', fullName: 'Avery Lee', team: 'platform' }),
  Object.freeze({ id: 'u-004', fullName: 'Riley Chen', team: 'platform' }),
  Object.freeze({ id: 'u-002', fullName: 'Morgan Lee', team: 'data' }),
]);
