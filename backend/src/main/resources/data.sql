INSERT INTO users (id, username, email) VALUES (1, 'gabriel', 'gabriel@email.com');
INSERT INTO users (id, username, email) VALUES (2, 'maria', 'maria@email.com');
INSERT INTO posts (id, user_id, image_url, description, created_at) VALUES
(1, 1, 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800&q=80', 'Primeiro post da aplicação', NOW()),
(2, 2, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', 'Segundo post com imagem e descrição', NOW());
