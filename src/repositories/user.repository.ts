import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDbDataSource} from '../datasources';
import {User, UserRelations, Wallets} from '../models';
import {WalletsRepository} from './wallets.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly wallets: HasManyRepositoryFactory<Wallets, typeof User.prototype.id>;

  constructor(
    @inject('datasources.MysqlDb') dataSource: MysqlDbDataSource, @repository.getter('WalletsRepository') protected walletsRepositoryGetter: Getter<WalletsRepository>,
  ) {
    super(User, dataSource);
    this.wallets = this.createHasManyRepositoryFactoryFor('wallets', walletsRepositoryGetter,);
    this.registerInclusionResolver('wallets', this.wallets.inclusionResolver);
  }
}
