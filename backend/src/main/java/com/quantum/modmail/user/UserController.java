package com.quantum.modmail.user;

import com.quantum.modmail.common.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<String>> me(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(ApiResponse.ok("User info", email));
    }
}
