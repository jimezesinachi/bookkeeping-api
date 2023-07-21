import { Model, QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create.book.dto';
import { GetAllBooksQueryDto, UpdateBookDto } from './dto';

interface GetAllBooks {
  books: Book[];
  totalBooks: number;
  totalPages: number;
  currentPage: number;
  itemsReturnedPerPage: number;
  title: string;
  author: string;
  availability: boolean;
}

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createOne(createBookDto: CreateBookDto): Promise<Book> {
    return await new this.bookModel(createBookDto).save();
  }

  async findAll(query: GetAllBooksQueryDto): Promise<GetAllBooks> {
    const { page = 1, perPage = 10, title, author, availability } = query;

    const findOptions: QueryOptions = {};

    if (title) {
      findOptions['title'] = { $regex: new RegExp(title, 'i') };
    }

    if (author) {
      findOptions['author'] = { $regex: new RegExp(author, 'i') };
    }

    if (availability) {
      findOptions['availability'] = availability;
    }

    const totalBooks = await this.bookModel.countDocuments(findOptions);
    const totalPages = Math.ceil(totalBooks / perPage);

    const books = await this.bookModel
      .find(findOptions)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return {
      books,
      totalBooks,
      totalPages,
      currentPage: page,
      itemsReturnedPerPage: perPage,
      title,
      author,
      availability,
    };
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
