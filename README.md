# 🔥 DevOps Portfolio - Roxs

[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://hub.docker.com/r/roxsross12/portfolio-devops)
[![Multi-Arch](https://img.shields.io/badge/Multi--Arch-AMD64%20%7C%20ARM64-success)](https://hub.docker.com/r/roxsross12/portfolio-devops)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 🚀 **Portfolio profesional para DevOps Engineers** - Simple, rápido y listo para producción con soporte multi-arquitectura.

## ✨ Características

- ✅ **100% Customizable** - Configuración centralizada en `config.js`
- ✅ **Sitio Estático** - Solo HTML, CSS y JavaScript vanilla
- ✅ **Multi-Arquitectura** - Soporte para AMD64 y ARM64 (Apple Silicon, Raspberry Pi)
- ✅ **Docker Optimizado** - Imagen alpine liviana (~10MB)
- ✅ **UX Mejorada** - Formulario de contacto con validación en tiempo real
- ✅ **Responsive** - Diseño adaptable mobile-first
- ✅ **Dark/Light Mode** - Tema dinámico con persistencia
- ✅ **Performance** - Optimizado para carga rápida

---

## 🚀 Quick Start

### Prerequisitos

- Docker 24.0+ con BuildKit habilitado
- Docker Compose 2.20+

### 🏃 Ejecución Rápida con Docker

```bash
# 1. Clonar el repositorio
git clone https://github.com/roxsross/roxs-portfolio-example.git
cd roxs-portfolio-example

# 2. Construir y levantar
docker compose up -d portfolio

# 3. Acceder
open http://localhost:8080
```

### 🐳 Pull desde Docker Hub

```bash
# Pull (automáticamente selecciona la arquitectura correcta)
docker pull roxsross12/portfolio-devops:latest

# Run
docker run -d -p 8080:80 --name portfolio roxsross12/portfolio-devops:latest
```

### 🛠️ Desarrollo Local

```bash
# Ejecutar en modo desarrollo
docker compose up portfolio-dev

# O sin Docker (Python)
python3 -m http.server 8081

# Acceder a: http://localhost:8081
```

---

## ⚙️ Configuración

### 1️⃣ Personalizar `config.js`

El archivo `config.js` es el centro de customización. Edita tus datos:

```javascript
const portfolioConfig = {
  personal: {
    name: "Tu Nombre",
    title: "DevOps Engineer",
    email: "tu@email.com",
    phone: "+1234567890",
    location: "Tu Ciudad, País",
    avatar: "./assets/avatar.jpg"
  },
  social: {
    github: "https://github.com/tuusuario",
    linkedin: "https://linkedin.com/in/tuusuario",
    twitter: "https://twitter.com/tuusuario",
    docker: "https://hub.docker.com/u/tuusuario"
  },
  skills: {
    categories: [
      {
        name: "Cloud Platforms",
        items: [
          { name: "AWS", level: 95 },
          { name: "Azure", level: 85 },
          { name: "GCP", level: 80 }
        ]
      }
      // ... más categorías
    ]
  },
  projects: [
    {
      title: "Tu Proyecto",
      description: "Descripción del proyecto",
      image: "https://images.unsplash.com/...",
      tags: ["Docker", "Kubernetes", "AWS"],
      demo: "https://demo.com",
      github: "https://github.com/..."
    }
    // ... más proyectos
  ]
};
```

### 2️⃣ Estructura del Proyecto

```
roxs-portfolio-example/
├── index.html              # Página principal
├── config.js              # ⚙️ Configuración personalizable
├── Dockerfile             # 🐳 Imagen Docker optimizada
├── docker-compose.yml     # 🔧 Orquestación local
├── css/
│   └── styles.css        # Estilos responsive
├── js/
│   ├── config-loader.js  # Carga dinámica de config
│   └── main.js           # Lógica del portfolio
└── assets/               # Recursos estáticos
```

---

## 🐳 Docker

### Build Local

```bash
# Build simple
docker build -t roxsross12/portfolio-devops:latest .

# Build con versión
docker build -t roxsross12/portfolio-devops:1.0.0 .
```

### Build Multi-Arquitectura

```bash
# Crear builder (solo primera vez)
docker buildx create --use --name multiarch-builder

# Build para AMD64 y ARM64
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t roxsross12/portfolio-devops:latest \
  -t roxsross12/portfolio-devops:1.0.0 \
  --push .

# O usando docker compose
docker compose build --push
```

### Run Container

```bash
# Ejecutar desde Docker Hub
docker run -d \
  -p 8080:80 \
  --name portfolio \
  --restart unless-stopped \
  roxsross12/portfolio-devops:latest

# Ver logs
docker logs -f portfolio

# Detener
docker stop portfolio && docker rm portfolio
```

### Docker Compose

```bash
# Producción
docker compose up -d portfolio

# Desarrollo con hot-reload
docker compose up portfolio-dev

# Ver logs
docker compose logs -f portfolio

# Rebuild
docker compose build portfolio

# Detener
docker compose down
```

---

## 🚢 Deployment

### Manual Deploy

```bash
# En tu servidor (Linux/Mac/Windows con WSL)
docker pull roxsross12/portfolio-devops:latest
docker run -d -p 80:80 --name portfolio --restart unless-stopped \
  roxsross12/portfolio-devops:latest
```

### Con Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Actualización Zero-Downtime

```bash
# Pull nueva versión
docker pull roxsross12/portfolio-devops:latest

# Start nuevo contenedor
docker run -d -p 8081:80 --name portfolio-new \
  roxsross12/portfolio-devops:latest

# Verificar que funciona
curl http://localhost:8081

# Cambiar nginx a nuevo puerto y reload
# Detener contenedor antiguo
docker stop portfolio && docker rm portfolio

# Renombrar nuevo contenedor
docker rename portfolio-new portfolio
```

---

## 🎨 Personalización Avanzada

### Cambiar Colores y Tema

Edita las variables CSS en `css/styles.css`:

```css
:root {
    --primary-color: #ff6b35;      /* Color principal */
    --bg-primary: #ffffff;         /* Fondo claro */
    --text-primary: #0d1117;       /* Texto principal */
}

[data-theme="dark"] {
    --bg-primary: #0d1117;         /* Fondo oscuro */
    --text-primary: #c9d1d9;       /* Texto claro */
}
```

### Agregar Nuevas Secciones

1. Edita `index.html` y agrega tu sección
2. Agrega estilos en `css/styles.css`
3. Si necesitas lógica, edita `js/main.js`

### Formulario de Contacto

El formulario incluye:
- ✅ Validación en tiempo real
- ✅ Contador de caracteres
- ✅ Estados visuales (hover, focus, valid/invalid)
- ✅ Placeholders informativos
- ✅ Autocomplete
   - Kubernetes rolling update

6. **🚀 Deploy Production**
   - Deploy to production on `main` branch
   - Slack notifications
   - Rollback capability

7. **📦 Release**
   - Auto-release on tags
   - Changelog generation
   - GitHub Release creation

### Configurar Secrets

```bash
# GitHub Secrets necesarios
---

## 🔧 Troubleshooting

### Imagen no carga

```bash
# Verificar que estás en la arquitectura correcta
docker image inspect roxsross12/portfolio-devops:latest | grep Architecture

# Pull específico para tu arquitectura
docker pull --platform linux/amd64 roxsross12/portfolio-devops:latest
# o
docker pull --platform linux/arm64 roxsross12/portfolio-devops:latest
```

### Container no inicia

```bash
# Ver logs
docker logs portfolio

# Verificar puerto
netstat -tuln | grep 8080

# Health check manual
docker exec portfolio wget -O- http://localhost:80

# Entrar al contenedor
docker exec -it portfolio sh
```

### Problemas de permisos

```bash
# Verificar usuario
docker exec portfolio whoami  # Debe ser 'appuser'

# Revisar permisos de archivos
docker exec portfolio ls -la /usr/share/nginx/html
```

### Port en uso

```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "9090:8080"  # Host:Container
```

---

## 🧪 Testing

### Test Local

```bash
# Build y test
docker build -t portfolio-test .
docker run -d -p 8080:8080 --name test portfolio-test
curl -f http://localhost:8080/health
docker stop test && docker rm test
```

### Security Scan

```bash
# Trivy scan
trivy image roxsross/portfolio:latest

# Hadolint (Dockerfile linter)
docker run --rm -i hadolint/hadolint < Dockerfile
```

### Performance Test

```bash
# Lighthouse
npx lighthouse http://localhost:8080 --view

# Apache Bench
ab -n 1000 -c 10 http://localhost:8080/
```

---

## 📚 Recursos Adicionales

### Documentación

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

### Templates y Ejemplos

- `k8s/` - Kubernetes manifests
- `helm/` - Helm charts
- `.github/workflows/` - CI/CD pipelines
### Puerto en uso

```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8081:80"  # Usar puerto diferente

# O detener servicio que usa el puerto
lsof -ti:8080 | xargs kill
```

### Build falla

```bash
# Limpiar caché de Docker
docker system prune -af

# Build sin caché
docker build --no-cache -t roxsross12/portfolio-devops:latest .
```

---

## 💡 Tips & Best Practices

### Performance

- ✅ Imágenes comprimidas (WebP preferible)
- ✅ CSS y JS minificados para producción
- ✅ CDN para recursos estáticos
- ✅ Gzip habilitado en nginx

### Seguridad

- ✅ Headers de seguridad configurados
- ✅ HTTPS/SSL en producción
- ✅ Content Security Policy (CSP)
- ✅ Usuario no-root en Docker

### SEO

- ✅ Meta tags optimizados en `index.html`
- ✅ Open Graph para redes sociales
- ✅ Sitemap.xml generado
- ✅ Robots.txt configurado

---

## 🆘 Soporte

¿Necesitas ayuda? 

- 📖 [Documentación completa](https://github.com/roxsross/roxs-portfolio-example/wiki)
- 🐛 [Reportar un bug](https://github.com/roxsross/roxs-portfolio-example/issues)
- 💬 [Discusiones](https://github.com/roxsross/roxs-portfolio-example/discussions)

---

## 👤 Autor

**Roxs** - DevOps Engineer 🔥

- 🐙 GitHub: [@roxsross](https://github.com/roxsross)
- 💼 LinkedIn: [roxsross](https://linkedin.com/in/roxsross)
- 🐦 Twitter: [@roxsross](https://twitter.com/roxsross)
- 🐳 Docker Hub: [roxsross12](https://hub.docker.com/u/roxsross12)

---

## 📄 License

Este proyecto está bajo la licencia MIT - ver [LICENSE](LICENSE) para más detalles.

---

<div align="center">

### 🌟 Stack Tecnológico

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

---

**⭐ Si te gusta este proyecto, dale una estrella! ⭐**

Hecho con 🔥 y ☕ por [Roxs](https://github.com/roxsross)

</div>
