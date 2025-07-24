module.exports = {

"[externals]/util [external] (util, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// // 'use client';
// // import { useState, useRef } from 'react';
// // import {
// //   generateUI,
// //   generateUIStream,
// //   saveTemplate,
// //   fetchAnalytics
// // } from '@/lib/api';
// // import HtmlPreview from '@/components/HtmlPreview';
// // import FeedbackModal from '@/components/FeedbackModal';
// // import { v4 as uuid } from 'uuid';
// // export default function Home() {
// //   const [command, setCommand] = useState('');
// //   const [html, setHtml] = useState('');
// //   const [templateId, setTemplateId] = useState('');
// //   const [status, setStatus] = useState<string | null>(null);
// //   const [validation, setValidation] = useState<any>(null);
// //   const [showFeedback, setShowFeedback] = useState(false);
// //   const [analytics, setAnalytics] = useState<any>(null);
// //   const wsRef = useRef<WebSocket>();
// //   async function handleGenerate() {
// //     if (!command.trim()) return;
// //     setStatus('Generating …');
// //     setValidation(null);
// //     try {
// //       const res = await generateUI(command);
// //       setHtml(res.html);
// //       setTemplateId(res.template_id);
// //       setValidation(res.validation);
// //       setStatus(`Done in ${(res.processing_time || 0).toFixed(2)}s`);
// //     } catch (e) {
// //       setStatus((e as Error).message);
// //     }
// //   }
// //   function handleGenerateRealtime() {
// //     if (!command.trim()) return;
// //     const sessionId = uuid();
// //     setHtml('');
// //     setStatus('Opening WebSocket …');
// //     wsRef.current?.close();
// //     wsRef.current = generateUIStream(
// //       command,
// //       sessionId,
// //       msg => {
// //         switch (msg.type) {
// //           case 'status':
// //             setStatus(msg.message);
// //             break;
// //           case 'validation':
// //             setValidation(msg);
// //             break;
// //           case 'result':
// //             setHtml(msg.html);
// //             setTemplateId(msg.template_id);
// //             setStatus(`Done in ${(msg.processing_time || 0).toFixed(2)}s`);
// //             wsRef.current?.close();
// //             break;
// //           case 'error':
// //             setStatus(msg.message);
// //             wsRef.current?.close();
// //             break;
// //         }
// //       },
// //       err => {
// //         setStatus('WS error');
// //         console.error(err);
// //       }
// //     );
// //   }
// //   async function handleSave() {
// //     try {
// //       const res = await saveTemplate({
// //         html,
// //         parent_template_id: templateId,
// //         user: 'demo-user',
// //         confidence_score: validation?.confidence_score?.overall
// //       });
// //       alert(`saved as ${res.template_id}`);
// //     } catch (e) {
// //       alert((e as Error).message);
// //     }
// //   }
// //   async function loadAnalytics() {
// //     try {
// //       const data = await fetchAnalytics();
// //       setAnalytics(data);
// //     } catch (e) {
// //       alert((e as Error).message);
// //     }
// //   }
// //   return (
// //     <div className="min-h-screen flex flex-col gap-6 p-6">
// //       <h1 className="text-3xl font-bold">AI Web-Block Generator (Next JS)</h1>
// //       <textarea
// //         value={command}
// //         onChange={e => setCommand(e.target.value)}
// //         placeholder="Describe the component you need …"
// //         rows={3}
// //         className="border p-2 w-full"
// //       />
// //       <div className="flex gap-3">
// //         <button className="btn-primary" onClick={handleGenerate}>
// //           Generate (simple)
// //         </button>
// //         <button className="btn" onClick={handleGenerateRealtime}>
// //           Generate (real-time WS)
// //         </button>
// //         <button className="btn" disabled={!html} onClick={handleSave}>
// //           Save template
// //         </button>
// //         <button
// //           className="btn"
// //           disabled={!templateId}
// //           onClick={() => setShowFeedback(true)}
// //         >
// //           Feedback
// //         </button>
// //         <button className="btn" onClick={loadAnalytics}>
// //           Analytics
// //         </button>
// //       </div>
// //       {status && <p className="italic">{status}</p>}
// //       {validation && (
// //         <div className="border p-2 rounded bg-gray-50 text-sm">
// //           Verification: {validation.is_verified ? '✅' : '⚠️'} – confidence{' '}
// //           {(validation.confidence_score?.overall || 0).toFixed(2)} <br />
// //           {validation.warnings?.length > 0 && (
// //             <span className="text-red-700">
// //               {validation.warnings.join(', ')}
// //             </span>
// //           )}
// //         </div>
// //       )}
// //       {html && <HtmlPreview html={html} />}
// //       {analytics && (
// //         <pre className="bg-black text-white p-3 rounded overflow-auto">
// //           {JSON.stringify(analytics, null, 2)}
// //         </pre>
// //       )}
// //       {showFeedback && templateId && (
// //         <FeedbackModal
// //           templateId={templateId}
// //           onClose={() => setShowFeedback(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }
// 'use client';
// import { useState, useRef } from 'react';
// import {
//   generateUI,
//   generateUIStream,
//   generateUIFromImage,
//   saveTemplate,
//   fetchAnalytics
// } from '@/lib/api';
// import HtmlPreview from '@/components/HtmlPreview';
// import FeedbackModal from '@/components/FeedbackModal';
// import ImagePicker from '@/components/ImagePicker';
// import { v4 as uuid } from 'uuid';
// export default function Home() {
//   /* -------------- state -------------- */
//   const [command, setCommand] = useState('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [html, setHtml] = useState('');
//   const [templateId, setTemplateId] = useState('');
//   const [status, setStatus] = useState<string | null>(null);
//   const [validation, setValidation] = useState<any>(null);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [analytics, setAnalytics] = useState<any>(null);
//   const wsRef = useRef<WebSocket>();
//   /* -------------- actions -------------- */
//   async function handleGenerate() {
//     if (!command.trim()) return;
//     setStatus('Generating …');
//     setValidation(null);
//     try {
//       const res = await generateUI(command);
//       afterGenerate(res);
//     } catch (e) {
//       setStatus((e as Error).message);
//     }
//   }
//   async function handleGenerateFromImg() {
//     if (!imageFile) {
//       alert('Select an image first');
//       return;
//     }
//     setStatus('Uploading screenshot …');
//     setValidation(null);
//     try {
//       const res = await generateUIFromImage(imageFile, command);
//       afterGenerate(res);
//     } catch (e) {
//       setStatus((e as Error).message);
//     }
//   }
//   /* still keeps the WebSocket option for text-only */
//   function handleGenerateRealtime() { /* … unchanged … */ }
//   function afterGenerate(res: any) {
//     setHtml(res.html);
//     setTemplateId(res.template_id);
//     setValidation(res.validation);
//     setStatus(`Done in ${(res.processing_time || 0).toFixed(2)}s`);
//   }
//   async function handleSave() { /* unchanged */ }
//   async function loadAnalytics() { /* unchanged */ }
//   /* -------------- UI -------------- */
//   return (
//     <div className="min-h-screen flex flex-col gap-6 p-6">
//       <h1 className="text-3xl font-bold">
//         AI Web-Block Generator (image + text)
//       </h1>
//       <textarea
//         value={command}
//         onChange={e => setCommand(e.target.value)}
//         placeholder="Describe the component (optional)…"
//         rows={3}
//         className="border p-2 w-full"
//       />
//       <ImagePicker onSelect={setImageFile} />
//       <div className="flex gap-3 flex-wrap">
//         <button className="btn-primary" onClick={handleGenerate}>
//           Generate (text only)
//         </button>
//         <button
//           className="btn-primary"
//           disabled={!imageFile}
//           onClick={handleGenerateFromImg}
//         >
//           Generate (image)
//         </button>
//         <button className="btn" onClick={handleGenerateRealtime}>
//           Generate (real-time WS)
//         </button>
//         <button className="btn" disabled={!html} onClick={handleSave}>
//           Save template
//         </button>
//         <button
//           className="btn"
//           disabled={!templateId}
//           onClick={() => setShowFeedback(true)}
//         >
//           Feedback
//         </button>
//         <button className="btn" onClick={loadAnalytics}>
//           Analytics
//         </button>
//       </div>
//       {status && <p className="italic">{status}</p>}
//       {validation && (
//         <div className="border p-2 rounded bg-gray-50 text-sm">
//           Verification: {validation.is_verified ? '✅' : '⚠️'} – confidence{' '}
//           {(validation.confidence_score?.overall || 0).toFixed(2)}
//           {validation.warnings?.length > 0 && (
//             <span className="text-red-700">
//               {' '}
//               – {validation.warnings.join(', ')}
//             </span>
//           )}
//         </div>
//       )}
//       {html && <HtmlPreview html={html} />}
//       {analytics && (
//         <pre className="bg-black text-white p-3 rounded overflow-auto">
//           {JSON.stringify(analytics, null, 2)}
//         </pre>
//       )}
//       {showFeedback && templateId && (
//         <FeedbackModal
//           templateId={templateId}
//           onClose={() => setShowFeedback(false)}
//         />
//       )}
//     </div>
//   );
// }
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm/v4.js [app-ssr] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const Home = ()=>{
    const [command, setCommand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [htmlOutput, setHtmlOutput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [templateId, setTemplateId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [confidence, setConfidence] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVerified, setIsVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isHelpful, setIsHelpful] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedbackComment, setFeedbackComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [userId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])()); // Generate unique user ID
    const previewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle form submission to generate UI
    const handleGenerate = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setHtmlOutput('');
        setConfidence(null);
        setIsVerified(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('http://127.0.0.1:5000/generate-ui', {
                command,
                user_id: userId
            });
            setHtmlOutput(response.data.html);
            setTemplateId(response.data.template_id);
            setConfidence(response.data.confidence);
            setIsVerified(response.data.verified);
        } catch (err) {
            setError('Failed to generate UI. Please try again.');
            console.error(err);
        } finally{
            setIsLoading(false);
        }
    };
    // Handle save UI
    const handleSave = async ()=>{
        if (!htmlOutput || !templateId) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('http://127.0.0.1:5000/save-ui', {
                html: htmlOutput,
                parent_template_id: templateId,
                user: userId,
                feedback: isHelpful
            });
            alert(response.data.message);
        } catch (err) {
            setError('Failed to save template. Please try again.');
            console.error(err);
        }
    };
    // Handle feedback submission
    const handleFeedback = async (helpful)=>{
        setIsHelpful(helpful);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('http://127.0.0.1:5000/feedback', {
                template_id: templateId,
                user_id: userId,
                is_helpful: helpful,
                comments: feedbackComment
            });
            alert(response.data.message);
        } catch (err) {
            setError('Failed to submit feedback. Please try again.');
            console.error(err);
        }
    };
    // Render HTML preview
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (previewRef.current && htmlOutput) {
            previewRef.current.innerHTML = htmlOutput;
        }
    }, [
        htmlOutput
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-100 flex flex-col items-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6 text-gray-800",
                children: "AI UI Block Generator"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleGenerate,
                className: "w-full max-w-2xl mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            className: "w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                            rows: 4,
                            value: command,
                            onChange: (e)=>setCommand(e.target.value),
                            placeholder: "Enter UI command (e.g., 'Create a modern contact form with name, email, and message fields')"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isLoading,
                            className: "bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "animate-spin h-5 w-5 mr-2",
                                        viewBox: "0 0 24 24",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                className: "opacity-25",
                                                cx: "12",
                                                cy: "12",
                                                r: "10",
                                                stroke: "currentColor",
                                                strokeWidth: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 438,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                className: "opacity-75",
                                                fill: "currentColor",
                                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 437,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Generating..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 436,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : 'Generate UI'
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 430,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 422,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 421,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    className: "bg-red-100 text-red-700 p-4 rounded-lg mb-6 w-full max-w-2xl",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 453,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 451,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            (confidence !== null || isVerified !== null) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded-lg shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-600",
                            children: [
                                "Confidence Score: ",
                                (confidence ?? 0).toFixed(2),
                                " (",
                                isVerified ? 'Verified' : 'Unverified',
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 468,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        !isVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-yellow-600",
                            children: "This output may need review due to low confidence."
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 472,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 467,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 466,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            htmlOutput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold mb-2",
                        children: "Preview"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 481,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: previewRef,
                        className: "bg-white p-4 border rounded-lg shadow-sm overflow-auto",
                        style: {
                            minHeight: '200px'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 482,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex space-x-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            className: "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600",
                            children: "Save Template"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 488,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 487,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 480,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            htmlOutput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold mb-2",
                        children: "Feedback"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 501,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-4 rounded-lg shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2",
                                children: "Was this output helpful?"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleFeedback(true),
                                        className: `px-4 py-2 rounded-lg ${isHelpful === true ? 'bg-green-500 text-white' : 'bg-gray-200'}`,
                                        children: "👍 Thumbs Up"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 505,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleFeedback(false),
                                        className: `px-4 py-2 rounded-lg ${isHelpful === false ? 'bg-red-500 text-white' : 'bg-gray-200'}`,
                                        children: "👎 Thumbs Down"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                className: "w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                                rows: 3,
                                value: feedbackComment,
                                onChange: (e)=>setFeedbackComment(e.target.value),
                                placeholder: "Optional: Add comments about the output..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 522,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 500,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 417,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Home;
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__9b8886f1._.js.map