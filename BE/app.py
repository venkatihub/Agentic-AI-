# import os
# import json
# import re
# import uuid
# from typing import Any, TypedDict
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain.agents import initialize_agent, AgentType
# from langchain.tools import Tool
# from langgraph.graph import StateGraph
# from pymongo import MongoClient
# from dotenv import load_dotenv
# import chromadb
# from chromadb.utils.embedding_functions import DefaultEmbeddingFunction
# from flask_cors import CORS
# from fastapi.middleware.cors import CORSMiddleware
# from bson import ObjectId
# from chromadb.config import Settings
# from chromadb import PersistentClient

# # Load environment variables
# load_dotenv()
# llm = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash",
#     temperature=0.3,
#     google_api_key=os.getenv("GEMINI_API_KEY")
# )
# chroma_client = PersistentClient(path="./chroma_db")

# # === MongoDB setup ===
# client = MongoClient(
#     os.getenv("MONGODB_URI"),
#     serverSelectionTimeoutMS=50000,  # 50 seconds
#     connectTimeoutMS=30000
# )
# db = client["ui_blocks"]
# base_col = db["templates"]
# user_col = db["user_templates"]

# # === ChromaDB setup ===
# # chroma_client = chromadb.Client(Settings(
# #     chroma_db_impl="duckdb+parquet",  # Use DuckDB instead of Rust
# #     persist_directory="./chroma_db"    # Store data locally
# # ))
# collection = chroma_client.get_or_create_collection(
#     name="ui_templates",
#     embedding_function=DefaultEmbeddingFunction()
# )



# # === FastAPI app ===
# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Or ["http://localhost:3000"] for more security
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # === Pydantic models for API requests ===
# class GenerateUIRequest(BaseModel):
#     command: str

# class SaveUIRequest(BaseModel):
#     html: str
#     parent_template_id: str
#     user: str

# # === Tool: RAG UI retriever ===
# # def retrieve_ui_templates(input_str: str) -> dict:
# #     try:
# #         # Extract structured intent using LLM
# #         intent_prompt = f"""
# #         Extract structured intent from: "{input_str}".
# #         Return JSON with: component, fields[], purpose, style.
# #        Only return **valid JSON**. Do not include explanations or markdown.
# #         """
# #         intent_json = llm.invoke(intent_prompt).content
# #         intent = json.loads(intent_json)
# #         print("LLM intent_json:", repr(intent_json))  # Debug print
# #         if not intent_json or not intent_json.strip().startswith("{"):
# #             raise HTTPException(status_code=500, detail=f"LLM did not return valid JSON: {intent_json}")

# #         try:
# #             intent = json.loads(intent_json)
# #         except Exception as e:
# #             raise HTTPException(status_code=500, detail=f"Could not parse LLM JSON: {intent_json} | Error: {str(e)}")
# #         # Create query for ChromaDB
# #         query_text = f"{intent['component']} {intent['purpose']} {','.join(intent['fields'])}"
# #         query_embedding = embedding_function([query_text])[0]

# #         # Search ChromaDB for matching templates
# #         results = collection.query(
# #             query_embeddings=[query_embedding],
# #             n_results=1,
# #             where={
# #                 "component": intent["component"],
# #                 "purpose": intent.get("purpose", "general")
# #             }
# #         )

# #         template_id = str(uuid.uuid4())

# #         # Check if a matching template is found
# #         if results["documents"] and results["metadatas"][0]["component"] == intent["component"]:
# #             return {
# #                 "html": results["metadatas"][0]["html"],
# #                 "template_id": results["metadatas"][0].get("template_id", template_id)
# #             }

# #         # Fallback: Generate new component
# #         generate_prompt = f"""
# #         Generate a responsive {intent['component']} for {intent['purpose']} purpose,
# #         using {intent['style']} CSS. Fields: {', '.join(intent['fields'])}.
# #         Return only raw HTML.
# #         """
# #         html = llm.invoke(generate_prompt).content
# #         clean_html = re.sub(r"^```html\s*|```$", "", html).strip()

