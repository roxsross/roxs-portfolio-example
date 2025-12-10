// ===== PORTFOLIO ROXS DEVOPS - MAIN JAVASCRIPT =====

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const modalClose = document.getElementById('modal-close');
const projectsGrid = document.getElementById('projects-grid');

// ===== DEVOPS THEME MANAGER =====
class DevOpsThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('roxs-theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.updateToggleIcon();
        this.bindEvents();
    }

    bindEvents() {
        themeToggle.addEventListener('click', () => this.toggle());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('roxs-theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
                this.updateToggleIcon();
            }
        });
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.updateToggleIcon();
        localStorage.setItem('roxs-theme', this.currentTheme);
        
        // Trigger terminal effect
        this.triggerTerminalEffect();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update terminal colors
        this.updateTerminalColors(theme);
    }

    updateToggleIcon() {
        const icon = themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    updateTerminalColors(theme) {
        const terminals = document.querySelectorAll('.terminal-window, .terminal-contact');
        terminals.forEach(terminal => {
            terminal.classList.toggle('dark-terminal', theme === 'dark');
        });
    }

    triggerTerminalEffect() {
        // Create visual feedback for theme change
        const terminalEffect = document.createElement('div');
        terminalEffect.className = 'terminal-feedback';
        terminalEffect.innerHTML = `
            <span class="prompt">roxs@devops:~$</span>
            <span class="command">theme --switch-to-${this.currentTheme}</span>
        `;
        
        document.body.appendChild(terminalEffect);
        
        setTimeout(() => {
            terminalEffect.remove();
        }, 2000);
    }
}

// ===== NAVIGATION MANAGER =====
class DevOpsNavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.activeSection = '';
        this.init();
    }

    init() {
        this.bindEvents();
        this.highlightActiveSection();
        this.setupScrollHandler();
    }

    bindEvents() {
        hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
                this.handleNavClick(e);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !navbar.contains(e.target)) {
                this.toggleMenu();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open on mobile
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        
        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', this.isMenuOpen);
        navMenu.setAttribute('aria-hidden', !this.isMenuOpen);
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Terminal-style navigation feedback
            this.showNavigationFeedback(targetId);
        }
    }

    setupScrollHandler() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.highlightActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
    }

    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current !== this.activeSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            this.activeSection = current;
        }
    }

    showNavigationFeedback(targetId) {
        const feedback = document.createElement('div');
        feedback.className = 'nav-feedback';
        feedback.innerHTML = `
            <span class="prompt">roxs@devops:~$</span>
            <span class="command">cd ${targetId.substring(1)}</span>
        `;
        
        navbar.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1500);
    }
}

// ===== TERMINAL ANIMATIONS =====
class TerminalAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypingAnimations();
        this.setupCommandAnimations();
        this.setupLoadingEffects();
    }

    setupTypingAnimations() {
        const typingElements = document.querySelectorAll('.typing-animation');
        
        typingElements.forEach(element => {
            this.typeText(element, element.textContent);
        });
    }

    typeText(element, text) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }

    setupCommandAnimations() {
        // Animate command executions in terminals
        const commands = [
            { element: '.hero .terminal-content', delay: 2000 },
            { element: '.contact .terminal-contact', delay: 1000 }
        ];

        commands.forEach(cmd => {
            setTimeout(() => {
                this.executeTerminalCommand(cmd.element);
            }, cmd.delay);
        });
    }

    executeTerminalCommand(selector) {
        const terminal = document.querySelector(selector);
        if (!terminal) return;

        const commands = [
            'kubectl get pods --all-namespaces',
            'docker ps -a',
            'terraform plan',
            'ansible-playbook site.yml',
            'aws ec2 describe-instances'
        ];

        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        
        // Create new command line
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line animated-command';
        commandLine.innerHTML = `
            <span class="prompt">roxs@devops:~$</span>
            <span class="command">${randomCommand}</span>
        `;
        
        terminal.appendChild(commandLine);
        
        // Simulate command execution
        setTimeout(() => {
            const output = document.createElement('div');
            output.className = 'terminal-output';
            output.textContent = '✅ Command executed successfully';
            terminal.appendChild(output);
        }, 1500);
    }

    setupLoadingEffects() {
        // Create matrix-like background effect
        this.createMatrixEffect();
    }

    createMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-bg';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.05';
        canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(1);
        
        const matrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ff6b35';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(Math.random() * 128);
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(matrix, 35);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// ===== DEVOPS ANIMATIONS =====
class DevOpsAnimations {
    constructor() {
        this.observedElements = new Set();
        this.init();
    }

