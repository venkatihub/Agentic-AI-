// /* eslint-disable @typescript-eslint/no-expliciT-any */
// const API = process.env.NEXT_PUBLIC_API_URL;

// export async function generateUI(
//   command: string,
//   sessionId?: string
// ): Promise<any> {
//   const res = await fetch(`${API}/generate-ui`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       command,
//       session_id: sessionId,
//       require_verification: true,
//       stream_response: false
//     })
//   });

//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// export function generateUIStream(
//   command: string,
//   sessionId: string,
//   onMessage: (msg: any) => void,
//   onError?: (e: any) => void
// ) {
//   const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/${sessionId}`);

//   ws.onopen = () =>
//     ws.send(JSON.stringify({ type: 'generate_ui', command }));

//   ws.onmessage = evt => {
//     try {
//       onMessage(JSON.parse(evt.data));
//     } catch {
//       /* swallow JSON parse errors */
//     }
//   };

//   ws.onerror = onError ?? (() => {});
//   return ws; // caller may close it
// }

// export async function saveTemplate(payload: {
//   html: string;
//   parent_template_id: string;
//   user: string;
//   confidence_score?: number;
//   feedback_rating?: number;
// }) {
//   const res = await fetch(`${API}/save-ui`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// export async function submitFeedback(payload: {
//   template_id: string;
//   user_id: string;
//   rating: number;
//   feedback_text?: string;
//   is_helpful: boolean;
// }) {
//   const res = await fetch(`${API}/feedback`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// export async function fetchAnalytics() {
//   const res = await fetch(`${API}/analytics`);
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }


// export async function generateUIFromImage(
//   image: File,
//   command = '',
//   sessionId?: string
// ): Promise<any> {
//   const fd = new FormData();
//   fd.append('image', image);
//   fd.append('command', command);
//   if (sessionId) fd.append('session_id', sessionId);

//   /*  If your backend wants base64 JSON instead, do:
//       const b64 = await fileToBase64(image);
//       return fetch(`${API}/generate-ui-image`, {
//         method:'POST',
//         headers:{'Content-Type':'application/json'},
//         body: JSON.stringify({ image_base64: b64, command, session_id:sessionId })
//       })
//   */
//   const res = await fetch(`${API}/generate-ui-image`, {
//     method: 'POST',
//     body: fd
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// /* helper only needed when switching to base64-JSON variant */
// async function fileToBase64(file: File) {
//   return new Promise<string>((res, rej) => {
//     const r = new FileReader();
//     r.onerror = () => rej(r.error);
//     r.onload = () => res(r.result as string);
//     r.readAsDataURL(file); // gives "data:image/png;base64,….."
//   });
// }


import axios from 'axios';
import { UIGenerationRequest, UIGenerationResponse, KnowledgeBaseEntry, KnowledgeBaseStats, HealthStatus, UIUpdateRequest, UIUpdateResponse } from '@/types/api';
import { u } from 'framer-motion/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 120000, // 2 minutes for UI generation
});

export class UIGeneratorAPI {
  
  static async generateUI(request: UIGenerationRequest): Promise<UIGenerationResponse> {
    const formData = new FormData();
    
    if (request.prompt) {
      formData.append('prompt', request.prompt);
    }
    
    if (request.image) {
      formData.append('image', request.image);
    }
    
    const response = await apiClient.post<UIGenerationResponse>('/generate-ui', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
  
  static async generateUIFromPrompt(prompt: string,user_id:string): Promise<UIGenerationResponse> {
    const response = await apiClient.post<UIGenerationResponse>('/generate-ui', {
      command:prompt,
      user_id: user_id || 'system',
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  }
  
  static async addUIPattern(entry: KnowledgeBaseEntry): Promise<{ message: string; status: string }> {
    const response = await apiClient.post('/add-ui-pattern', entry);
    return response.data;
  }
  
  static async getKnowledgeBaseStats(): Promise<KnowledgeBaseStats> {
    const response = await apiClient.get<KnowledgeBaseStats>('/knowledge-base/stats');
    return response.data;
  }
  
  static async getHealthStatus(): Promise<HealthStatus> {
    const response = await apiClient.get<HealthStatus>('/health');
    return response.data;
  }

  static async updateUI(request: UIUpdateRequest): Promise<UIUpdateResponse> {
    const response = await apiClient.post<UIUpdateResponse>('/update-ui', request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  static async generateUIFromImage(image: File, command = '', userId = 'system'): Promise<{ html: string }> {
    const fd = new FormData();
    fd.append('image', image);
    fd.append('command', command);
    fd.append('user_id', userId);
    const response = await apiClient.post('/generate-ui-image', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
}
