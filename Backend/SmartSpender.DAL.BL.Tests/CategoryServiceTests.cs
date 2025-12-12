using AutoFixture;
using NSubstitute;
using Shouldly;
using SmartSpender.Core.Services;
using SmartSpender.Core.Interfaces;
using SmartSpender.Core.Models.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using SmartSpender.Core.DTOs;

namespace SmartSpender.DAL.BL.Tests
{
    public class CategoryServiceTests
    {
        private readonly IFixture _fixture;
        private readonly IRepository<Category> _categoryRepository;
        private readonly CategoryService _sut;

        public CategoryServiceTests()
        {
            _fixture = new Fixture();
            _categoryRepository = Substitute.For<IRepository<Category>>();
            _sut = new CategoryService(_categoryRepository);
        }

        [Fact]
        public async Task GetAllCategoriesAsync_ShouldReturnAllCategories()
        {
            // Arrange
            var categories = _fixture.CreateMany<Category>().ToList();
            _categoryRepository.GetAllAsync().Returns(Task.FromResult<IEnumerable<Category>>(categories));

            // Act
            var result = await _sut.GetAllCategoriesAsync();

            // Assert
            result.ShouldNotBeNull();
            result.Count().ShouldBe(categories.Count);
            foreach (var category in categories)
            {
                result.ShouldContain(dto => dto.CategoryId == category.CategoryId && dto.CategoryName == category.CategoryName);
            }
        }

        [Fact]
        public async Task GetCategoryByIdAsync_ShouldReturnCategory_WhenCategoryExists()
        {
            // Arrange
            var category = _fixture.Create<Category>();
            _categoryRepository.GetByIdAsync(category.CategoryId).Returns(Task.FromResult<Category?>(category));

            // Act
            var result = await _sut.GetCategoryByIdAsync(category.CategoryId);

            // Assert
            result.ShouldNotBeNull();
            result.CategoryId.ShouldBe(category.CategoryId);
            result.CategoryName.ShouldBe(category.CategoryName);
        }

        [Fact]
        public async Task GetCategoryByIdAsync_ShouldReturnNull_WhenCategoryDoesNotExist()
        {
            // Arrange
            _categoryRepository.GetByIdAsync(Arg.Any<int>()).Returns(Task.FromResult<Category?>(null));

            // Act
            var result = await _sut.GetCategoryByIdAsync(1);

            // Assert
            result.ShouldBeNull();
        }

        [Fact]
        public async Task CreateCategoryAsync_ShouldCreateCategory()
        {
            // Arrange
            var createDto = _fixture.Create<CreateCategoryDto>();
            var category = new Category { CategoryName = createDto.CategoryName };

            _categoryRepository.AddAsync(Arg.Do<Category>(c => category = c)).Returns(Task.CompletedTask);

            // Act
            var result = await _sut.CreateCategoryAsync(createDto);

            // Assert
            await _categoryRepository.Received(1).AddAsync(Arg.Is<Category>(c => c.CategoryName == createDto.CategoryName));
            await _categoryRepository.Received(1).SaveChangesAsync();
            result.ShouldNotBeNull();
            result.CategoryName.ShouldBe(createDto.CategoryName);
        }

        [Fact]
        public async Task UpdateCategoryAsync_ShouldReturnTrue_WhenCategoryExists()
        {
            // Arrange
            var category = _fixture.Create<Category>();
            var updateDto = _fixture.Create<UpdateCategoryDto>();
            _categoryRepository.GetByIdAsync(category.CategoryId).Returns(Task.FromResult<Category?>(category));

            // Act
            var result = await _sut.UpdateCategoryAsync(category.CategoryId, updateDto);

            // Assert
            result.ShouldBeTrue();
            _categoryRepository.Received(1).Update(Arg.Is<Category>(c => c.CategoryName == updateDto.CategoryName));
            await _categoryRepository.Received(1).SaveChangesAsync();
        }

        [Fact]
        public async Task UpdateCategoryAsync_ShouldReturnFalse_WhenCategoryDoesNotExist()
        {
            // Arrange
            var updateDto = _fixture.Create<UpdateCategoryDto>();
            _categoryRepository.GetByIdAsync(Arg.Any<int>()).Returns(Task.FromResult<Category?>(null));

            // Act
            var result = await _sut.UpdateCategoryAsync(1, updateDto);

            // Assert
            result.ShouldBeFalse();
        }

        [Fact]
        public async Task DeleteCategoryAsync_ShouldReturnTrue_WhenCategoryExists()
        {
            // Arrange
            var category = _fixture.Create<Category>();
            _categoryRepository.GetByIdAsync(category.CategoryId).Returns(Task.FromResult<Category?>(category));

            // Act
            var result = await _sut.DeleteCategoryAsync(category.CategoryId);

            // Assert
            result.ShouldBeTrue();
            _categoryRepository.Received(1).Delete(category);
            await _categoryRepository.Received(1).SaveChangesAsync();
        }

        [Fact]
        public async Task DeleteCategoryAsync_ShouldReturnFalse_WhenCategoryDoesNotExist()
        {
            // Arrange
            _categoryRepository.GetByIdAsync(Arg.Any<int>()).Returns(Task.FromResult<Category?>(null));

            // Act
            var result = await _sut.DeleteCategoryAsync(1);

            // Assert
            result.ShouldBeFalse();
        }
    }
}
