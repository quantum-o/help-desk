package com.quantum.modmail.attachment.service.storage;

import jakarta.annotation.PostConstruct;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
public class LocalFileStorage implements FileStorageService {
    private final Path root = Paths.get("uploads");

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize upload directory", e);
        }
    }

    @Override
    public String store(MultipartFile file) {
        try {
            String extension = Optional.ofNullable(file.getOriginalFilename()).filter(name -> name.contains("."))
                    .map(name -> name.substring(name.lastIndexOf("."))).orElse("");

            String filename = UUID.randomUUID() + extension;

            Path target = root.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

           return filename;
        } catch (IOException e) {
            throw new RuntimeException("Could not store file", e);
        }
    }

    @Override
    public void delete(String storagePath) {
        try {
            Files.deleteIfExists(Paths.get(storagePath));
        } catch (IOException e) {
            throw new RuntimeException("Could not delete file", e);
        }
    }

    @Override
    public Resource load(String storageKey) {
        Path path = root.resolve(storageKey).normalize();

        Resource resource = new FileSystemResource(path);

        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("Could not read file: " + storageKey);
        }

        return resource;
    }

    @Override
    public String getUrl(String storageKey) {
        Path path = root.resolve(storageKey).normalize();
        Resource resource = new FileSystemResource(path);
        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("Could not read file: " + storageKey);
        }

        return String.format("http://localhost:8080/%s/%s", root, storageKey.replace("\\", "/"));
    }
}
