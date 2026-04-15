package com.example.social.service;

import com.example.social.dto.CreatePostRequest;
import com.example.social.dto.PostResponse;
import com.example.social.entity.Post;
import com.example.social.entity.User;
import com.example.social.repository.LikeRepository;
import com.example.social.repository.PostRepository;
import com.example.social.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    public PostService(PostRepository postRepository, UserRepository userRepository, LikeRepository likeRepository) {
        this.postRepository = postRepository; this.userRepository = userRepository; this.likeRepository = likeRepository;
    }
    public List<PostResponse> findAll() {
        return postRepository.findAll().stream().map(post -> new PostResponse(post.getId(), post.getUser().getUsername(), post.getImageUrl(), post.getDescription(), likeRepository.countByPostId(post.getId()), post.getCreatedAt())).toList();
    }
    public PostResponse create(CreatePostRequest request) {
        User user = userRepository.findById(request.userId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Post saved = postRepository.save(Post.builder().user(user).imageUrl(request.imageUrl()).description(request.description()).createdAt(LocalDateTime.now()).build());
        return new PostResponse(saved.getId(), user.getUsername(), saved.getImageUrl(), saved.getDescription(), 0, saved.getCreatedAt());
    }
}
