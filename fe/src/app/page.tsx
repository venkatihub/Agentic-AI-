// "use client";

// import { useState } from "react";
// import axios from "axios";
// import io from "socket.io-client";
// import { motion } from "framer-motion";
// import { UIGeneratorAPI } from "@/lib/api";

// export default function Home() {
//   const [command, setCommand] = useState("");
//   const [userId] = useState("default-user"); // Replace with auth logic
//   const [generatedHtml, setGeneratedHtml] = useState("");
//   const [templateId, setTemplateId] = useState("");
//   const [changeQuery, setChangeQuery] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

//   // Remove socket logic for update UI (V0-like editing is now via REST)

//   const handleGenerate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setGeneratedHtml("");
//     try {
//       if (imageFile) {
//         const prompt = `Based on this image, I want a UI: ${command}`;
//         const res = await UIGeneratorAPI.generateUIFromImage(imageFile, prompt, userId);
//         setGeneratedHtml(res.html);
//         console.log('Generated HTML from image:', res.html);
//       } else {
//         const res = await UIGeneratorAPI.generateUIFromPrompt(command);
//         setGeneratedHtml(res.html);
//         if (res.template_id) setTemplateId(res.template_id);
//         console.log('Generated HTML from prompt:', res.html);
//       }
//     } catch (error) {
//       console.error("Error generating UI:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveUI = async (feedback: boolean) => {
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save-ui`, {
//         html: generatedHtml,
//         parent_template_id: templateId,
//         user: userId,
//         feedback,
//       });
//       alert("UI saved successfully!");
//     } catch (error) {
//       console.error("Error saving UI:", error);
//     }
//   };

//   const handleUpdateUI = async () => {
//     if (!changeQuery.trim() || !generatedHtml) return;
//     try {
//       const res = await UIGeneratorAPI.updateUI({
//         current_html: generatedHtml,
//         change_query: changeQuery,
//         user_id: userId,
//       });
//       setGeneratedHtml(res.updated_html);
//       setChangeQuery(""); // Clear after update
//     } catch (error) {
//       console.error("Error updating UI:", error);
//     }
//   };

//   const handleGenerateFromImage = async () => {
//     if (!imageFile) return;
//     try {
//       const res = await UIGeneratorAPI.generateUIFromImage(imageFile, command, userId);
//       setGeneratedHtml(res.html);
//     } catch (error) {
//       console.error("Error generating UI from image:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-ai-gradient text-black flex flex-col items-center justify-center p-8">
//       <motion.h1
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="text-4xl font-bold mb-8"
//       >
//         Agentic AI UI Generator
//       </motion.h1>

//       <form
//         onSubmit={handleGenerate}
//         className="w-full max-w-lg"
//       >
//         <input
//           type="text"
//           value={command}
//           onChange={(e) => setCommand(e.target.value)}
//           placeholder="Describe your UI (e.g., responsive contact form)"
//           className="w-full p-4 rounded-lg bg-ai-primary text-black border border-ai-accent mb-4"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={e => setImageFile(e.target.files?.[0] || null)}
//           className="mb-2"
//         />
//         <button
//           type="submit"
//           className={`bg-ai-accent text-black p-4 rounded-lg w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={loading}
//         >
//           {loading ? "Generating UI..." : "Generate UI"}
//         </button>
//       </form>

