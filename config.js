// ===== PORTFOLIO CONFIGURATION =====
// Customize your DevOps portfolio here!

const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Roxs Ross",
    title: "DevOps Engineer",
    subtitle: "Cloud Architect & Automation Specialist",
    tagline: "On Fire 🔥",
    email: "roxs@devops.com",
    location: "Remote | Global",
    bio: "Apasionada por la automatización, el cloud computing y las mejores prácticas DevOps. Especializada en construir pipelines robustos y arquitecturas escalables.",
    avatar: "./assets/roxs-profile.jpg",
    resume: "./assets/resume.pdf"
  },

  // Social Media Links
  social: {
    github: "https://github.com/roxsross",
    linkedin: "https://linkedin.com/in/roxsross",
    twitter: "https://twitter.com/roxsross",
    youtube: "https://youtube.com/@roxsross",
    blog: "https://roxsross.com",
    discord: "https://discord.gg/roxsross"
  },

  // Skills & Technologies
  skills: {
    categories: [
      {
        name: "Cloud Platforms",
        icon: "fa-cloud",
        color: "#FF9900", // AWS Orange
        items: [
          { name: "AWS", level: 95, icon: "fab fa-aws" },
          { name: "Azure", level: 85, icon: "fab fa-microsoft" },
          { name: "Google Cloud", level: 80, icon: "fab fa-google" },
          { name: "DigitalOcean", level: 90, icon: "fab fa-digital-ocean" }
        ]
      },
      {
        name: "Containers & Orchestration",
        icon: "fa-cubes",
        color: "#2496ED", // Docker Blue
        items: [
          { name: "Docker", level: 98, icon: "fab fa-docker" },
          { name: "Kubernetes", level: 92, icon: "fa-dharmachakra" },
          { name: "Helm", level: 88, icon: "fa-ship" },
          { name: "Docker Compose", level: 95, icon: "fa-layer-group" }
        ]
      },
      {
        name: "CI/CD & Automation",
        icon: "fa-robot",
        color: "#FC6D26", // GitLab Orange
        items: [
          { name: "GitHub Actions", level: 95, icon: "fab fa-github" },
          { name: "GitLab CI", level: 90, icon: "fab fa-gitlab" },
          { name: "Jenkins", level: 85, icon: "fab fa-jenkins" },
          { name: "ArgoCD", level: 88, icon: "fa-sync-alt" }
        ]
      },
      {
        name: "Infrastructure as Code",
        icon: "fa-code",
        color: "#7B42BC", // Terraform Purple
        items: [
          { name: "Terraform", level: 93, icon: "fa-layer-group" },
          { name: "Ansible", level: 90, icon: "fa-server" },
          { name: "CloudFormation", level: 85, icon: "fab fa-aws" },
          { name: "Pulumi", level: 80, icon: "fa-cube" }
        ]
      },
      {
        name: "Monitoring & Observability",
        icon: "fa-chart-line",
        color: "#E6522C", // Grafana Orange
        items: [
          { name: "Prometheus", level: 90, icon: "fa-fire" },
          { name: "Grafana", level: 92, icon: "fa-chart-area" },
          { name: "ELK Stack", level: 85, icon: "fa-search" },
          { name: "Datadog", level: 88, icon: "fa-dog" }
        ]
      },
      {
        name: "Programming & Scripting",
        icon: "fa-terminal",
        color: "#3776AB", // Python Blue
        items: [
          { name: "Python", level: 90, icon: "fab fa-python" },
          { name: "Bash/Shell", level: 95, icon: "fa-terminal" },
          { name: "Go", level: 82, icon: "fa-code" },
          { name: "JavaScript", level: 85, icon: "fab fa-js" }
        ]
      }
    ]
  },

  // Projects Portfolio
  projects: [
    {
      id: 1,
      title: "Multi-Cloud Infrastructure",
      description: "Arquitectura híbrida multi-cloud con AWS, Azure y GCP usando Terraform",
      category: "Infrastructure",
      tags: ["Terraform", "AWS", "Azure", "GCP", "Multi-Cloud"],
      image: "./assets/projects/project1.jpg",
      github: "https://github.com/roxsross/multi-cloud-infra",
      demo: "https://demo.roxsross.com",
      featured: true,
      metrics: {
        uptime: "99.99%",
        cost_reduction: "40%",
        deployment_time: "15 min"
      }
    },
    {
      id: 2,
      title: "CI/CD Pipeline Automation",
      description: "Pipeline completo de CI/CD con GitHub Actions, Docker y Kubernetes",
      category: "Automation",
      tags: ["GitHub Actions", "Docker", "Kubernetes", "ArgoCD"],
      image: "./assets/projects/project2.jpg",
      github: "https://github.com/roxsross/cicd-automation",
      demo: "https://demo.roxsross.com/cicd",
      featured: true,
      metrics: {
        build_time: "3 min",
        deployments_per_day: "50+",
        success_rate: "98%"
      }
    },
    {
      id: 3,
      title: "Kubernetes Cluster Management",
      description: "Gestión de clusters K8s con Helm, monitoring y auto-scaling",
      category: "Orchestration",
      tags: ["Kubernetes", "Helm", "Prometheus", "Grafana"],
      image: "./assets/projects/project3.jpg",
      github: "https://github.com/roxsross/k8s-management",
      demo: null,
      featured: true,
      metrics: {
        nodes: "50+",
        pods: "500+",
        availability: "99.95%"
      }
    },
    {
      id: 4,
      title: "Monitoring Stack",
      description: "Stack completo de observabilidad con Prometheus, Grafana y alerting",
      category: "Monitoring",
      tags: ["Prometheus", "Grafana", "AlertManager", "Loki"],
      image: "./assets/projects/project4.jpg",
      github: "https://github.com/roxsross/monitoring-stack",
      demo: "https://demo.roxsross.com/monitoring",
      featured: false
    },
    {
      id: 5,
      title: "GitOps Workflow",
      description: "Implementación de GitOps con ArgoCD y FluxCD para deployment automatizado",
      category: "Automation",
      tags: ["ArgoCD", "FluxCD", "GitOps", "Kubernetes"],
      image: "./assets/projects/project5.jpg",
      github: "https://github.com/roxsross/gitops-workflow",
      demo: null,
      featured: false
    },
    {
      id: 6,
      title: "Security Automation",
      description: "Pipeline de seguridad automatizada con escaneo de vulnerabilidades",
      category: "Security",
      tags: ["Trivy", "SonarQube", "OWASP", "Security"],
      image: "./assets/projects/project6.jpg",
      github: "https://github.com/roxsross/security-automation",
      demo: null,
      featured: false
    }
  ],

  // Work Experience
  experience: [
    {
      id: 1,
      company: "Tech Corp",
      position: "Senior DevOps Engineer",
      period: "2022 - Present",
      location: "Remote",
      description: "Lead DevOps initiatives, implementing CI/CD pipelines and cloud infrastructure",
      achievements: [
        "Reduced deployment time by 70% through automation",
        "Migrated legacy infrastructure to Kubernetes",
        "Implemented comprehensive monitoring and alerting"
      ],
      technologies: ["AWS", "Kubernetes", "Terraform", "GitHub Actions"]
    },
    {
      id: 2,
      company: "Cloud Solutions Inc",
      position: "DevOps Engineer",
      period: "2020 - 2022",
      location: "Hybrid",
      description: "Managed cloud infrastructure and automated deployment processes",
      achievements: [
        "Built multi-region disaster recovery system",
        "Automated infrastructure provisioning with Terraform",
        "Established DevOps best practices across teams"
      ],
      technologies: ["Azure", "Docker", "Jenkins", "Ansible"]
    },
    {
      id: 3,
      company: "StartUp Innovate",
      position: "Junior DevOps Engineer",
      period: "2018 - 2020",
      location: "On-site",
      description: "Supported infrastructure and deployment operations",
      achievements: [
        "Migrated applications to containerized environment",
        "Implemented automated testing in CI pipeline",
        "Reduced infrastructure costs by 30%"
      ],
      technologies: ["AWS", "Docker", "GitLab CI", "Python"]
    }
  ],

  // Certifications
  certifications: [
    {
      name: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      date: "2023",
      icon: "fab fa-aws",
      link: "https://aws.amazon.com/certification/"
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "CNCF",
      date: "2023",
      icon: "fa-dharmachakra",
      link: "https://www.cncf.io/certification/cka/"
    },
    {
      name: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      date: "2022",
      icon: "fa-layer-group",
      link: "https://www.hashicorp.com/certification/terraform-associate"
    }
  ],

  // Theme Configuration
  theme: {
    defaultTheme: "dark", // "light" or "dark"
    colors: {
      primary: "#ff6b35",
      secondary: "#00d4aa",
      accent: "#4ecdc4",
      success: "#2ed573",
      warning: "#ffd23f",
      error: "#ff4757"
    },
    fonts: {
      primary: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace"
    }
  },

  // Contact Information
  contact: {
    email: "roxs@devops.com",
    phone: "+1 (555) 123-4567",
    location: "Remote - Available Worldwide",
    availability: "Open to opportunities",
    formAction: "https://formspree.io/f/your-form-id" // Replace with your form endpoint
  },

  // SEO Configuration
  seo: {
    title: "Roxs - DevOps Engineer | Portfolio",
    description: "Portfolio of Roxs - DevOps Engineer specialized in Cloud Computing, CI/CD, Docker, Kubernetes and Automation",
    keywords: "devops, cloud, aws, docker, kubernetes, ci/cd, automation, terraform, ansible, roxs",
    ogImage: "./assets/og-image.jpg",
    twitterHandle: "@roxsross"
  },

  // Feature Flags
  features: {
    enableBlog: false,
    enableNewsletter: false,
    enableAnalytics: true,
    enableDarkMode: true,
    enableAnimations: true,
    enableParticles: true
  },

  // Analytics
  analytics: {
    googleAnalytics: "G-XXXXXXXXXX", // Replace with your GA4 ID
    microsoftClarity: null,
    plausible: null
  }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioConfig;
}
