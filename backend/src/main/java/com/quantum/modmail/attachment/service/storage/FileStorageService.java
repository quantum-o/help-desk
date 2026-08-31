package com.quantum.modmail.attachment.service.storage;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileStorageService {

    String store(MultipartFile file);

    String store(List<MultipartFile> file);

    void delete(String storagePath);
}
