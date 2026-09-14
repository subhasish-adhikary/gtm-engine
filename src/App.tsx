import { HashRouter, Routes, Route } from 'react-router-dom';
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
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <HashRouter>
      <Layout theme={theme} toggleTheme={toggleTheme}>
        <SEO />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:caseStudyId" element={<CaseStudyPage />} />
          <Route path="/thinking" element={<ThinkingPage />} />
          <Route path="/thinking/:categoryId" element={<ThinkingCategoryPage />} />
          <Route path="/thinking/:categoryId/:articleId" element={<ArticlePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="/tools/gtm-intelligence" element={<GTMIntelligenceEngine />} />
          <Route path="/gtm-stack" element={<GTMStackPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/glossary/:slug" element={<GlossaryTermPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