# #         # Store new template in MongoDB and ChromaDB
# #         doc = {
# #             "template_id": template_id,
# #             "component": intent["component"],
# #             "fields": intent["fields"],
# #             "purpose": intent["purpose"],
# #             "style": intent["style"],
# #             "html": clean_html,
# #             "source": "gemini"
# #         }
# #         base_col.insert_one(doc)

# #         # Store in ChromaDB
# #         collection.add(
# #             documents=[query_text],
# #             metadatas=[doc],
# #             ids=[f"{intent['component']}_{intent['purpose']}_{len(intent['fields'])}"]
# #         )

# #         return {"html": clean_html, "template_id": template_id}

# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
# def retrieve_ui_templates(input_str: str) -> dict:
#     try:
#         # Updated LLM prompt for consistent structured JSON
#         intent_prompt = f"""
#         Extract the structured intent from: "{input_str}"

#         Respond with a **valid JSON** object ONLY with the following keys:
#         - component: string
#         - fields: array of strings
#         - purpose: string
#         - style: string

#         Only return valid JSON. Do NOT include markdown or explanation.
#         Example:
#         {{
#           "component": "form",
#           "fields": ["name", "email", "message"],
#           "purpose": "contact form",
#           "style": "modern"
#         }}
#         """

#         # # Call LLM and strip whitespace
#         # intent_response = llm.invoke(intent_prompt).content.strip()
#         # print("[DEBUG] LLM Raw Response:", repr(intent_response))

#         # # Remove markdown formatting if accidentally included
#         # cleaned_response = re.sub(r"^```json\s*|```$", "", intent_response).strip()

#         # # Try to parse JSON
#         # try:
#         #     intent = json.loads(cleaned_response)
#         # except json.JSONDecodeError as e:
#         #     raise HTTPException(status_code=500, detail=f"LLM returned invalid JSON: {e}\nRaw: {cleaned_response}")

#         # Create query for ChromaDB
#         query_text = f"{intent['component']} {intent['purpose']} {','.join(intent['fields'])}"
#         query_embedding = embedding_function([query_text])[0]

#         # Search ChromaDB
#         results = collection.query(
#             query_embeddings=[query_embedding],
#             n_results=1,
#             # where={
#             #     "component": intent["component"],
#             #     "purpose": intent.get("purpose", "general")
#             # }
#         )

#         template_id = str(uuid.uuid4())
#         # existing data or template return
#         # if results["documents"] and results["metadatas"][0]["component"] == intent["component"]:
#         if (
#             results.get("metadatas") and 
#             len(results["metadatas"]) > 0 and 
#             len(results["metadatas"][0]) > 0 and 
#             results["metadatas"][0][0]["component"] == intent["component"]
#         ):
#               return {
#                 "html": results["metadatas"][0][0]["html"],
#                 "template_id": results["metadatas"][0][0].get("template_id", template_id)
#             }

#         # If no match, generate new HTML with LLM
#         generate_prompt = f"""
#         Generate a responsive {intent['component']} for {intent['purpose']} purpose,
#         using {intent['style']} CSS. Fields: {', '.join(intent['fields'])}.
#         Return only raw HTML. Do NOT include markdown or explanation.
#         """
#         html = llm.invoke(generate_prompt).content.strip()
#         clean_html = re.sub(r"^```html\s*|```$", "", html).strip()

#         # Store in MongoDB and ChromaDB
#         def to_serializable(val):
#             if isinstance(val, ObjectId):
#                 return str(val)
#             if isinstance(val, list):
#                 return [to_serializable(i) for i in val]
#             if isinstance(val, dict):
#                 return {k: to_serializable(v) for k, v in val.items()}
#             return val

#         doc = {
#                 "template_id": str(template_id),  # should already be string, but safe to cast
#                 "component": intent["component"],
#                 "fields": ", ".join(intent["fields"]),
#                 "purpose": intent["purpose"],
#                 "style": intent["style"],
#                 "html": clean_html,
#                 "source": "gemini"
#             }

#      # Sanitize doc to ensure no ObjectId in values
#         doc = to_serializable(doc)
            
            
#         base_col.insert_one(doc)

