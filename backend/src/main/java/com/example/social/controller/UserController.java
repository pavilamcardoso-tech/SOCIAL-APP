package com.example.social.controller;

import com.example.social.dto.UserResponse;
import com.example.social.entity.User;
import com.example.social.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/auth/register")
    public UserResponse register(@RequestBody User user) {
        User saved = userRepository.save(user);
        return toResponse(saved);
    }

    @PostMapping("/api/auth/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return Map.of("success", true, "user", toResponse(user.get()));
        }
        return Map.of("success", false, "message", "Credenciais inválidas");
    }

    @GetMapping("/api/users/{id}")
    public UserResponse findById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @GetMapping("/api/users/by-username/{username}")
    public UserResponse findByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    private UserResponse toResponse(User u) {
        return new UserResponse(u.getId(), u.getUsername(), u.getEmail(), u.getAvatarUrl(), u.getBio());
    }
}
