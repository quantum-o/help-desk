package com.quantum.modmail.user;

import com.quantum.modmail.authorization.role.entity.Role;
import com.quantum.modmail.authorization.role.repository.RoleRepository;
import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.common.specs.BaseEntitySpecifications;
import com.quantum.modmail.user.dto.*;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.mapper.UserMapper;
import com.quantum.modmail.user.repository.UserRepository;
import com.quantum.modmail.user.repository.UserSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.PredicateSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public MeResponse getMe(String email) {
        if (email.isEmpty()) {
            throw new BusinessException(HttpStatus.UNAUTHORIZED, "USER_NOT_AUTHENTICATED", "User not authenticated");
        }

        User user = userRepository.findWithRolesAndPermissionsByEmail(email)
                .orElseThrow(this::userNotFoundException);

        return UserMapper.toMeResponse(user);
    }

    public Page<UserResponse> getUsers(Pageable pageable, UserFilter filter) {
        Specification<User> specification = Specification
                .where(UserSpecifications.query(filter.q()))
                .and(UserSpecifications.hasActive(filter.active()))
                .and(UserSpecifications.isNotDeleted())
                .and(BaseEntitySpecifications.createdBetween(
                        filter.createdFrom(),
                        filter.createdTo()
                ));

        Pageable defaultedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.ASC, "createdAt"));

        return userRepository.findAll(specification, defaultedPageable).map(UserMapper::toResponse);
    }

    public UserResponse getUser(UUID id) {
        User user = findById(id);
        return UserMapper.toResponse(user);
    }

    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "USER_ALREADY_EXISTS", "User with this email already exists.");
        }

        String hashedPassword = passwordEncoder.encode(request.password());

        User user = User.builder()
                .email(request.email())
                .username(request.username())
                .passwordHash(hashedPassword)
                .roles(new HashSet<>(roleRepository.findAllById(request.roles())))
                .active(request.active())
                .build();
        return UserMapper.toResponse(user);
    }

    public UserResponse updateUser(UUID id, UpdateUserRequest request) {
        User user = findById(id);

        if (request.username() != null)
            user.setUsername(request.username());
        if (request.roles() != null) {
            Set<Role> roles = new HashSet<>(
                    roleRepository.findAllById(request.roles())
            );
            user.setRoles(roles);
        }
        if (request.password() != null)
            user.setPasswordHash(passwordEncoder.encode(request.password()));
        if (request.active() != null)
            user.setActive(request.active());

        User savedUser = userRepository.save(user);
        return UserMapper.toResponse(savedUser);
    }

    public void deleteUser(UUID id) {
        User user = findById(id);

        user.setDeleted(true);

        userRepository.save(user);
    }

    private User findById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(this::userNotFoundException);

        if (user.isDeleted())
            throw userNotFoundException();

        return user;
    }

    private User findById(UUID id, boolean showOnlyActive) {
        User user = userRepository.findById(id)
                .orElseThrow(this::userNotFoundException);

        if (user.isDeleted())
            throw userNotFoundException();

        if (showOnlyActive && !user.isActive())
            throw userNotFoundException();

        return user;
    }

    private BusinessException userNotFoundException() {
        return new BusinessException(
                HttpStatus.NOT_FOUND,
                "USER_NOT_FOUND",
                "User not found."
        );
    }
}