#         collection.add(
#             documents=[query_text],
#             metadatas=[{k: (str(v) if isinstance(v, ObjectId) else v) for k, v in doc.items()}],
#             ids=[f"{intent['component']}_{intent['purpose']}_{len(intent['fields'])}"]
#         )
#         return {"html": clean_html, "template_id": template_id}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# # === LangChain tool ===
# tools = [
#     Tool(
#         name="retrieve_ui_templates",
#         func=lambda x: retrieve_ui_templates(x)["html"],
#         description="Retrieve or generate UI templates using RAG and LLM."
#     )
# ]

# # === Agent ===
# agent = initialize_agent(
#     tools=tools,
#     llm=llm,
#     agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
#     verbose=True,
# )


# # === LangGraph State ===
# class AgentState(TypedDict):
#     input: str
#     output: Any

# def agent_node(state: AgentState) -> AgentState:
#     print("\n[LangGraph Node] Running agent on input...")
#     state["output"] = agent.invoke(state["input"])
#     return state

# # === Function to safely initialize app_graph ===
# def init_graph():
#     try:
#         graph = StateGraph(AgentState)
#         graph.add_node("agent", agent_node)
#         graph.set_entry_point("agent")
#         compiled_graph = graph.compile()
#         print("[INFO] LangGraph compiled successfully.")
#         return compiled_graph
#     except Exception as e:
#         print(f"[ERROR] Failed to compile LangGraph: {e}")
#         raise

# # === Compile the graph (IMPORTANT: MUST be at top level) ===
# app_graph = init_graph()



# # === API Endpoints ===
# @app.post("/generate-ui")
# async def generate_ui(request: GenerateUIRequest):
#     try:
#         print(f"[DEBUG] Received request: {request.command}")
#         initial_state = {"input": request.command}
#         result = app_graph.invoke(initial_state)
#         return {
#             "html": result["output"],
#             "template_id": ""
#         }
#     except Exception as e:
#         print("Error in /generate-ui:", e)
#         raise HTTPException(status_code=500, detail=str(e))


# @app.post("/save-ui")
# async def save_ui(request: SaveUIRequest):
#     try:
#         doc = {
#             "template_id": str(uuid.uuid4()),
#             "parent_template_id": request.parent_template_id,
#             "user": request.user,
#             "html": request.html,
#             "source": "user_modified"
#         }
#         user_col.insert_one(doc)
#         return {"message": "Template saved successfully", "template_id": doc["template_id"]}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error saving template: {str(e)}")

# # === Run the agent with input (for testing) ===
# if __name__ == "__main__":
#     import uvicorn
    
#     print("\n=== Final Output ===")
   
#     uvicorn.run(app, host="127.0.0.1", port=5000)

  
import os
import json
import re
import uuid
from typing import Any, TypedDict
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool
from langgraph.graph import StateGraph
from pymongo import MongoClient
from dotenv import load_dotenv
import chromadb
from chromadb.utils.embedding_functions import DefaultEmbeddingFunction
from fastapi import UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from chromadb.config import Settings
from chromadb import PersistentClient
import numpy as np
from datetime import datetime
import logging
from typing import List, Dict
import aiohttp
import google.generativeai as genai
import base64
import mimetypes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.3,
    google_api_key=os.getenv("GEMINI_API_KEY")
)
chroma_client = PersistentClient(path="./chroma_db")

# === MongoDB setup ===
client = MongoClient(
    os.getenv("MONGODB_URI"),
    serverSelectionTimeoutMS=50000,
    connectTimeoutMS=30000
)
db = client["ui_blocks"]
base_col = db["templates"]
user_col = db["user_templates"]
feedback_col = db["feedback_log"]  # New collection for feedback

# # === ChromaDB setup ===
# embedding_function = DefaultEmbeddingFunction()
# collection = chroma_client.get_or_create_collection(
#     name="ui_templates",
#     embedding_function=embedding_function
# )
# === ChromaDB setup ===
embedding_function = DefaultEmbeddingFunction()
collection = chroma_client.get_or_create_collection(
    name="ui_templates",
    embedding_function=embedding_function
)
collection._embedding_function = embedding_function
# === FastAPI app ===
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Pydantic models ===
class GenerateUIRequest(BaseModel):
    command: str
    user_id: str  # Added for user tracking

