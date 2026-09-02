package com.quantum.modmail.category;

import com.quantum.modmail.category.dto.CategoryCreateRequest;
import com.quantum.modmail.category.dto.CategoryPatchRequest;
import com.quantum.modmail.category.dto.CategoryResponse;
import com.quantum.modmail.category.entity.Category;
import com.quantum.modmail.category.mapper.CategoryMapper;
import com.quantum.modmail.category.repository.CategoryRepository;
import com.quantum.modmail.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findByDeletedFalse(Sort.by("createdAt").ascending());

        Map<Long, List<Category>> childrenMap = categories.stream()
                .filter(category -> category.getParent() != null)
                .collect(Collectors.groupingBy(
                        category -> category.getParent().getId()
                ));

        return categories.stream()
                .filter(category -> category.getParent() == null)
                .map(category -> buildTree(category, childrenMap))
                .toList();
    }

    public CategoryResponse addNewCategory(CategoryCreateRequest request) {
        if (request.parent() == null) {
            Category category = Category.builder()
                    .name(request.name())
                    .build();

            Category savedCategory = categoryRepository.save(category);

            return CategoryResponse.builder()
                    .id(savedCategory.getId())
                    .name(savedCategory.getName())
                    .build();
        }

        Category parent = categoryRepository.findById(request.parent())
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "NOT_FOUND", "The parent category not found"));

        Category category = Category.builder().name(request.name()).parent(parent).build();

        Category savedCategory = categoryRepository.save(category);

        return CategoryMapper.toResponse(savedCategory);

    }

    public CategoryResponse updateCategory(Long id, CategoryPatchRequest request) {
        Category currentCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "NOT_FOUND", "Category not found by id"));

        if (request.parent() == null || currentCategory.getId().equals(request.parent())) {
            if (request.name() != null)
                currentCategory.setName(request.name());

            if (request.passive() != null)
                currentCategory.setPassive(request.passive());

            Category newCategory = categoryRepository.save(currentCategory);

            return CategoryMapper.toResponse(newCategory);
        }

        if (request.name() != null)
            currentCategory.setName(request.name());

        if (request.passive() != null)
            currentCategory.setPassive(request.passive());

        Category newParent = categoryRepository.findById(request.parent())
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "PARENT_NOT_FOUND", "Parent not found"));

        if (isDescendant(newParent, id)) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "PARENT_CANT_BE_CHILD", "Parent id cant be child of itself");
        }

        Category parent = categoryRepository.findById(request.parent())
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "NOT_FOUND", "Parent not found by given id"));

        currentCategory.setParent(parent);

        return CategoryMapper.toResponse(categoryRepository.save(currentCategory));
    }

    private CategoryResponse buildTree(Category category, Map<Long, List<Category>> childrenMap) {
        List<CategoryResponse> children = childrenMap
                .getOrDefault(category.getId(), List.of())
                .stream()
                .map(child -> {
                    if (category.isPassive())
                        child.setPassive(true);
                    return buildTree(child, childrenMap);
                })
                .toList();

        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.isPassive(),
                children
        );
    }

    private boolean isDescendant(Category category, Long targetId) {
        Category current = category;

        while (current.getParent() != null) {
            if (current.getId().equals(targetId))
                return true;

            current = current.getParent();
        }

        return false;
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "CATEGORY_NOT_FOUND", "Category not found by id"));

        if (category.getChildren().isEmpty())
            category.setDeleted(true);
        else
            category.setPassive(true);

        categoryRepository.save(category);
    }

    public static String buildCategoryBreadcrumbs(Category category) {
        List<String> breadcrumbs = new ArrayList<>(List.of(category.getName()));
        Category current = category;
        while (category.getParent() != null) {
            category = category.getParent();
            breadcrumbs.add(current.getName());
        }

        return String.join("/", breadcrumbs.reversed());
    }
}
