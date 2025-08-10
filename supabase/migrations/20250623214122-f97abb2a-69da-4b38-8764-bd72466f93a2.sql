
-- Create table for storing research papers
CREATE TABLE public.research_papers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_full_names TEXT NOT NULL,
  article_title TEXT NOT NULL,
  source_title TEXT,
  abstract TEXT,
  publication_year INTEGER,
  doi_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create table for research paper analytics
CREATE TABLE public.research_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  paper_id UUID REFERENCES public.research_papers(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC,
  metric_text TEXT,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create table for author analytics
CREATE TABLE public.author_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  total_papers INTEGER DEFAULT 0,
  avg_publication_year NUMERIC,
  research_areas TEXT[],
  collaboration_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create table for research trends
CREATE TABLE public.research_trends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  topic_keywords TEXT[],
  paper_count INTEGER DEFAULT 0,
  trend_score NUMERIC,
  growth_rate NUMERIC,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.author_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_trends ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read access for research data)
CREATE POLICY "Anyone can view research papers" ON public.research_papers
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view research analytics" ON public.research_analytics
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view author analytics" ON public.author_analytics
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view research trends" ON public.research_trends
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_research_papers_year ON public.research_papers(publication_year DESC);
CREATE INDEX idx_research_papers_authors ON public.research_papers USING gin(to_tsvector('english', author_full_names));
CREATE INDEX idx_research_papers_title ON public.research_papers USING gin(to_tsvector('english', article_title));
CREATE INDEX idx_research_papers_abstract ON public.research_papers USING gin(to_tsvector('english', abstract));
CREATE INDEX idx_research_analytics_paper_id ON public.research_analytics(paper_id);
CREATE INDEX idx_author_analytics_name ON public.author_analytics(author_name);
CREATE INDEX idx_research_trends_year ON public.research_trends(year DESC);

-- Insert the provided sample data
INSERT INTO public.research_papers (author_full_names, article_title, source_title, abstract, publication_year, doi_link) VALUES
('Corbet, Shaen; Dunne, John James; Larkin, Charles', 'Quantitative easing announcements and high-frequency stock market volatility: Evidence from the United States', 'RESEARCH IN INTERNATIONAL BUSINESS AND FINANCE', 'In November 2008, the United States (US) Federal Reserve began purchasing mortgage-backed security obligations, in an attempt to support the failing housing market and improve financial market conditions. This paper provides an investigation of the volatility effects associated with regularly scheduled US Federal Reserve quantitative easing (QE) announcements, using highfrequency returns data. We find significant and substantial increases of stock market volatility immediately after a policy announcement, peaking in the hour following each Federal Open Market Committee (FOMC) announcement. The increase in volatility is largest when the market is provided with forewarning of an announcement. Unexpected announcements lead to longer short-term volatility persistence. Volatility persistence is amplified when the contents of the surprise announcement are positive. Finally, we find evidence of an increase in market returns prior to a FOMC announcement.', 2019, 'http://dx.doi.org/10.1016/j.ribaf.2019.01.007'),

('Thornton, DL', 'The information content of discount rate announcements: What is behind the announcement effect?', 'JOURNAL OF BANKING & FINANCE', 'A considerable volume of research shows that asset prices respond to changes in the Federal Reserve''s discount rate. While several competing hypotheses have been advanced to explain the market''s response to discount rate announcements, comparatively little effort has been made to differentiate among alternative hypotheses. The result is an abundance of evidence establishing that asset prices respond to discount rate announcements, but little if any agreement about why markets respond. This article attempts to fill a void in the literature by pointing out how competing hypotheses differ and by constructing tests explicitly designed to differentiate among competing explanations. The evidence suggests that the market''s reaction to discount rate changes is purely an announcement effect, i.e., a reaction to new information contained in the announcement, that the direct effect of discount rate changes on market rates is nil, that the announcement effect is invariant to the Federal Reserve''s operating procedure and that, generally speaking, changes in the discount rate do not signal a change in monetary policy. The announcement effect appears to vary with both the nature and extent of the information that the announcement of a discount rate change is believed to contain. (C) 1998 Elsevier Science B.V. All rights reserved.', 1998, 'http://dx.doi.org/10.1016/S0378-4266(97)00049-6'),

('Rosa, Carlo', 'The Impact of Monetary Policy on REITs: Evidence from FOMC Announcements', 'JOURNAL OF REAL ESTATE FINANCE AND ECONOMICS', 'This paper examines the response of equity and mortgage REITs to changes in the stance of monetary policy using an event study with intraday data. Monetary news around Federal Reserve''s announcements are decomposed into three types of surprise: changes in the current federal funds target rate, forward guidance and large-scale asset purchases. Estimation results show that monetary surprises have economically important and significantly negative effects on equity REITs. Around monetary announcements equity REIT returns are mostly spanned by US common stocks, while mortgage REITs maintain some distinct exposure to interest rate risks.', 2024, 'http://dx.doi.org/10.1007/s11146-024-09992-1'),

('Ludvigson, Sydney C.', 'Market Reactions to the Federal Reserve''s Balance Sheet Normalization Plans', 'BROOKINGS PAPERS ON ECONOMIC ACTIVITY', 'This paper focuses on interpreting the stock market''s reactions to Federal Reserve announcements about its balance sheet normalization plans, applying the methodology developed with Francesco Bianchi and Sai Ma. The results indicate that the stock market declines after announcements, suggesting perceived inflexibility in statements about balance sheet normalization, but many of the large reactions to these announcements can be ascribed to forces that move the stock market but not the broader economy.', 2022, NULL),

('HARDOUVELIS, GA', 'MARKET PERCEPTIONS OF FEDERAL-RESERVE POLICY AND THE WEEKLY MONETARY ANNOUNCEMENTS', 'JOURNAL OF MONETARY ECONOMICS', NULL, 1984, 'http://dx.doi.org/10.1016/0304-3932(84)90061-8');
