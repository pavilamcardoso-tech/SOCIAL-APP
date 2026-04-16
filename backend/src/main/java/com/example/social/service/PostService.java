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
import java.util.Comparator;


@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    public PostService(PostRepository postRepository, UserRepository userRepository, LikeRepository likeRepository) {
        this.postRepository = postRepository; this.userRepository = userRepository; this.likeRepository = likeRepository;
    }
    public List<PostResponse> findAll() { return findPosts(null, "createdAt", "desc"); }

    public PostResponse create(CreatePostRequest request) {
        User user = userRepository.findById(request.userId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Post saved = postRepository.save(Post.builder().user(user).imageUrl(request.imageUrl()).description(request.description()).createdAt(LocalDateTime.now()).build());
        return new PostResponse(saved.getId(), user.getUsername(), saved.getImageUrl(), saved.getDescription(), 0, saved.getCreatedAt());
    }

    public List<PostResponse> findByUserId(Long userId) { return findPosts(userId, "createdAt", "desc"); }

    public List<PostResponse> findPosts(Long userId, String sortBy, String direction) {
        List<Post> posts = (userId != null)
                ? postRepository.findByUserId(userId)
                : postRepository.findAllWithUser();
        Comparator<PostResponse> comparator = switch (sortBy) {
            case "username" -> Comparator.comparing(PostResponse::username, String.CASE_INSENSITIVE_ORDER);
            case "likes" -> Comparator.comparingLong(PostResponse::likeCount);
            case "createdAt" -> Comparator.comparing(PostResponse::createdAt);
            default -> Comparator.comparing(PostResponse::createdAt);
        };
        if ("desc".equalsIgnoreCase(direction)) {
            comparator = comparator.reversed();
        }
        return posts.stream()
                .map(post -> new PostResponse(
                        post.getId(),
                        post.getUser().getUsername(),
                        post.getImageUrl(),
                        post.getDescription(),
                        likeRepository.countByPostId(post.getId()),
                        post.getCreatedAt()
                ))
                .sorted(comparator)
                .toList();
    }
}
