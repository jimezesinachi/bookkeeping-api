import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create.book.dto';
import { GetAllBooksQueryDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createOne(createBookDto: CreateBookDto): Promise<Book> {
    return await new this.bookModel(createBookDto).save();
  }

  async findAll(query: GetAllBooksQueryDto): Promise<Book[]> {
    return await this.bookModel.find(query).exec();
  }

  async findOne(id: string) {
    return await this.bookModel.findById(id);
  }

  async updateOne(id: string, updateBookDto: UpdateBookDto) {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      runValidators: true,
      new: true,
    });
  }

  async deleteOne(id: string) {
    return await this.bookModel.findByIdAndDelete(id, {
      runValidators: true,
      new: true,
    });
  }
}

// private books: Book[] = [];

// createBook(book: Book): Book {
//   this.books.push(book);

//   book.id;

//   return book;
// }

// getAllBooks(): Book[] {
//   return this.books;
// }

// getOneBook(id: string): Book {
//   return this.books.find((book) => book.id === id);
// }

// updateBook(id: string, book: Book): Book {
//   this.books = this.books.map((oldBook) => {
//     if (oldBook.id === id) return book;
//   });

//   return book;
// }

// deleteBook(id: string): Book {
//   const book = this.books.find((book) => book.id === id);

//   this.books = this.books.filter((book) => book.id !== id);

//   return book;
// }
