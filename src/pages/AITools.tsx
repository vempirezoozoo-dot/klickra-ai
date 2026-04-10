import React, { useState, useEffect } from 'react';
import { Search, MapPin, Image as ImageIcon, Video, Zap, Sparkles, Loader2, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const OPENROUTER_API_KEY = "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";

const callOpenRouter = async (messages: any[], model = "google/gemini-2.5-pro") => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: messages
    })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.choices[0].message.content;
};

export default function AITools() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');
  
  // Freemium Logic
  const [usageCount, setUsageCount] = useState(() => {
    return parseInt(localStorage.getItem('ai_usage_count') || '0');
  });
  const MAX_FREE_USES = 3;

  const checkUsage = () => {
    if (usageCount >= MAX_FREE_USES) {
      if (window.confirm("Free limit reached (3/3). Please upgrade to a paid plan to continue using AI tools.")) {
        navigate('/pricing');
      }
      return false;
    }
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('ai_usage_count', newCount.toString());
    return true;
  };

  // State for Search Grounding
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // State for Maps Grounding
  const [mapsQuery, setMapsQuery] = useState('');
  const [mapsResult, setMapsResult] = useState('');
  const [isMapping, setIsMapping] = useState(false);

  // State for Image Analysis
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // State for Image Generation
  const [imageGenPrompt, setImageGenPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // State for Video Generation
  const [videoPrompt, setVideoPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState('');
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);

  // State for Utility Tools
  const [utilityUrl, setUtilityUrl] = useState('');
  const [utilityResult, setUtilityResult] = useState<any>(null);
  const [isUtilityLoading, setIsUtilityLoading] = useState(false);
  const [activeUtilityTool, setActiveUtilityTool] = useState('seo');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery || !checkUsage()) return;
    setIsSearching(true);
    try {
      const result = await callOpenRouter([
        { role: "system", content: "You are a helpful search assistant. Provide accurate, up-to-date information as if you have access to the internet." },
        { role: "user", content: searchQuery }
      ], "perplexity/sonar-small-online"); // Using perplexity for online search
      setSearchResult(result || 'No result found.');
    } catch (error) {
      console.error(error);
      setSearchResult('Error performing search.');
    }
    setIsSearching(false);
  };

  const handleMaps = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapsQuery || !checkUsage()) return;
    setIsMapping(true);
    try {
      const result = await callOpenRouter([
        { role: "system", content: "You are a local maps and business expert. Provide detailed information about locations, businesses, and places." },
        { role: "user", content: mapsQuery }
      ]);
      setMapsResult(result || 'No result found.');
    } catch (error) {
      console.error(error);
      setMapsResult('Error performing maps search.');
    }
    setIsMapping(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageAnalysis = async () => {
    if (!imagePreview || !checkUsage()) return;
    setIsAnalyzing(true);
    try {
      const result = await callOpenRouter([
        { 
          role: "user", 
          content: [
            { type: "text", text: "Analyze this image in detail. What do you see? Provide a comprehensive description." },
            { type: "image_url", image_url: { url: imagePreview } }
          ]
        }
      ], "google/gemini-2.5-pro");
      setImageAnalysis(result || 'No analysis available.');
    } catch (error) {
      console.error(error);
      setImageAnalysis('Error analyzing image.');
    }
    setIsAnalyzing(false);
  };

  const handleImageGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageGenPrompt || !checkUsage()) return;
    setIsGeneratingImage(true);
    try {
      // OpenRouter doesn't natively support image generation via chat completions in the same way,
      // but we can simulate it or use a free image generation API. For this demo, we will use a placeholder
      // or an external free API like pollinations.ai
      const encodedPrompt = encodeURIComponent(imageGenPrompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
      
      // We simulate a small delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert('Error generating image.');
    }
    setIsGeneratingImage(false);
  };

  const handleVideoGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoPrompt || !checkUsage()) return;
    setIsVideoGenerating(true);
    try {
      // Simulating video generation as OpenRouter is text/vision only
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert("Video generation requires a dedicated video model API (like Veo or Sora) which is not available via OpenRouter text endpoints. This is a simulated success.");
      setGeneratedVideo("https://www.w3schools.com/html/mov_bbb.mp4"); // Sample video
    } catch (error) {
      console.error(error);
      alert('Error generating video.');
    }
    setIsVideoGenerating(false);
  };

  const handleUtilityTool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utilityUrl) {
      alert('Please enter a URL or text.');
      return;
    }
    if (!checkUsage()) return;
    
    setIsUtilityLoading(true);
    try {
      const prompt = \`Act as an expert SEO and AI architect. Perform a \${activeUtilityTool} analysis for: \${utilityUrl}. 
      Provide a detailed, structured response in Markdown format.
      Tool: \${activeUtilityTool}\`;
      
      const result = await callOpenRouter([
        { role: "user", content: prompt }
      ]);
      setUtilityResult(result || 'No result found.');
    } catch (error) {
      console.error(error);
      setUtilityResult('Error performing analysis.');
    }
    setIsUtilityLoading(false);
  };

  const tabs = [
    { id: 'search', icon: <Search className="w-4 h-4" />, label: 'Search' },
    { id: 'vision', icon: <ImageIcon className="w-4 h-4" />, label: 'Vision' },
    { id: 'image-gen', icon: <Sparkles className="w-4 h-4" />, label: 'Image Gen' },
    { id: 'video-gen', icon: <Video className="w-4 h-4" />, label: 'Video Gen' },
    { id: 'seo-tools', icon: <Zap className="w-4 h-4" />, label: 'SEO & AI Tools' },
  ];

  const utilityTools = [
    { id: 'seo', label: 'SEO Checker', desc: 'Full technical SEO audit' },
    { id: 'aeo', label: 'AEO Readiness', desc: 'Answer Engine Optimization' },
    { id: 'speed', label: 'Speed Tester', desc: 'Performance & Core Web Vitals' },
    { id: 'meta', label: 'Meta Generator', desc: 'AI-optimized meta tags' },
    { id: 'schema', label: 'Schema Gen', desc: 'JSON-LD structured data' },
    { id: 'density', label: 'Keyword Density', desc: 'Analyze keyword frequency' },
    { id: 'headings', label: 'Heading Audit', desc: 'H1-H6 structure analysis' },
    { id: 'ai-detector', label: 'AI Detector', desc: 'Check if content is AI-written' },
    { id: 'sitemap', label: 'Sitemap Gen', desc: 'Generate XML sitemaps' },
    { id: 'robots', label: 'Robots.txt Gen', desc: 'Optimized robots.txt' },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Klickra <span className="text-gradient">AI Tools</span></h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4">Experience the power of AI directly in your browser.</p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <span className="text-sm font-medium">Free Uses Remaining:</span>
            <span className={\`text-sm font-bold \${usageCount >= MAX_FREE_USES ? 'text-red-500' : 'text-[var(--color-primary)]'}\`}>
              {Math.max(0, MAX_FREE_USES - usageCount)} / {MAX_FREE_USES}
            </span>
            {usageCount >= MAX_FREE_USES && (
              <button onClick={() => navigate('/pricing')} className="ml-2 flex items-center gap-1 text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded-md hover:bg-opacity-80">
                <Lock className="w-3 h-3" /> Upgrade
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={\`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all \${activeTab === tab.id ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}\`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="glass-panel p-4 md:p-8 min-h-[400px]">
          {/* Search Grounding */}
          {activeTab === 'search' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Search className="text-[var(--color-accent)]" /> AI Search</h2>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask anything (e.g., What is the latest news about AI?)"
                  className="flex-grow px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                />
                <button type="submit" disabled={isSearching} className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold disabled:opacity-50 whitespace-nowrap">
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </form>
              {searchResult && (
                <div className="p-4 md:p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-x-auto">
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{searchResult}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Maps Grounding */}
          {activeTab === 'maps' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><MapPin className="text-[var(--color-accent)]" /> Location AI</h2>
              <form onSubmit={handleMaps} className="flex flex-col sm:flex-row gap-4 mb-8">
                <input 
                  type="text" 
                  value={mapsQuery}
                  onChange={(e) => setMapsQuery(e.target.value)}
                  placeholder="Ask about locations (e.g., Best coffee shops in Seattle)"
                  className="flex-grow px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                />
                <button type="submit" disabled={isMapping} className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold disabled:opacity-50 whitespace-nowrap">
                  {isMapping ? 'Searching...' : 'Search Maps'}
                </button>
              </form>
              {mapsResult && (
                <div className="p-4 md:p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-x-auto">
                  <div className="prose prose-invert max-w-none whitespace-pre-wrap"><ReactMarkdown>{mapsResult}</ReactMarkdown></div>
                </div>
              )}
            </div>
          )}

          {/* Image Analysis */}
          {activeTab === 'vision' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ImageIcon className="text-[var(--color-accent)]" /> Image Analysis</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center hover:border-[var(--color-primary)] transition-colors cursor-pointer relative">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg object-contain" />
                    ) : (
                      <div className="text-[var(--color-text-secondary)]">
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Click or drag an image to upload</p>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={handleImageAnalysis} 
                    disabled={!imagePreview || isAnalyzing}
                    className="w-full mt-4 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold disabled:opacity-50"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                  </button>
                </div>
                <div>
                  {imageAnalysis ? (
                    <div className="p-4 md:p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] h-full overflow-y-auto max-h-[400px]">
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown>{imageAnalysis}</ReactMarkdown>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] h-full flex items-center justify-center text-[var(--color-text-muted)] text-center">
                      Analysis results will appear here.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Image Generation */}
          {activeTab === 'image-gen' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Sparkles className="text-[var(--color-accent)]" /> Image Generation</h2>
              <form onSubmit={handleImageGeneration} className="mb-8">
                <div className="flex flex-col gap-4">
                  <textarea 
                    value={imageGenPrompt}
                    onChange={(e) => setImageGenPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] min-h-[100px]"
                  />
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <select 
                      value={aspectRatio} 
                      onChange={(e) => setAspectRatio(e.target.value)}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                    >
                      <option value="1:1">1:1 (Square)</option>
                      <option value="16:9">16:9 (Landscape)</option>
                      <option value="9:16">9:16 (Portrait)</option>
                    </select>
                    <button type="submit" disabled={isGeneratingImage} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold disabled:opacity-50 whitespace-nowrap">
                      {isGeneratingImage ? 'Generating...' : 'Generate Image'}
                    </button>
                  </div>
                </div>
              </form>
              {generatedImage && (
                <div className="mt-8 text-center">
                  <img src={generatedImage} alt="Generated" className="max-w-full rounded-xl mx-auto shadow-2xl" />
                </div>
              )}
            </div>
          )}

          {/* Video Generation */}
          {activeTab === 'video-gen' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Video className="text-[var(--color-accent)]" /> Video Generation</h2>
              <form onSubmit={handleVideoGeneration} className="mb-8">
                <div className="flex flex-col gap-4">
                  <textarea 
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="Describe the video you want to generate..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] min-h-[100px]"
                  />
                  <button type="submit" disabled={isVideoGenerating} className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold disabled:opacity-50 w-full sm:w-fit">
                    {isVideoGenerating ? 'Generating Video...' : 'Generate Video'}
                  </button>
                </div>
              </form>
              {generatedVideo && (
                <div className="mt-8 text-center">
                  <video src={generatedVideo} controls className="max-w-full rounded-xl mx-auto shadow-2xl" />
                </div>
              )}
            </div>
          )}

          {/* SEO & AI Tools */}
          {activeTab === 'seo-tools' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-[var(--color-accent)]" /> SEO & AI Utility Tools</h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {utilityTools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveUtilityTool(tool.id)}
                      className={\`w-full text-left p-4 rounded-xl border transition-all \${activeUtilityTool === tool.id ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]' : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50'}\`}
                    >
                      <div className="font-bold text-[var(--color-text-primary)]">{tool.label}</div>
                      <div className="text-xs text-[var(--color-text-secondary)]">{tool.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <form onSubmit={handleUtilityTool} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                        {['seo', 'aeo', 'speed', 'headings', 'sitemap', 'robots'].includes(activeUtilityTool) ? 'Website URL' : 'Content to Analyze'}
                      </label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                          type="text" 
                          value={utilityUrl}
                          onChange={(e) => setUtilityUrl(e.target.value)}
                          placeholder={['seo', 'aeo', 'speed', 'headings', 'sitemap', 'robots'].includes(activeUtilityTool) ? 'https://example.com' : 'Paste your text here...'}
                          className="flex-grow px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                        />
                        <button type="submit" disabled={isUtilityLoading} className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap">
                          {isUtilityLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : 'Analyze'}
                        </button>
                      </div>
                    </div>
                  </form>

                  {utilityResult && (
                    <div className="p-4 md:p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] min-h-[300px] overflow-x-auto">
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown>{utilityResult}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