//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         className="mt-8 w-full max-w-4xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 rounded-2xl shadow-2xl border-2 border-blue-200"
//       >
//         <h2 className="text-2xl mb-4 text-blue-700 font-bold">Live UI Generator</h2>
//         {/* Tabs */}
//         <div className="flex space-x-2 mb-4">
//           <button
//             className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 focus:outline-none ${activeTab === 'preview' ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg' : 'bg-white text-blue-700 border-b-2 border-blue-400'}`}
//             onClick={() => setActiveTab('preview')}
//           >
//             Preview
//           </button>
//           <button
//             className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 focus:outline-none ${activeTab === 'code' ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg' : 'bg-white text-pink-700 border-b-2 border-pink-400'}`}
//             onClick={() => setActiveTab('code')}
//           >
//             Code
//           </button>
//         </div>
//         {loading && (
//           <div className="flex items-center justify-center min-h-[200px]">
//             <svg className="animate-spin h-8 w-8 text-ai-accent" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//             </svg>
//             <span className="ml-4 text-ai-accent">Generating UI...</span>
//           </div>
//         )}
//         {!loading && generatedHtml && (
//           <div className="bg-white rounded-b-2xl p-4 min-h-[350px] border-t-0 border-2 border-blue-200">
//             {activeTab === 'preview' ? (
//               <div className="border rounded-lg overflow-hidden bg-white min-h-[350px]">
//                 <iframe
//                   srcDoc={generatedHtml}
//                   className="w-full h-full min-h-[350px]"
//                   title="UI Preview"
//                   sandbox="allow-same-origin"
//                 />
//               </div>
//             ) : (
//               <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto max-h-96 text-sm shadow-inner border border-gray-700">
//                 {generatedHtml}
//               </pre>
//             )}
//           </div>
//         )}
//       </motion.div>

//       {generatedHtml && (
//         <div className="mt-4 flex flex-col space-y-2 w-full max-w-lg">
//           <input
//             type="text"
//             value={changeQuery}
//             onChange={(e) => setChangeQuery(e.target.value)}
//             placeholder="Describe a change (e.g., Make the button blue)"
//             className="w-full p-2 rounded border-2 border-purple-400 text-black focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
//           />
//           <button
//             onClick={handleUpdateUI}
//             className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded shadow-md hover:from-blue-600 hover:to-purple-600 transition"
//           >
//             Update UI
//           </button>
//           <button
//             onClick={() => saveUI(true)}
//             className="bg-gradient-to-r from-green-400 to-blue-400 text-white p-2 rounded shadow-md hover:from-green-500 hover:to-blue-500 transition"
//           >
//             Save with Positive Feedback
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  Sparkles,
  Code,
  Eye,
  Upload,
  Wand2,
  Save,
  RefreshCw,
  Menu,
  X,
  Zap,
  Star,
  Download,
} from "lucide-react";
import { UIGeneratorAPI } from "@/lib/api";
import axios from "axios";

