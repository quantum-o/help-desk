package com.quantum.modmail.attachment.service.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String store(MultipartFile file);

    void delete(String storageKey);

    Resource load(String storageKey);

    String getUrl(String storageKey);
}
