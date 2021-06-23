import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InDbDataSource} from '../datasources';
import {Wallets, WalletsRelations} from '../models';

export class WalletsRepository extends DefaultCrudRepository<
  Wallets,
  typeof Wallets.prototype.id,
  WalletsRelations
> {
  constructor(
    @inject('datasources.InDb') dataSource: InDbDataSource,
  ) {
    super(Wallets, dataSource);
  }
}
