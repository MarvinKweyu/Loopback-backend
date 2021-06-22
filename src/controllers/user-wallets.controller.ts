import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Wallets,
} from '../models';
import {UserRepository} from '../repositories';

export class UserWalletsController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/wallets', {
    responses: {
      '200': {
        description: 'Array of User has many Wallets',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Wallets)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Wallets>,
  ): Promise<Wallets[]> {
    return this.userRepository.wallets(id).find(filter);
  }

  @post('/users/{id}/wallets', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Wallets)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wallets, {
            title: 'NewWalletsInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) wallets: Omit<Wallets, 'id'>,
  ): Promise<Wallets> {
    return this.userRepository.wallets(id).create(wallets);
  }

  @patch('/users/{id}/wallets', {
    responses: {
      '200': {
        description: 'User.Wallets PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wallets, {partial: true}),
        },
      },
    })
    wallets: Partial<Wallets>,
    @param.query.object('where', getWhereSchemaFor(Wallets)) where?: Where<Wallets>,
  ): Promise<Count> {
    return this.userRepository.wallets(id).patch(wallets, where);
  }

  @del('/users/{id}/wallets', {
    responses: {
      '200': {
        description: 'User.Wallets DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Wallets)) where?: Where<Wallets>,
  ): Promise<Count> {
    return this.userRepository.wallets(id).delete(where);
  }
}
