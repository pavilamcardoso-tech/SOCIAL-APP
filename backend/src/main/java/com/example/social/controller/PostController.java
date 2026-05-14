package com.example.social.controller;

import com.example.social.dto.CreatePostRequest;
import com.example.social.dto.PostResponse;
import com.example.social.service.PostService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostResponse> findPosts(
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) Long currentUserId
    ) {
        return postService.findPosts(userId, sortBy, direction, currentUserId);
    }

    @GetMapping("/{postId}")
    public PostResponse findById(
            @PathVariable Long postId,
            @RequestParam(required = false) Long currentUserId
    ) {
        return postService.findById(postId, currentUserId);
    }

    @PostMapping
    public PostResponse create(@RequestBody CreatePostRequest request) {
        return postService.create(request);
    }
}
