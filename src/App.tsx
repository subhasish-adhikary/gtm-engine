import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage, WorkPage, CaseStudyPage, ContactPage, PrivacyPage, NotFoundPage } from './pages/MainPages';
import { ThinkingPage, ThinkingCategoryPage, ArticlePage } from './pages/ThinkingPages';
import { ToolsPage, ToolPage, GTMStackPage } from './pages/ToolsPages';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <HashRouter>
      <Layout theme={theme} toggleTheme={toggleTheme}>
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
          <Route path="/gtm-stack" element={<GTMStackPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