    init() {
        this.createObserver();
        this.observeElements();
        this.animateStats();
        this.animateSkillBars();
        this.setupFloatingIcons();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger special DevOps animations
                    if (entry.target.classList.contains('project-card')) {
                        this.animateProjectCard(entry.target);
                    }
                    
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('.fade-in, .project-card, .skill-category, .timeline-item');
        animatedElements.forEach(el => {
            this.observer.observe(el);
            el.classList.add('fade-in');
        });
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        const startTime = Date.now();
        
        const counter = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * target);
            element.textContent = current;
            
            if (progress === 1) {
                clearInterval(counter);
                if (target === 99) {
                    element.textContent = '99.9%';
                } else {
                    element.textContent = target + (target < 50 ? '+' : '');
                }
            }
        }, stepTime);
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                        
                        // Add terminal-style completion effect
                        setTimeout(() => {
                            this.addSkillCompletionEffect(entry.target);
                        }, 1000);
                    }, 200);
                    skillsObserver.unobserve(entry.target);
                }
            });
        });

        skillBars.forEach(bar => {
            skillsObserver.observe(bar);
        });
    }

    addSkillCompletionEffect(skillBar) {
        const effect = document.createElement('div');
        effect.className = 'skill-completion';
        effect.textContent = '✅';
        effect.style.position = 'absolute';
        effect.style.right = '5px';
        effect.style.top = '-20px';
        effect.style.fontSize = '12px';
        effect.style.opacity = '0';
        effect.style.transition = 'opacity 0.3s';
        
        skillBar.parentElement.style.position = 'relative';
        skillBar.parentElement.appendChild(effect);
        
        setTimeout(() => {
            effect.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            effect.remove();
        }, 2000);
    }

    animateProjectCard(card) {
        // Add DevOps-specific animations to project cards
        const delay = Math.random() * 500;
        
        setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
            
            // Add deployment animation
            this.addDeploymentAnimation(card);
        }, delay);
    }

    addDeploymentAnimation(card) {
        const deployIcon = document.createElement('div');
        deployIcon.className = 'deploy-animation';
        deployIcon.innerHTML = '🚀';
        deployIcon.style.position = 'absolute';
        deployIcon.style.top = '10px';
        deployIcon.style.right = '10px';
        deployIcon.style.fontSize = '20px';
        deployIcon.style.opacity = '0';
        deployIcon.style.animation = 'deployFly 2s ease-out';
        
        card.style.position = 'relative';
        card.appendChild(deployIcon);
        
        setTimeout(() => {
            deployIcon.remove();
        }, 2000);
    }

    setupFloatingIcons() {
        const icons = document.querySelectorAll('.floating-icon');
        
        icons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.5}s`;
            
            // Add hover effects
            icon.addEventListener('mouseenter', () => {
                icon.style.animation = 'none';
                icon.style.transform = 'scale(1.2) rotate(360deg)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.animation = 'float 6s ease-in-out infinite';
                icon.style.transform = '';
            });
        });
    }
}

// ===== PROJECT FILTER MANAGER =====
class DevOpsProjectFilter {
    constructor() {
        this.activeFilter = '*';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupFilterAnimations();
    }

    bindEvents() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target);
            });
        });
    }

    handleFilter(button) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Get filter value
        const filter = button.getAttribute('data-filter');
        this.activeFilter = filter;

        // Filter projects with DevOps terminal effect
        this.filterProjectsWithEffect(filter);
        
        // Show terminal command
        this.showFilterCommand(filter);
    }

    filterProjectsWithEffect(filter) {
        const projects = document.querySelectorAll('.project-card');
        
        // Hide all projects first
        projects.forEach(project => {
            project.style.transition = 'all 0.3s ease-out';
            project.style.transform = 'scale(0.8)';
            project.style.opacity = '0';
        });
        
        // Show filtered projects after delay
        setTimeout(() => {
            projects.forEach(project => {
                if (filter === '*' || project.classList.contains(filter.substring(1))) {
                    project.classList.remove('hidden');
                    project.style.transform = 'scale(1)';
                    project.style.opacity = '1';
                } else {
                    project.classList.add('hidden');
                }
            });
        }, 300);
    }

    showFilterCommand(filter) {
        const command = filter === '*' ? 'kubectl get all' : `kubectl get ${filter.substring(1)}`;
        
        const feedback = document.createElement('div');
        feedback.className = 'filter-feedback';
        feedback.innerHTML = `
            <span class="prompt">roxs@devops:~$</span>
            <span class="command">${command}</span>
        `;
        
        const projectsSection = document.getElementById('proyectos');
        projectsSection.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    setupFilterAnimations() {
        // Add CSS for filter animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes deployFly {
                0% { opacity: 0; transform: translateY(20px) scale(0.5); }
                50% { opacity: 1; transform: translateY(-10px) scale(1.2); }
                100% { opacity: 0; transform: translateY(-30px) scale(0.8); }
            }
            
            .filter-feedback, .nav-feedback, .terminal-feedback {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #0d1117;
                color: #58a6ff;
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                font-family: 'JetBrains Mono', monospace;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                z-index: 1000;
                animation: terminalPop 1.5s ease-out;
                pointer-events: none;
            }
            
            @keyframes terminalPop {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            }
            
            .prompt { color: #7ee787; font-weight: 600; }
            .command { color: #ffa657; margin-left: 0.5rem; }
        `;
        document.head.appendChild(style);
    }
}

