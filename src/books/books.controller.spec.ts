import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './books.controller';
import { BookService } from './books.service';

describe('BookController', () => {
  let bookController: BookController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    bookController = app.get<BookController>(BookController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bookController.findOneBook('1'));
    });
  });
});