class SaveUIRequest(BaseModel):
    html: str
    parent_template_id: str
    user: str
    feedback: bool = None  # Added for feedback

class FeedbackRequest(BaseModel):
    template_id: str
    user_id: str
    is_helpful: bool
    comments: str = None

class UpdateUIRequest(BaseModel):
    current_html: str
    change_query: str
    user_id: str = "system"

# === Hallucination Detection ===
# async def verify_response(response: str, query: str) -> Dict[str, Any]:
#     async with aiohttp.ClientSession() as session:
#         try:
#             # Simple external verification (e.g., Wikipedia API or similar)
#             async with session.get(
#                 f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={query}&format=json"
#             ) as resp:
#                 wiki_data = await resp.json()
#                 confidence = 0.9 if wiki_data.get("query", {}).get("search") else 0.5
            
#             # Additional confidence scoring based on response consistency
#             response_tokens = len(response.split())
#             confidence = min(confidence, 1.0 - (response_tokens / 1000))  # Simple length-based heuristic
            
#             return {
#                 "verified": confidence > 0.7,
#                 "confidence_score": confidence,
#                 "details": "Wikipedia-based verification" if confidence > 0.7 else "Low confidence"
#             }
#         except Exception as e:
#             logger.error(f"Verification error: {str(e)}")
#             return {"verified": False, "confidence_score": 0.3, "details": str(e)}
async def verify_response(response: str, query: str) -> Dict[str, Any]:
    """Validate HTML response for hallucinations with external checks"""
    try:
        async with aiohttp.ClientSession() as session:
            # Simple external verification (e.g., Wikipedia API)
            async with session.get(
                f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={query}&format=json"
            ) as resp:
                wiki_data = await resp.json()
                confidence = 0.9 if wiki_data.get("query", {}).get("search") else 0.5
            
            # Additional confidence scoring
            response_tokens = len(response.split())
            confidence = min(confidence, 1.0 - (response_tokens / 1000))
            
            return {
                "verified": confidence > 0.7,
                "confidence_score": confidence,
                "details": "Wikipedia-based verification" if confidence > 0.7 else "Low confidence"
            }
    except Exception as e:
        logger.error(f"Verification error: {str(e)}")
        return {"verified": False, "confidence_score": 0.3, "details": str(e)}

# === Enhanced RAG with Semantic Chunking ===
def semantic_chunking(text: str) -> List[str]:
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    chunks = []
    current_chunk = ""
    max_chunk_size = 200  # Characters per chunk
    
    for sentence in sentences:
        if len(current_chunk) + len(sentence) <= max_chunk_size:
            current_chunk += " " + sentence
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = sentence
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks


# async def retrieve_ui_templates(input_str: str, user_id: str) -> Dict[str, Any]:
#     try:
#         start_time = datetime.now()
              
#         # Enhanced intent extraction
#         intent_prompt = f"""
#         Extract structured intent from: "{input_str}"
#         Respond with valid JSON ONLY with keys: component, fields, purpose, style
#         Example:
#         {{
#           "component": "form",
#           "fields": ["name", "email", "message"],
#           "purpose": "contact form",
#           "style": "modern"
#         }}
#         """
#         intent_response = llm.invoke(intent_prompt).content.strip()
#         logger.info(f"Raw intent response: {intent_response}")
#         intent = json.loads(re.sub(r"^```json\s*|```$", "", intent_response))
        
#         # Semantic-aware query construction
#         query_text = f"{intent['component']} {intent['purpose']} {','.join(intent['fields'])}"
#         logger.info(f"Query text: {query_text}")
#         logger.info(f"Intent: {intent}")
#         chunks = semantic_chunking(query_text)
#         logger.info(f"Chunks: {chunks}")
        
#         # Validate chunks
#         if not chunks or all(not chunk.strip() for chunk in chunks):
#             logger.error("No valid chunks generated from query text")
#             raise HTTPException(status_code=400, detail="Invalid query text: No valid chunks generated")
        
