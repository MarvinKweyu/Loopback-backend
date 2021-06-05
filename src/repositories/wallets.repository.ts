import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Wallets, WalletsRelations} from '../models';

export class WalletsRepository extends DefaultCrudRepository<
  Wallets,
  typeof Wallets.prototype.id,
  WalletsRelations
> {
  constructor(
    @inject('datasources.Db') dataSource: DbDataSource,
  ) {
    super(Wallets, dataSource);
  }
}
