package com.example.social.dto;
import java.time.LocalDateTime;
public record PostResponse(Long id, String username, String imageUrl, String description, long likeCount, LocalDateTime createdAt) {}