#         # Generate embeddings using stored embedding function
#         if not embedding_function:
#             logger.error("Embedding function not initialized")
#             raise HTTPException(status_code=500, detail="Embedding function not initialized")
        
#         logger.info("Generating embeddings...")
#         embeddings = []
#         for chunk in chunks:
#             try:
#                 chunk_embedding = embedding_function([chunk])[0]  # DefaultEmbeddingFunction expects a list
#                 if not isinstance(chunk_embedding, (list, np.ndarray)) or not chunk_embedding:
#                     logger.error(f"Invalid embedding for chunk: {chunk}")
#                     continue
#                 embeddings.append(np.array(chunk_embedding, dtype=np.float32))
#             except Exception as e:
#                 logger.error(f"Embedding generation failed for chunk '{chunk}': {str(e)}")
#                 if "onnxruntime" in str(e).lower():
#                     logger.error("Missing onnxruntime package. Please install it with `pip install onnxruntime`")
#                     raise HTTPException(status_code=500, detail="Missing dependency: Please install onnxruntime")
#                 continue
        
#         # Check if any valid embeddings were generated
#         if not embeddings:
#             logger.error("No valid embeddings generated")
#             # Fallback to text-based query
#             logger.info("Falling back to text-based query")
#             results = collection.query(
#                 query_texts=[query_text],
#                 n_results=3,
#                 where={"component": intent["component"]}
#             )
#         else:
#             # Aggregate embeddings
#             try:
#                 query_embedding = np.mean(embeddings, axis=0)
#                 if not isinstance(query_embedding, np.ndarray) or query_embedding.size == 0:
#                     logger.error("Invalid aggregated embedding")
#                     raise ValueError("Invalid aggregated embedding")
#                 logger.info(f"Embedding shape: {query_embedding.shape}")
                
#                 # Normal embedding-based query
#                 results = collection.query(
#                     query_embeddings=[query_embedding.tolist()],
#                     n_results=3,
#                     where={"component": intent["component"]}
#                 )
#             except Exception as e:
#                 logger.error(f"Embedding aggregation or query failed: {str(e)}")
#                 # Fallback to text-based query
#                 logger.info("Falling back to text-based query")
#                 results = collection.query(
#                     query_texts=[query_text],
#                     n_results=3,
#                     where={"component": intent["component"]}
#                 )
#         logger.info(f"Query results: {results}")
        
#         template_id = str(uuid.uuid4())
        
#         # Rank results based on relevance
#         if results.get("metadatas") and results["metadatas"][0]:
#             ranked_results = sorted(
#                 results["metadatas"][0],
#                 key=lambda x: x.get("relevance_score", 0),
#                 reverse=True
#             )
#             if ranked_results and ranked_results[0]["component"] == intent["component"]:
#                 html = ranked_results[0]["html"]
#                 verification = verify_response(html, query_text)
#                 return {
#                     "html": html,
#                     "template_id": ranked_results[0].get("template_id", template_id),
#                     "confidence": verification["confidence_score"],
#                     "verified": verification["verified"]
#                 }
        
#         # Generate new component if no match
#         generate_prompt = f"""
#             Generate a fully responsive HTML page for a {intent['component']} intended for {intent['purpose']} purpose.
#             Use {intent.get('style', 'modern')} CSS styling.
#             Include the following fields: {', '.join(intent['fields'])}.
#             Return the complete raw HTML code wrapped inside <html> tags, including <head> and <body>. Do not include any explanation or text outside the HTML.
#          """

#         logger.info(f"Generate prompt: {generate_prompt}")
#         html = llm.invoke(generate_prompt).content.strip()
#         logger.info(f"Raw HTML response: {html}")
#         clean_html = re.sub(r"^```html\s*|```$", "", html).strip()
#         logger.info(f"Generated HTML: {clean_html}")  # Log first 100 chars
#         if not clean_html or "<html" not in clean_html.lower():
#             logger.error("Generated HTML is invalid or empty")
#             raise HTTPException(status_code=500, detail="Failed to generate valid HTML")
#         # verification = await verify_response(clean_html, query_text)
        
