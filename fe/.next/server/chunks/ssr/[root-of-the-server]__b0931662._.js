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
"[externals]/child_process [external] (child_process, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

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
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Home() {
    const [command, setCommand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [userId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("default-user"); // Replace with auth logic
    const [generatedHtml, setGeneratedHtml] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [templateId, setTemplateId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function initializeSocket() {
            const newSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(("TURBOPACK compile-time value", "http://localhost:5000") || "http://127.0.0.1:5000");
            setSocket(newSocket);
            newSocket.on("ui-update", (data)=>{
                setGeneratedHtml(data.html);
                setTemplateId(data.template_id);
            });
            return ()=>newSocket.close();
        }
        initializeSocket();
    }, []);
    const generateUI = async ()=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "http://localhost:5000")}/generate-ui`, {
                command,
                user_id: userId
            });
            setGeneratedHtml(res.data.html);
            setTemplateId(res.data.template_id);
        } catch (error) {
            console.error("Error generating UI:", error);
        }
    };
    const saveUI = async (feedback)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "http://localhost:5000")}/save-ui`, {
                html: generatedHtml,
                parent_template_id: templateId,
                user: userId,
                feedback
            });
            alert("UI saved successfully!");
        } catch (error) {
            console.error("Error saving UI:", error);
        }
    };
    const updateUI = ()=>{
        if (socket) socket.emit("update-command", {
            command
        }); // Trigger backend update
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-ai-gradient text-white flex flex-col items-center justify-center p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h1, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                className: "text-4xl font-bold mb-8",
                children: "Agentic AI UI Generator"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: (e)=>{
                    e.preventDefault();
                    generateUI();
                },
                className: "w-full max-w-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: command,
                        onChange: (e)=>setCommand(e.target.value),
                        placeholder: "e.g., Generate a responsive contact form",
                        className: "w-full p-4 rounded-lg bg-ai-primary text-white border border-ai-accent mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 394,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "bg-ai-accent text-white p-4 rounded-lg w-full",
                        children: "Generate UI"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 401,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.9
                },
                animate: {
                    scale: 1
                },
                className: "mt-8 w-full max-w-4xl bg-ai-primary p-6 rounded-lg shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl mb-4",
                        children: "Live Preview"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        dangerouslySetInnerHTML: {
                            __html: generatedHtml
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 415,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this),
            generatedHtml && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex space-x-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: updateUI,
                        className: "bg-ai-accent text-white p-2 rounded",
                        children: "Update UI"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 420,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>saveUI(true),
                        className: "bg-green-500 text-white p-2 rounded",
                        children: "Save with Positive Feedback"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 426,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 419,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 378,
        columnNumber: 5
    }, this);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__b0931662._.js.map