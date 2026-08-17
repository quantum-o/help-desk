package com.quantum.modmail.security.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import com.quantum.modmail.security.RequiredPermission;

import java.util.Arrays;

@Aspect
@Component
public class RequiredPermissionAspect {
    @Around("@annotation(requiredPermission)")
    public Object around(ProceedingJoinPoint joinPoint, RequiredPermission requiredPermission) throws Throwable {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null) {
            throw new AccessDeniedException("Unauthorized");
        }

        boolean isAdministrator = auth.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ADMINISTRATOR"));

        if (isAdministrator) {
            return joinPoint.proceed();
        }

        boolean hasPermission = Arrays.stream(requiredPermission.code())
                .map(Enum::name)
                .anyMatch(permission ->
                        auth.getAuthorities()
                                .stream()
                                .anyMatch(a -> a.getAuthority().equals(permission))
                );

        if (!hasPermission) {
            throw new AccessDeniedException("Insufficient permission");
        }

        return joinPoint.proceed();
    }
}
