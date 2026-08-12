package com.quantum.modmail.user;

import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.user.dto.CreateUserRequest;
import com.quantum.modmail.user.dto.UpdateUserRequest;
import com.quantum.modmail.user.dto.UserResponse;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.entity.UserRole;
import com.quantum.modmail.user.mapper.UserMapper;
import com.quantum.modmail.user.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse getMe(String email) {
        if (email.isEmpty()) {
            throw new BusinessException(HttpStatus.UNAUTHORIZED, "USER_NOT_AUTHENTICATED", "User not authenticated");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(this::userNotFoundException);

        return UserMapper.toResponse(user);
    }

    public Page<UserResponse> getUsers(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").ascending());

        if(search.isBlank())
            return userRepository.findByDeletedFalse(pageable).map(UserMapper::toResponse);

        return userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search, pageable).map(UserMapper::toResponse);
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
                .role(UserRole.valueOf(request.role()))
                .active(request.active())
                .build();
        return UserMapper.toResponse(user);
    }

    public UserResponse updateUser(UUID id, UpdateUserRequest request) {
        User user = findById(id);

        if (request.username() != null)
            user.setUsername(request.username());
        if (request.role() != null)
            user.setRole(UserRole.valueOf(request.role()));
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
