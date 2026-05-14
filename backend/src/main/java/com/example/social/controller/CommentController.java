package com.example.social.controller;

import com.example.social.dto.CommentResponse;
import com.example.social.dto.CreateCommentRequest;
import com.example.social.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/posts/{postId}/comments")
    public List<CommentResponse> list(@PathVariable Long postId) {
        return commentService.findByPostId(postId);
    }

    @PostMapping("/posts/{postId}/comments")
    public CommentResponse create(@PathVariable Long postId, @RequestBody CreateCommentRequest request) {
        return commentService.create(postId, request);
    }

    @DeleteMapping("/comments/{commentId}")
    public void delete(@PathVariable Long commentId, @RequestParam Long userId) {
        commentService.delete(commentId, userId);
    }
}
