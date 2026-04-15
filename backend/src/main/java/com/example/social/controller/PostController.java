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
    public PostController(PostService postService) { this.postService = postService; }
    @GetMapping public List<PostResponse> findAll() { return postService.findAll(); }
    @PostMapping public PostResponse create(@RequestBody CreatePostRequest request) { return postService.create(request); }
}
