import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of all users when no role is specified', () => {
      const result = service.findAll();
      expect(result).toHaveLength(5);
      expect(result[0].name).toBe('Leanne Graham');
    });

    it('should return an array of users filtered by role', () => {
      const result = service.findAll('INTERN');
      expect(result).toHaveLength(2);
      expect(result[0].role).toBe('INTERN');
    });

    it('should throw NotFoundException when no users found for a role', () => {
      expect(() => service.findAll('CEO' as any)).toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a single user', () => {
      const result = service.findOne(1);
      expect(result.name).toBe('Leanne Graham');
    });

    it('should throw NotFoundException when user not found', () => {
      expect(() => service.findOne(99)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'INTERN',
      };
      const result = service.create(createUserDto);
      expect(result.id).toBe(6);
      expect(result.name).toBe('Test User');
    });
  });

  describe('update', () => {
    it('should update an existing user', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };
      const result = service.update(1, updateUserDto);
      expect(result.name).toBe('Updated Name');
    });

    it('should throw NotFoundException when updating non-existent user', () => {
      expect(() => service.update(99, { name: 'Test' })).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should remove a user', () => {
      const result = service.delete(1);
      expect(result.id).toBe(1);
      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException when deleting non-existent user', () => {
      expect(() => service.delete(99)).toThrow(NotFoundException);
    });
  });
});
