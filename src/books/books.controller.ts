import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateBookDto, GetAllBooksQueryDto, UpdateBookDto } from './dto';
import { BookService } from './books.service';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('books')
  async createBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.createOne(createBookDto);

    return `This action adds a new book, ${JSON.stringify(book)}`;
  }

  @Get('books')
  async findAllBooks(@Query() query: GetAllBooksQueryDto) {
    const books = await this.bookService.findAll(query);

    return `This action returns all books matching the query, ${JSON.stringify(
      query,
    )}: ${JSON.stringify(books)}`;
  }

  @Get('books/:id')
  async findOneBook(@Param('id') id: string) {
    const book = await this.bookService.findOne(id);

    return `This action returns a #${id} book: ${JSON.stringify(book)}`;
  }

  @Put('books/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const book = await this.bookService.updateOne(id, updateBookDto);

    return `This action updates a #${id} book with the following data, ${JSON.stringify(
      updateBookDto,
    )}: ${JSON.stringify(book)}`;
  }

  @Delete('books/:id')
  async deleteBook(@Param('id') id: string) {
    const book = await this.bookService.deleteOne(id);

    return `This action deletes a #${id} book: ${JSON.stringify(book)}`;
  }
}
