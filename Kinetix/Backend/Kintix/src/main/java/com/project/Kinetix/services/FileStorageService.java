package com.project.Kinetix.services;

import com.project.Kinetix.model.FileEntity;
import com.project.Kinetix.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final FileRepository fileRepository;

    public FileStorageService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public String saveFile(MultipartFile file, Long parentFolderId) {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String contentType = file.getContentType();
            boolean isImage = contentType != null && contentType.startsWith("image/");

            Path targetDir = isImage ? uploadPath.resolve("images") : uploadPath;
            if (!Files.exists(targetDir)) {
                Files.createDirectories(targetDir);
            }

            String fileName = file.getOriginalFilename();
            Path filePath = targetDir.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Save metadata to database
            FileEntity fileEntity = new FileEntity();
            fileEntity.setName(fileName);
            fileEntity.setPath(filePath.toString());
            fileEntity.setSize(file.getSize());
            fileEntity.setType(isImage ? "image" : "file");
            fileEntity.setParentFolderId(parentFolderId);
            fileEntity.setCreatedAt(LocalDateTime.now());

            fileRepository.save(fileEntity);

            return isImage ? "Image uploaded successfully!" : "File uploaded successfully!";

        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file: " + e.getMessage();
        }
    }

    public List<FileEntity> getFilesInFolder(Long parentFolderId) {
        if (parentFolderId == null) {
            return fileRepository.findAll()
                    .stream()
                    .filter(f -> f.getParentFolderId() == null)
                    .collect(Collectors.toList());
        } else {
            return fileRepository.findAll()
                    .stream()
                    .filter(f -> parentFolderId.equals(f.getParentFolderId()))
                    .collect(Collectors.toList());
        }
    }

    public FileEntity getFileById(Long id) {
        return fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id: " + id));
    }

    public void deleteById(Long id) {
        fileRepository.deleteById(id);
    }
}
