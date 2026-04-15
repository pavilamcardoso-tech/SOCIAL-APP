package com.example.social.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "likes", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "post_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Like {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(optional = false)
    @JoinColumn(name = "post_id")
    private Post post;
    @Column(nullable = false)
    private LocalDateTime createdAt;
}