export default function Home() {
  const [command, setCommand] = useState("");
  const [userId] = useState("default-user");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [changeQuery, setChangeQuery] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedHtml("");
    try {
      if (imageFile) {
        const prompt = `Based on this image, I want a UI: ${command}`;
        const res = await UIGeneratorAPI.generateUIFromImage(
          imageFile,
          prompt,
          userId
        );
        setGeneratedHtml(res.html);
        console.log("Generated HTML from image:", res.html);
      } else {
        const res = await UIGeneratorAPI.generateUIFromPrompt(command, userId);
        setGeneratedHtml(res.html);
        if (res.template_id) setTemplateId(res.template_id);
        console.log("Generated HTML from prompt:", res.html);
      }
    } catch (error) {
      console.error("Error generating UI:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveUI = async (feedback: boolean) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/save-ui`, {
        html: generatedHtml,
        parent_template_id: templateId,
        user: userId,
        feedback,
      });
      alert("UI saved successfully!");
    } catch (error) {
      console.error("Error saving UI:", error);
    }
  };

  const handleUpdateUI = async () => {
    setUpdateLoading(true);
    if (!changeQuery.trim() || !generatedHtml) return;
    try {
      const res = await UIGeneratorAPI.updateUI({
        current_html: generatedHtml,
        change_query: changeQuery,
        user_id: userId,
      });
      setGeneratedHtml(res.updated_html);
      setChangeQuery(""); // Clear after update
      setUpdateLoading(false);
    } catch (error) {
      setUpdateLoading(false);
      console.error("Error updating UI:", error);
    }
  };

  const handleGenerateFromImage = async () => {
    if (!imageFile) return;
    try {
      const res = await UIGeneratorAPI.generateUIFromImage(
        imageFile,
        command,
        userId
      );
      setGeneratedHtml(res.html);
    } catch (error) {
      console.error("Error generating UI from image:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center  space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Agentic AI UI Generator
                </h1>
                <p className="text-xs text-slate-400">Powered by AI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#"
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Docs
              </a>
              <a
                href="#"
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Examples
              </a>
              <a
                href="#"
                className="block text-slate-300 hover:text-white transition-colors"
              >
                API
              </a>
              <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
          {/* Left Column - Preview/Code */}
          <div className="flex-1">
            {(generatedHtml || loading) && (
              <div className="w-full">
                <div className="backdrop-blur-xl bg-slate-900/50 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
                  {/* Tabs */}
                  <div className="border-b border-slate-700/50 flex bg-slate-800/30">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={`flex-1 py-4 text-lg font-medium flex items-center justify-center gap-3 transition-all duration-300 ${
                        activeTab === "preview"
                          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-b-2 border-blue-400"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/30"
                      }`}
                    >
                      <Eye className="w-5 h-5" />
                      Preview
                    </button>
                    <button
                      onClick={() => setActiveTab("code")}
                      className={`flex-1 py-4 text-lg font-medium flex items-center justify-center gap-3 transition-all duration-300 ${
                        activeTab === "code"
                          ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-b-2 border-purple-400"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/30"
                      }`}
                    >
                      <Code className="w-5 h-5" />
                      Code
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-8 bg-slate-950/30">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-24">
                        <div className="relative mb-8">
                          <div className="w-16 h-16 border-4 border-slate-700 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-semibold text-white mb-2">
                            Generating your UI...
                          </h3>
                          <p className="text-slate-400">
                            This usually takes a few seconds
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {activeTab === "preview" ? (
                          <div className="relative h-full">
                            <div className="border border-slate-600/50 rounded-xl overflow-hidden bg-white shadow-2xl h-full">
                              <iframe
                                srcDoc={generatedHtml}
                                className="w-full h-full bg-white"
                                title="UI Preview"
                                sandbox="allow-same-origin"
                                style={{ minHeight: "600px" }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="relative h-full">
                            <pre className="bg-slate-900/80 text-green-400 p-6 rounded-xl overflow-x-auto text-sm font-mono border border-slate-700/50 shadow-inner h-full">
                              {generatedHtml}
                            </pre>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Controls & Options */}
          <div className="w-full lg:w-96">
            {generatedHtml && !loading && (
              <div className="backdrop-blur-xl bg-slate-900/50 rounded-2xl shadow-xl border border-slate-700/50 p-8 sticky top-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Wand2 className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">
                    Refine Your UI
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={changeQuery}
                    onChange={(e) => setChangeQuery(e.target.value)}
                    placeholder="Describe changes..."
                    className="w-full px-6 py-4 border border-slate-600/50 rounded-xl bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                  />
                  <button
                    onClick={handleUpdateUI}
                    disabled={!changeQuery.trim() || updateLoading}
                    className="flex text-center justify-center gap-1.5 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                  >
                    {updateLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Update</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => saveUI(true)}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Input Bar at Bottom */}
      {generatedHtml == "" && (
        <form
          onSubmit={handleGenerate}
          className="fixed bottom-0 left-0 w-full  z-50"
          // style={{ boxShadow: "0 -8px 32px 0 rgba(0,0,0,0.3)" }}
        >
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 transition-all duration-200 backdrop-blur-sm border border-slate-700/50 group"
              title="Upload reference image"
            >
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
            />

            <div className="flex-1 relative">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Describe your UI (e.g., 'Modern login form with logo')"
                className="w-full px-6 py-4 text-lg border border-slate-700/50 rounded-xl bg-slate-800/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm pr-4"
              />
              {imageFile && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-green-400 font-medium">
                      IMG
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !command.trim()}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl min-w-[140px] justify-center"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