// ===== LAZY LOADING MANAGER =====
class DevOpsLazyLoader {
    constructor() {
        this.init();
    }

    init() {
        this.createObserver();
        this.observeImages();
        this.preloadCriticalImages();
    }

    createObserver() {
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px'
        });
    }

    observeImages() {
        const lazyImages = document.querySelectorAll('.lazy-load');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            // Show loading effect
            this.showImageLoading(img);
            
            // Create new image
            const newImg = new Image();
            newImg.onload = () => {
                img.src = src;
                img.classList.add('loaded');
                this.hideImageLoading(img);
            };
            newImg.onerror = () => {
                this.handleImageError(img);
            };
            newImg.src = src;
        }
    }

    showImageLoading(img) {
        const loader = document.createElement('div');
        loader.className = 'image-loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <span>Loading...</span>
        `;
        
        img.parentElement.appendChild(loader);
    }

    hideImageLoading(img) {
        const loader = img.parentElement.querySelector('.image-loader');
        if (loader) {
            loader.remove();
        }
    }

    handleImageError(img) {
        this.hideImageLoading(img);
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
        img.classList.add('loaded');
    }

    preloadCriticalImages() {
        // Preload hero and important images
        const criticalImages = [
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
            'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=250&fit=crop'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// ===== DEVOPS FORM VALIDATOR =====
class DevOpsFormValidator {
    constructor() {
        this.form = contactForm;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupCustomValidation();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation with DevOps flair
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                this.clearError(input);
                if (input.id === 'message') {
                    this.updateCharCount(input);
                }
            });
            input.addEventListener('focus', () => this.showFieldInfo(input));
        });
        
        // Initialize char counter
        const messageField = document.getElementById('message');
        if (messageField) {
            this.updateCharCount(messageField);
        }
    }
    
    updateCharCount(textarea) {
        const charCount = document.getElementById('char-count');
        if (charCount) {
            const current = textarea.value.length;
            const max = textarea.getAttribute('maxlength') || 500;
            charCount.textContent = `${current}/${max}`;
            
            // Change color based on usage
            if (current > max * 0.9) {
                charCount.style.color = '#dc3545';
            } else if (current > max * 0.7) {
                charCount.style.color = '#ffa657';
            } else {
                charCount.style.color = 'var(--text-secondary)';
            }
        }
    }

    setupCustomValidation() {
        // Add DevOps-specific validation patterns
        this.validationRules = {
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            name: {
                pattern: /^[a-zA-Z\s]{2,50}$/,
                message: 'Name should contain only letters and spaces (2-50 chars)'
            },
            company: {
                pattern: /^[a-zA-Z0-9\s\-\.]{0,100}$/,
                message: 'Company name contains invalid characters'
            }
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        // Terminal-style validation
        this.showTerminalValidation();
        
        const isValid = await this.validateForm();
        
        if (isValid) {
            await this.submitForm();
        }
    }

    showTerminalValidation() {
        const terminal = document.createElement('div');
        terminal.className = 'validation-terminal';
        terminal.innerHTML = `
            <div class="terminal-header">
                <span class="prompt">roxs@devops:~$</span>
                <span class="command">validate-form --strict</span>
            </div>
            <div class="validation-output">Validating form data...</div>
        `;
        
        this.form.appendChild(terminal);
        
        setTimeout(() => {
            terminal.remove();
        }, 2000);
    }

    async validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        const errors = [];

        for (const input of inputs) {
            const fieldValid = await this.validateField(input);
            if (!fieldValid) {
                isValid = false;
                errors.push(input.name);
            }
        }

        if (!isValid) {
            this.showValidationSummary(errors);
        }

        return isValid;
    }

    async validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearError(field);

        // Required validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
            isValid = false;
        }

        // Pattern validation
        if (value && this.validationRules[fieldName]) {
            const rule = this.validationRules[fieldName];
            if (!rule.pattern.test(value)) {
                errorMessage = rule.message;
                isValid = false;
            }
        }

        // Subject validation
        if (fieldName === 'subject' && value) {
            if (value === '') {
                errorMessage = 'Please select a project type';
                isValid = false;
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
                isValid = false;
            }
            if (value.length > 500) {
                errorMessage = 'Message must be less than 500 characters';
                isValid = false;
            }
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.showSuccess(field);
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = `❌ ${message}`;
            errorElement.style.color = '#ff4757';
        }
    }

    showSuccess(field) {
        field.classList.remove('error');
        field.classList.add('success');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '✅ Valid';
            errorElement.style.color = '#2ed573';
        }
    }

    clearError(field) {
        field.classList.remove('error', 'success');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    showFieldInfo(field) {
        const info = this.getFieldInfo(field.name);
        if (info) {
            this.showTooltip(field, info);
        }
    }

    getFieldInfo(fieldName) {
        const infoMap = {
            subject: 'Select the type of DevOps project you need help with',
            message: 'Describe your infrastructure needs, current setup, or challenges'
        };
        return infoMap[fieldName] || null;
    }

    showTooltip(field, message) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.field-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'field-tooltip';
        tooltip.textContent = message;
        
        field.parentElement.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 3000);
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            company: 'Company',
            subject: 'Project Type',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    showValidationSummary(errors) {
        const summary = document.createElement('div');
        summary.className = 'validation-summary';
        summary.innerHTML = `
            <h4>🚨 Validation Errors</h4>
            <ul>
                ${errors.map(error => `<li>${this.getFieldLabel(error)} needs attention</li>`).join('')}
            </ul>
        `;
        
        this.form.insertBefore(summary, this.form.firstChild);
        
        setTimeout(() => {
            summary.remove();
        }, 5000);
    }

    async submitForm() {
        this.isSubmitting = true;
        const submitBtn = this.form.querySelector('.submit-btn');
        
        // Show loading state with DevOps theme
        submitBtn.classList.add('loading');
        this.showDeploymentProgress();
        
        try {
            // Simulate form submission with DevOps deployment
            await this.simulateDeployment();
            
            // Show success modal
            this.showSuccessModal();
            
            // Reset form
            this.form.reset();
            this.clearAllErrors();
            
        } catch (error) {
            console.error('Deployment failed:', error);
            this.showDeploymentError();
        } finally {
            this.isSubmitting = false;
            submitBtn.classList.remove('loading');
            this.hideDeploymentProgress();
        }
    }

    showDeploymentProgress() {
        const progress = document.createElement('div');
        progress.className = 'deployment-progress';
        progress.innerHTML = `
            <div class="deploy-header">
                <span class="prompt">roxs@devops:~$</span>
                <span class="command">deploy message --to=roxs-inbox</span>
            </div>
            <div class="deploy-steps">
                <div class="step">📦 Packaging message...</div>
                <div class="step">🚀 Deploying to inbox...</div>
                <div class="step">✅ Message delivered!</div>
            </div>
        `;
        
        this.form.appendChild(progress);
    }

    hideDeploymentProgress() {
        const progress = this.form.querySelector('.deployment-progress');
        if (progress) {
            progress.remove();
        }
    }

    simulateDeployment() {
        return new Promise((resolve) => {
            // Simulate realistic deployment time
            setTimeout(resolve, 3000);
        });
    }

    showSuccessModal() {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add deployment success animation
        setTimeout(() => {
            this.addSuccessAnimation();
        }, 500);
    }

    showDeploymentError() {
        const error = document.createElement('div');
        error.className = 'deployment-error';
        error.innerHTML = `
            <div class="error-header">
                <span class="prompt">roxs@devops:~$</span>
                <span class="command">deployment-status</span>
            </div>
            <div class="error-output">
                ❌ Deployment failed. Please try again.
            </div>
        `;
        
        this.form.appendChild(error);
        
        setTimeout(() => {
            error.remove();
        }, 4000);
    }

    addSuccessAnimation() {
        const animation = document.createElement('div');
        animation.className = 'success-animation';
        animation.innerHTML = '🚀✨';
        
        successModal.appendChild(animation);
        
        setTimeout(() => {
            animation.remove();
        }, 2000);
    }

    clearAllErrors() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            this.clearError(input);
        });
    }
}

// ===== SCROLL MANAGER =====
class DevOpsScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollToTop();
        this.setupSmoothScrolling();
        this.setupScrollIndicator();
    }

    setupScrollToTop() {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 300;
            scrollToTopBtn.classList.toggle('visible', scrolled);
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Show terminal feedback
            this.showScrollFeedback();
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = '<div class="scroll-progress"></div>';
        
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            const progressBar = indicator.querySelector('.scroll-progress');
            progressBar.style.width = `${scrollPercent}%`;
        });
    }

    showScrollFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'scroll-feedback';
        feedback.innerHTML = `
            <span class="prompt">roxs@devops:~$</span>
            <span class="command">cd /home</span>
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1500);
    }
}

