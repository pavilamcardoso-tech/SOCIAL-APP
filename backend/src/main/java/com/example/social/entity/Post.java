package com.example.social.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;
    @Column(nullable = false)
    private String imageUrl;
    @Column(nullable = false, length = 1000)
    private String description;
    @Column(nullable = false)
    private LocalDateTime createdAt;
}
