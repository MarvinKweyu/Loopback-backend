import { Entity, model, property } from '@loopback/repository';

@model()
export class Wallets extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  walletName: string;

  @property({
    type: 'object',
  })
  expenses?: object;

  @property({
    type: 'number',
    default: 0,
  })
  total?: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'number',
  })
  userId?: number;

  constructor(data?: Partial<Wallets>) {
    super(data);
  }
}

export interface WalletsRelations {
  // describe navigational properties here
}

export type WalletsWithRelations = Wallets & WalletsRelations;
