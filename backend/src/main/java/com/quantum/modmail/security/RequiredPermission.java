package com.quantum.modmail.security;

import com.quantum.modmail.authorization.permission.entity.PermissionCode;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RequiredPermission {
    PermissionCode[] code();

    boolean requireAll() default false;
}
