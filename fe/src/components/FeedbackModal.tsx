// 'use client';
// import React, { useState } from 'react';
// import { submitFeedback } from '@/lib/api';

// interface Props {
//   templateId: string;
//   onClose: () => void;
// }

// export default function FeedbackModal({ templateId, onClose }: Props) {
//   const [rating, setRating] = useState(3);
//   const [text, setText] = useState('');
//   const [helpful, setHelpful] = useState(true);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit() {
//     try {
//       setLoading(true);
//       await submitFeedback({
//         template_id: templateId,
//         user_id: 'demo-user',
//         rating,
//         feedback_text: text,
//         is_helpful: helpful
//       });
//       onClose();
//     } catch (e) {
//       alert((e as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded w-96 space-y-4">
//         <h2 className="font-semibold text-lg">Give feedback</h2>

//         <label className="block">
//           Rating (1-5):
//           <input
//             type="number"
//             min={1}
//             max={5}
//             value={rating}
//             onChange={e => setRating(Number(e.target.value))}
//             className="border ml-2 px-1 w-16"
//           />
//         </label>

//         <label className="block">
//           Helpful?
//           <input
//             type="checkbox"
//             className="ml-2"
//             checked={helpful}
//             onChange={e => setHelpful(e.target.checked)}
//           />
//         </label>

//         <textarea
//           placeholder="Optional comments…"
//           value={text}
//           onChange={e => setText(e.target.value)}
//           className="w-full border p-2 h-24"
//         />

//         <div className="flex justify-end gap-2">
//           <button className="btn" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="btn-primary"
//             disabled={loading}
//             onClick={handleSubmit}
//           >
//             {loading ? 'Sending…' : 'Submit'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
