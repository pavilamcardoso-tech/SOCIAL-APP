# Base do projeto Social App

## Stack
- Spring Boot 3
- Next.js
- PostgreSQL
- Docker Compose

## Como subir
```bash
docker compose up --build
```

## URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:8080/api/posts
- PostgreSQL: localhost:5432

## Observações
- Esta é uma base inicial para feed com imagens e likes.
- O usuário fixo `userId=1` está sendo usado no frontend para simplificar o MVP.
- O próximo passo ideal é adicionar autenticação com JWT, upload real de imagens e paginação do feed.
