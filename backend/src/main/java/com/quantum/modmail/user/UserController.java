package com.quantum.modmail.user;

import com.quantum.modmail.common.response.ApiResponse;

import com.quantum.modmail.user.dto.CreateUserRequest;
import com.quantum.modmail.user.dto.UpdateUserRequest;
import com.quantum.modmail.user.dto.UserResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> me(Authentication authentication) {
        String email = authentication.getName();
        UserResponse meResponse = userService.getMe(email);

        return ResponseEntity.ok(ApiResponse.ok("User info", meResponse));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getUsers(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "20") int size,
            @RequestParam(required = false, defaultValue = "") String search,
            Authentication authentication
    ) {
        Page<UserResponse> users = userService.getUsers(page, size, search);

        return ResponseEntity.ok(ApiResponse.ok("Success", users));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUser(
            Authentication authentication,
            @PathVariable UUID id
    ) {
        UserResponse user = userService.getUser(id);

        return ResponseEntity.ok(ApiResponse.ok("Success", user));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody CreateUserRequest request) {
        UserResponse userResponse = userService.createUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Success", userResponse));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateUserRequest request,
            Authentication authentication
    ) {
        UserResponse userResponse = userService.updateUser(id, request);

        return ResponseEntity.ok(ApiResponse.ok("Success", userResponse));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Null> updateUser(
            @PathVariable UUID id,
            Authentication authentication
    ) {
        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }
}
