package com.quantum.modmail.category.repository;

import com.quantum.modmail.category.entity.Category;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByParentIsNull();

    List<Category> findByDeletedFalse();

    List<Category> findByDeletedFalse(Sort sort);
}
