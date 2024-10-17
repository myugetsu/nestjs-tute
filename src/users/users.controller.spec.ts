import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ id: 1, name: 'Test User' }];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toBe(result);
    });

    it('should return filtered users when role is provided', async () => {
      const result = [{ id: 1, name: 'Test User', role: 'INTERN' }];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll('INTERN')).toBe(result);
      expect(service.findAll).toHaveBeenCalledWith('INTERN');
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = { id: 1, name: 'Test User' };
      jest.spyOn(service, 'findOne').mockImplementation(() => result);

      expect(await controller.findOne(1)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'New User',
        email: 'new@example.com',
        role: 'INTERN',
      };
      const result = { id: 1, ...createUserDto };
      jest.spyOn(service, 'create').mockImplementation(() => result);

      expect(await controller.create(createUserDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };
      const result = { id: 1, name: 'Updated User', email: 'test@example.com', role: 'INTERN' };
      jest.spyOn(service, 'update').mockImplementation(() => result);

      expect(await controller.update(1, updateUserDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = { id: 1, name: 'Deleted User' };
      jest.spyOn(service, 'delete').mockImplementation(() => result);

      expect(await controller.delete(1)).toBe(result);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
