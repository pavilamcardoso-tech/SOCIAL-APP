package com.example.social.controller;

import com.example.social.service.LikeService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class LikeController {
    private final LikeService likeService;
    public LikeController(LikeService likeService) { this.likeService = likeService; }
    @PostMapping("/{postId}/like")
    public Map<String, Long> like(@PathVariable Long postId, @RequestParam Long userId) { return Map.of("likes", likeService.like(postId, userId)); }
    @DeleteMapping("/{postId}/like")
    public Map<String, Long> unlike(@PathVariable Long postId, @RequestParam Long userId) { return Map.of("likes", likeService.unlike(postId, userId)); }
}
