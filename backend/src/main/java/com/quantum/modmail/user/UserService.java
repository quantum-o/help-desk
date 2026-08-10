package com.quantum.modmail.user;

import com.quantum.modmail.common.exception.BusinessException;
import com.quantum.modmail.user.dto.MeResponse;
import com.quantum.modmail.user.entity.User;
import com.quantum.modmail.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public MeResponse getMe(String email) {
        if (email.isEmpty()) {
            throw new BusinessException(HttpStatus.UNAUTHORIZED, "USER_NOT_AUTHENTICATED", "User not authenticated");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "User not found"));

        return new MeResponse(user.getId(), user.getEmail(), user.getRole(), user.getCreatedAt(), user.getUpdatedAt());
    }
}
