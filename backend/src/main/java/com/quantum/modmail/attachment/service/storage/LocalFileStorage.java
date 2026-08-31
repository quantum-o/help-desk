package com.quantum.modmail.attachment.service.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class LocalFileStorage implements FileStorageService {
    @Override
    public String store(MultipartFile file) {
        return "";
    }

    @Override
    public String store(List<MultipartFile> file) {
        return "";
    }

    @Override
    public void delete(String storagePath) {

    }
}