#         # Store in MongoDB
#         doc = {
#             "template_id": template_id,
#             "component": intent["component"],
#             "fields": intent["fields"],
#             "purpose": intent["purpose"],
#             "style": intent.get("style", "modern"),
#             "html": clean_html,
#             "source": "gemini",
#             "created_at": datetime.now(),
#             "user_id": user_id,
#             # "confidence_score": verification["confidence_score"]
#         }
#         base_col.insert_one(doc)
        
#         # Store in ChromaDB with relevance score
#         collection.add(
#             documents=[query_text],
#             # metadatas=[{**doc, "relevance_score": verification["confidence_score"]}],
#             ids=[f"{intent['component']}_{intent['purpose']}_{len(intent['fields'])}"]
#         )
        
#         logger.info(f"Retrieval completed in {(datetime.now() - start_time).total_seconds()*1000:.2f}ms")
        
#         return {
#             "html": clean_html,
#             "template_id": template_id,
#             # "confidence": verification["confidence_score"],
#             # "verified": verification["verified"]
#         }
        
#     except Exception as e:
#         logger.error(f"Error in retrieve_ui_templates: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
async def retrieve_ui_templates(input_str: str, user_id: str) -> Dict[str, Any]:
    try:
        start_time = datetime.now()
        
        # Extract intent using LLM
        intent_prompt = f"""
        Extract structured intent from: "{input_str}"
        Return valid JSON with: component, fields, purpose, style
        """
        intent_response = await llm.ainvoke(intent_prompt)
        raw_content = intent_response.content.strip()
        logger.info(f"LLM intent response: {raw_content}")
        if not raw_content:
            raise HTTPException(status_code=500, detail="LLM returned empty response")
        # Remove markdown code block if present (handles leading/trailing whitespace/newlines)
        cleaned_content = re.sub(r"^```(?:json)?\s*|```$", "", raw_content, flags=re.IGNORECASE | re.MULTILINE).strip()
        try:
            intent = json.loads(cleaned_content)
        except Exception as e:
            logger.error(f"Failed to parse LLM response: {cleaned_content}")
            raise HTTPException(status_code=500, detail=f"LLM returned invalid JSON: {cleaned_content}")
        
        # Generate or retrieve template
        query_text = f"{intent['component']} {intent['purpose']}"
        html = await generate_template(intent)
        
        # Verify the response
        verification = await verify_response(html, query_text)
        
        template_id = str(uuid.uuid4())
        
        return {
            "html": html,
            "template_id": template_id,
            "confidence": verification["confidence_score"],
            "verified": verification["verified"]
        }
    except Exception as e:
        logger.error(f"Error in retrieve_ui_templates: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
async def generate_template(intent: Dict[str, Any]) -> str:
    prompt = f"""
    Generate a responsive {intent['component']} for {intent['purpose']}.
    Include fields: {', '.join(intent['fields'])}
    Style: {intent['style']}
    Return only raw HTML.
    """
    response = await llm.ainvoke(prompt)
    html = response.content.strip()
    return re.sub(r"^```html\s*|```$", "", html).strip()    
# === LangChain tool ===
tools = [
    Tool(
        name="retrieve_ui_templates",
        func=lambda x: retrieve_ui_templates(x, "system")["html"],
        description="Retrieve or generate UI templates with enhanced RAG and verification."
    )
]

# === Agent ===
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, 
    verbose=True
)

# === LangGraph State ===
class AgentState(TypedDict):
    input: str
    user_id: str
    output: Any
    confidence: float
    verified: bool

def agent_node(state: AgentState) -> AgentState:
    logger.info(f"Processing input for user {state['user_id']}: {state['input']}")
    result=retrieve_ui_templates(state["input"], state["user_id"])
    state.update({
        "output": result["html"],
        "confidence": result["confidence"],
        "verified": result["verified"]
    })
    return state

# === Initialize graph ===
def init_graph():
    try:
        graph = StateGraph(AgentState)
        graph.add_node("agent", agent_node)
        graph.set_entry_point("agent")
        return graph.compile()
    except Exception as e:
        logger.error(f"Failed to compile LangGraph: {str(e)}")
        raise

app_graph = init_graph()