// ===== MODAL MANAGER =====
class DevOpsModalManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        modalClose.addEventListener('click', () => this.closeModal());
        
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                this.closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Add terminal close effect
        this.showCloseEffect();
    }

    showCloseEffect() {
        const effect = document.createElement('div');
        effect.className = 'modal-close-effect';
        effect.innerHTML = `
            <span class="prompt">roxs@devops:~$</span>
            <span class="command">modal --close</span>
        `;
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }
}

// ===== PERFORMANCE MONITOR =====
class DevOpsPerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            firstPaint: 0,
            firstContentfulPaint: 0,
            timeToInteractive: 0
        };
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.measurePerformance();
            this.showPerformanceReport();
        });
    }

    measurePerformance() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            this.metrics.timeToInteractive = navigation.domInteractive - navigation.navigationStart;
            
            paint.forEach(entry => {
                if (entry.name === 'first-paint') {
                    this.metrics.firstPaint = entry.startTime;
                }
                if (entry.name === 'first-contentful-paint') {
                    this.metrics.firstContentfulPaint = entry.startTime;
                }
            });
        }
    }

    showPerformanceReport() {
        if (window.location.search.includes('debug=true')) {
            console.log('🚀 DevOps Portfolio Performance Report:');
            console.table(this.metrics);
            
            // Show performance badge
            this.createPerformanceBadge();
        }
    }

    createPerformanceBadge() {
        const badge = document.createElement('div');
        badge.className = 'performance-badge';
        badge.innerHTML = `
            <div class="badge-title">⚡ Performance</div>
            <div class="badge-metrics">
                <div>FCP: ${Math.round(this.metrics.firstContentfulPaint)}ms</div>
                <div>TTI: ${Math.round(this.metrics.timeToInteractive)}ms</div>
            </div>
        `;
        
        document.body.appendChild(badge);
        
        setTimeout(() => {
            badge.style.opacity = '0';
            setTimeout(() => badge.remove(), 300);
        }, 5000);
    }
}

