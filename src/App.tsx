import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { SEO } from './components/SEO';
import { HomePage } from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { WorkPage, CaseStudyPage, ContactPage, PrivacyPage, NotFoundPage } from './pages/MainPages';
import { ThinkingPage, ThinkingCategoryPage, ArticlePage } from './pages/ThinkingPages';
import { ToolsPage, ToolPage } from './pages/ToolsPages';
import { GTMStackPage } from './pages/ToolsPages';
import { GTMIntelligenceEngine } from './pages/gtm-engine/GTMIntelligenceEngine';
import GlossaryPage from './pages/GlossaryPage';
import GlossaryTermPage from './pages/GlossaryTermPage';
import CredentialsPage from './pages/CredentialsPage';
import { useTheme } from './hooks/useTheme';

/*
 * Legacy hash-URL compatibility. URLs of the form /#/about (previously the
 * canonical format) are resolved to /about with a single replace navigation.
 * Fragment anchors such as #main-content do not start with #/ and are left
 * untouched, so no redirect loop is possible.
 */
function LegacyHashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      navigate(hash.slice(1) || '/', { replace: true });
    }
  }, [navigate]);
  return null;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <BrowserRouter>
      <LegacyHashRedirect />
      <Layout theme={theme} toggleTheme={toggleTheme}>
        <SEO />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:caseStudyId" element={<CaseStudyPage />} />
          <Route path="/thinking" element={<ThinkingPage />} />
          <Route path="/thinking/gtm" element={<ThinkingCategoryPage />} />
          <Route path="/thinking/automation" element={<ThinkingCategoryPage />} />
          <Route path="/thinking/ai-marketing" element={<ThinkingCategoryPage />} />
          <Route path="/thinking/:slug" element={<ArticlePage />} />
          <Route path="/thinking/:categoryId/:articleId" element={<ArticlePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="/tools/gtm-intelligence" element={<GTMIntelligenceEngine />} />
          <Route path="/gtm-stack" element={<GTMStackPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/glossary/:slug" element={<GlossaryTermPage />} />
          <Route path="/credentials" element={<CredentialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