# === API Endpoints ===
# @app.post("/generate-ui")
# async def generate_ui(request: GenerateUIRequest):
#     try:
#         start_time = datetime.now()
#         initial_state = {
#             "input": request.command,
#             "user_id": request.user_id
#         }
#         result =await app_graph.invoke(initial_state)
        
#         # # Log low-confidence responses
#         # if result["confidence"] < 0.7:
#         #     feedback_col.insert_one({
#         #         "template_id": result.get("template_id", ""),
#         #         "user_id": request.user_id,
#         #         "response": result["output"],
#         #         "confidence": result["confidence"],
#         #         "verified": result["verified"],
#         #         "timestamp": datetime.now()
#         #     })
        
        
#         return {
#             "html": result["output"],
#             "template_id": result.get("template_id", ""),
#             "confidence": result["confidence"],
#             "verified": result["verified"],
#             "status": "processing" if not result["verified"] else "complete"
#         }
#     except Exception as e:
#         logger.error(f"Error in generate-ui: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))
@app.post("/generate-ui")
async def generate_ui(request: GenerateUIRequest):
    try:
        result = await retrieve_ui_templates(request.command, "system")
        return {
            "html": result["html"],
            "template_id": result["template_id"]
        }
    except Exception as e:
        logger.error(f"Error in generate-ui: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/generate-ui-image")
async def generate_ui_image(
    image: UploadFile = File(...),
    command: str = Form(""),
    user_id: str = Form("system")
):
    try:
        image_bytes = await image.read()
        mime_type, _ = mimetypes.guess_type(image.filename)
        if not mime_type:
            mime_type = "image/png"
        prompt = f"Based on this image, I want a UI: {command}. Generate a matching HTML UI. Return only the HTML, no explanation or markdown."
        model = genai.GenerativeModel("gemini-2.5-pro")
        response = model.generate_content([
            prompt,
            {
                "mime_type": mime_type,
                "data": image_bytes
            }
        ], stream=False)
        html = response.text.strip()
        html = re.sub(r"^```(?:html)?\\s*|```$", "", html, flags=re.IGNORECASE | re.MULTILINE).strip()
        return {"html": html}
    except Exception as e:
        logger.error(f"Error in generate-ui-image: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/save-ui")
async def save_ui(request: SaveUIRequest):
    try:
        doc = {
            "template_id": str(uuid.uuid4()),
            "parent_template_id": request.parent_template_id,
            "user": request.user,
            "html": request.html,
            "source": "user_modified",
            "feedback": request.feedback,
            "created_at": datetime.now()
        }
        user_col.insert_one(doc)
        return {"message": "Template saved successfully", "template_id": doc["template_id"]}
    except Exception as e:
        logger.error(f"Error saving template / {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving template: {str(e)}")

@app.post("/feedback")
async def submit_feedback(request: FeedbackRequest):
    try:
        feedback_doc = {
            "template_id": request.template_id,
            "user_id": request.user_id,
            "is_helpful": request.is_helpful,
            "comments": request.comments,
            "timestamp": datetime.now()
        }
        feedback_col.insert_one(feedback_doc)
        
        # Update relevance score in ChromaDB based on feedback
        if not request.is_helpful:
            collection.update(
                ids=[request.template_id],
                metadatas=[{"relevance_score": 0.3}]  # Lower score for negative feedback
            )
            
        return {"message": "Feedback submitted successfully"}
    except Exception as e:
        logger.error(f"Error in feedback: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error submitting feedback: {str(e)}")

@app.post("/update-ui")
async def update_ui(request: UpdateUIRequest):
    try:
        prompt = f"""
        Here is the current HTML:
        {request.current_html}

        User wants to change: {request.change_query}

        Please update the HTML accordingly. Return only the updated HTML, no explanation or markdown.
        """
        response = await llm.ainvoke(prompt)
        updated_html = re.sub(r"^```(?:html)?\s*|```$", "", response.content.strip(), flags=re.IGNORECASE | re.MULTILINE).strip()
        return {"updated_html": updated_html}
    except Exception as e:
        logger.error(f"Error in update-ui: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# === Run server ===
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server...")
    uvicorn.run(app, host="127.0.0.1", port=5000)
    
    
    