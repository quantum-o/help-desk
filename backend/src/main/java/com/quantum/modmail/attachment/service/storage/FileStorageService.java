package com.quantum.modmail.attachment.service.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileStorageService {

    String store(MultipartFile file, String parent);

    void delete(String storageKey);

    Resource load(String storageKey);
}
