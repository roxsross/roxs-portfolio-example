// ===== CONFIG LOADER - DYNAMIC PORTFOLIO INITIALIZATION =====
// This script initializes the portfolio with values from config.js

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
  } else {
    initPortfolio();
  }

  function initPortfolio() {
    if (typeof portfolioConfig === 'undefined') {
      console.error('Portfolio configuration not found! Make sure config.js is loaded.');
      return;
    }

    console.log('🔥 Initializing DevOps Portfolio with custom configuration...');

    // Update document metadata
    updateMetadata();
    
    // Update theme
    updateTheme();
    
    // Mark as loaded
    document.body.setAttribute('data-config-loaded', 'true');
    
    console.log('✅ Portfolio configuration loaded successfully!');
  }

  function updateMetadata() {
    const { personal, seo } = portfolioConfig;

    // Update page title
    if (seo?.title) {
      document.title = seo.title;
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && seo?.description) {
      metaDesc.setAttribute('content', seo.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && seo?.keywords) {
      metaKeywords.setAttribute('content', seo.keywords);
    }

    // Update meta author
    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor && personal?.name) {
      metaAuthor.setAttribute('content', personal.name);
    }

    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${personal.name} - ${personal.title}`);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && seo?.description) {
      ogDesc.setAttribute('content', seo.description);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && seo?.ogImage) {
      ogImage.setAttribute('content', seo.ogImage);
    }
  }

  function updateTheme() {
    const { theme } = portfolioConfig;

    if (!theme) return;

    // Set default theme
    if (theme.defaultTheme) {
      const currentTheme = localStorage.getItem('roxs-theme');
      if (!currentTheme) {
        document.documentElement.setAttribute('data-theme', theme.defaultTheme);
        localStorage.setItem('roxs-theme', theme.defaultTheme);
      }
    }

    // Update CSS custom properties if colors are defined
    if (theme.colors) {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}-color`, value);
      });
    }

    // Update fonts
    if (theme.fonts) {
      const root = document.documentElement;
      if (theme.fonts.primary) {
        root.style.setProperty('--font-primary', theme.fonts.primary);
      }
      if (theme.fonts.mono) {
        root.style.setProperty('--font-mono', theme.fonts.mono);
      }
    }
  }

  // Export utility to get config values
  window.getConfig = function(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], portfolioConfig);
  };

})();