// ===== APPLICATION INITIALIZATION =====
class RoxsDevOpsApp {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Wait for DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
            
        } catch (error) {
            console.error('❌ Failed to initialize Roxs DevOps Portfolio:', error);
            this.handleInitializationError();
        }
    }

    showLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            
            // Add custom loading messages
            this.showLoadingMessages();
        }
    }

    showLoadingMessages() {
        const messages = [
            'Initializing DevOps environment...',
            'Loading Kubernetes configs...',
            'Connecting to AWS services...',
            'Setting up CI/CD pipelines...',
            'Portfolio ready! 🚀'
        ];

        const loadingText = document.querySelector('.loading-text .command');
        let messageIndex = 0;

        const messageInterval = setInterval(() => {
            if (messageIndex < messages.length && loadingText) {
                loadingText.textContent = messages[messageIndex];
                messageIndex++;
            } else {
                clearInterval(messageInterval);
            }
        }, 600);
    }

    async initializeComponents() {
        try {
            // Initialize all components
            this.components.themeManager = new DevOpsThemeManager();
            this.components.navigationManager = new DevOpsNavigationManager();
            this.components.terminalAnimations = new TerminalAnimations();
            this.components.animations = new DevOpsAnimations();
            this.components.projectFilter = new DevOpsProjectFilter();
            this.components.lazyLoader = new DevOpsLazyLoader();
            this.components.formValidator = new DevOpsFormValidator();
            this.components.scrollManager = new DevOpsScrollManager();
            this.components.modalManager = new DevOpsModalManager();
            this.components.performanceMonitor = new DevOpsPerformanceMonitor();

            // Setup global event listeners
            this.setupGlobalEvents();

            // Hide loading screen
            setTimeout(() => {
                this.hideLoadingScreen();
                this.showWelcomeMessage();
            }, 2000);

            this.isInitialized = true;
            console.log('✅ Roxs DevOps Portfolio initialized successfully!');
            
        } catch (error) {
            console.error('❌ Component initialization failed:', error);
            this.handleInitializationError();
        }
    }

    hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    showWelcomeMessage() {
        const welcome = document.createElement('div');
        welcome.className = 'welcome-message';
        welcome.innerHTML = `
            <div class="terminal-welcome">
                <div class="welcome-header">
                    <span class="prompt">roxs@devops:~$</span>
                    <span class="command">welcome --visitor</span>
                </div>
                <div class="welcome-output">
                    🔥 Welcome to Roxs DevOps Portfolio!<br>
                    📡 System status: Online<br>
                    🚀 Ready for DevOps collaboration
                </div>
            </div>
        `;
        
        document.body.appendChild(welcome);
        
        setTimeout(() => {
            welcome.style.opacity = '0';
            setTimeout(() => welcome.remove(), 300);
        }, 4000);
    }

    setupGlobalEvents() {
        // Global error handling
        window.addEventListener('error', (e) => {
            console.error('🚨 Global error:', e.error);
            this.logError(e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('🚨 Unhandled promise rejection:', e.reason);
            this.logError(e.reason);
        });

        // Visibility change handling
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Online/offline status
        window.addEventListener('online', () => this.showConnectionStatus(true));
        window.addEventListener('offline', () => this.showConnectionStatus(false));
    }

    logError(error) {
        // In production, you might want to send this to a logging service
        if (window.location.search.includes('debug=true')) {
            this.showErrorTerminal(error);
        }
    }

    showErrorTerminal(error) {
        const errorTerminal = document.createElement('div');
        errorTerminal.className = 'error-terminal';
        errorTerminal.innerHTML = `
            <div class="terminal-header">
                <span class="prompt">roxs@devops:~$</span>
                <span class="command">tail -f /var/log/portfolio.log</span>
            </div>
            <div class="error-output">
                ❌ Error: ${error.message || error}<br>
                🔧 Check console for details
            </div>
        `;
        
        document.body.appendChild(errorTerminal);
        
        setTimeout(() => {
            errorTerminal.remove();
        }, 5000);
    }

    showConnectionStatus(isOnline) {
        const status = document.createElement('div');
        status.className = 'connection-status';
        status.innerHTML = `
            <div class="status-content">
                <span class="prompt">roxs@devops:~$</span>
                <span class="command">ping portfolio.roxs.dev</span>
                <div class="status-result">
                    ${isOnline ? '🟢 Connected' : '🔴 Offline'}
                </div>
            </div>
        `;
        
        document.body.appendChild(status);
        
        setTimeout(() => {
            status.remove();
        }, 3000);
    }

    pauseAnimations() {
        document.documentElement.style.setProperty('--animation-play-state', 'paused');
    }

    resumeAnimations() {
        document.documentElement.style.setProperty('--animation-play-state', 'running');
    }

    handleInitializationError() {
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div class="error-message">
                    <h2>🚨 Initialization Failed</h2>
                    <p>Unable to load DevOps portfolio. Please refresh the page.</p>
                    <button onclick="window.location.reload()" class="retry-btn">
                        🔄 Retry
                    </button>
                </div>
            `;
        }
    }

    // Public API for debugging
    getComponentStatus() {
        return Object.keys(this.components).map(name => ({
            name,
            status: this.components[name] ? 'initialized' : 'failed'
        }));
    }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Add custom CSS for DevOps effects
    const devopsStyles = document.createElement('style');
    devopsStyles.textContent = `
        .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #21262d;
            z-index: 1000;
        }
        
        .scroll-progress {
            height: 100%;
            background: linear-gradient(90deg, #ff6b35, #00d4aa);
            transition: width 0.3s ease;
        }
        
        .performance-badge {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #0d1117;
            color: #58a6ff;
            padding: 1rem;
            border-radius: 0.5rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            z-index: 1000;
            transition: opacity 0.3s;
        }
        
        .welcome-message, .connection-status, .error-terminal {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0d1117;
            color: #58a6ff;
            padding: 1rem;
            border-radius: 0.5rem;
            font-family: 'JetBrains Mono', monospace;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideInFromRight 0.5s ease-out;
        }
        
        @keyframes slideInFromRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .image-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff6b35;
            text-align: center;
        }
        
        .loader-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #ff6b35;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        
        .validation-terminal, .deployment-progress, .deployment-error {
            background: #0d1117;
            color: #58a6ff;
            padding: 1rem;
            border-radius: 0.5rem;
            font-family: 'JetBrains Mono', monospace;
            margin: 1rem 0;
            border-left: 4px solid #ff6b35;
        }
        
        .field-tooltip {
            position: absolute;
            bottom: -25px;
            left: 0;
            background: #0d1117;
            color: #58a6ff;
            padding: 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            white-space: nowrap;
            z-index: 1000;
        }
        
        .validation-summary {
            background: #ff4757;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .success-animation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            animation: successBounce 1s ease-out;
        }
        
        @keyframes successBounce {
            0% { transform: translate(-50%, -50%) scale(0); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
        
        .error-message {
            text-align: center;
            color: #ff4757;
            padding: 2rem;
        }
        
        .retry-btn {
            background: #ff6b35;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(devopsStyles);
    
    // Initialize the application
    window.roxsDevOpsApp = new RoxsDevOpsApp();
});

// Export for testing and debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DevOpsThemeManager,
        DevOpsNavigationManager,
        DevOpsAnimations,
        DevOpsProjectFilter,
        DevOpsLazyLoader,
        DevOpsFormValidator,
        RoxsDevOpsApp
    };
}
