import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CeateCategoryDTO } from './dto/createCategory.dto';
import { CategoryNotFoundException } from './exception/categoryNotFound.exception';
import { UpdateCategoryDto } from './dto/updateCategoy.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(category: CeateCategoryDTO) {
    const newCategory = await this.categoriesRepository.create(category);
    return newCategory;
  }

  getAllCategories() {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, category);
    const updateCategory = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (updateCategory) {
      return updateCategory;
    }
    throw new CategoryNotFoundException(id);
  }
}
