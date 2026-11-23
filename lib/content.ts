// Everything the site says about Joel lives here, so facts are easy to check and update.

export const person = {
  name: "Joel Thomas",
  role: "AI Engineer",
  location: "Kochi, India",
  email: "joelthomasv@gmail.com",
  links: {
    github: "https://github.com/joecodeai",
    linkedin: "https://www.linkedin.com/in/joel-thomas-v/",
    huggingface: "https://huggingface.co/joecodeai",
  },
};

export const hero = {
  kicker: "AI Engineer · Kochi, India",
  lines: ["AI that sees,", "reads, and runs", "in production."],
  intro:
    "I build real-time computer vision on NVIDIA GPUs, language systems with retrieval, agents and fine-tuned models, and the software that keeps both running.",
};

export const about = {
  story: [
    "I started in electronics. Two years at Christ University in Bangalore, then I moved to Daegu, South Korea, to finish my degree at Kyungpook National University.",
    "There I spent a year in a research lab, turning noisy muscle signals into hand gestures a network could recognise.",
    "Since 2024 I have been an AI Engineer at a defence and strategic-technology company, building video analytics that run live on GPUs and language systems that never leave the building.",
    "In the evenings I am finishing an M.Tech in AI and Data Science at BITS Pilani, and building things in public.",
  ],
  facts: [
    { k: "Based in", v: "Kochi, India" },
    { k: "Now", v: "AI Engineer, Crimson Energy Experts" },
    { k: "Studying", v: "M.Tech, AI & Data Science, BITS Pilani" },
    { k: "Previously", v: "Kyungpook National University, Daegu" },
  ],
  principles: [
    { t: "Measure it", d: "Every project ships with an evaluation or a benchmark, and the numbers stay honest." },
    { t: "Then ship it", d: "APIs, tests, dashboards, containers. A model is not done until someone can use it." },
    { t: "Keep it local", d: "On-premise first: GPUs I can see, data that stays put, cloud when it earns its place." },
  ],
};

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  year: string;
  tagline: string;
  problem: string;
  how: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  repo: string;
  image: string;
  imageAlt: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "streamsight",
    index: "01",
    name: "StreamSight",
    kind: "Computer vision",
    year: "2026",
    tagline: "Many cameras, one memory of who is where.",
    problem:
      "Multi-camera video analytics usually stops at per-camera boxes. StreamSight follows the same person across cameras in real time and turns what it sees into events an application can use.",
    how: [
      "YOLO11 detection on TensorRT FP16, with ONNX Runtime and OpenVINO back ends benchmarked side by side",
      "ByteTrack-style tracking plus OSNet appearance embeddings, matched across cameras through Milvus",
      "A DeepStream 8 pipeline with a custom C++ YOLO11 parser for the high-throughput path",
      "Pose-based fall alerts and zones, published to a FastAPI and PostgreSQL event API with a live dashboard",
    ],
    metrics: [
      { value: "1,955 FPS", label: "DeepStream, 3 streams, detect + track + re-id" },
      { value: "1.3 ms", label: "YOLO11 detector p50 on TensorRT FP16" },
      { value: "34", label: "automated tests in CI" },
    ],
    stack: ["YOLO11", "TensorRT", "DeepStream", "C++", "OSNet", "Milvus", "FastAPI", "PostgreSQL", "Prometheus", "Kubernetes"],
    repo: "https://github.com/joecodeai/streamsight",
    image: "/projects/streamsight.jpg",
    imageAlt: "Three camera views with tracked people, each labelled with a track id and a cross-camera identity",
    accent: "#ff4f1f",
  },
  {
    id: "ledgerline",
    index: "02",
    name: "Ledgerline",
    kind: "LLM systems · Fintech",
    year: "2026",
    tagline: "Answers about money that show their working.",
    problem:
      "Analysts need answers from filings and transaction data that they can trust. Ledgerline cites the passage, figure or SQL query behind every claim, and checks every number before it is shown.",
    how: [
      "A tool-calling agent with role-based tools, an audit log and a semantic cache",
      "Hybrid retrieval over SEC 10-K filings in Redis: vectors and BM25, fused and reranked",
      "A 1.5B text-to-SQL model fine-tuned with LoRA, quantised to GGUF, behind an AST guard and a read-only role",
      "Guardrails for prompt injection and PII, fraud signals, an MCP server, signed webhooks, Helm and Terraform",
    ],
    metrics: [
      { value: "84.6%", label: "answer accuracy on a 26-question agent eval" },
      { value: "25% → 95%", label: "text-to-SQL execution accuracy after LoRA (Q4)" },
      { value: "0.88", label: "retrieval recall@6, hybrid + reranker" },
    ],
    stack: ["Agents", "RAG", "LoRA", "MCP", "Redis", "PostgreSQL", "FastAPI", "Next.js", "Playwright", "Helm", "Terraform"],
    repo: "https://github.com/joecodeai/ledgerline",
    image: "/projects/ledgerline.png",
    imageAlt: "The Ledgerline research assistant answering a question about NVIDIA revenue with cited sources",
    accent: "#8fd3ff",
  },
  {
    id: "explainer-studio",
    index: "03",
    name: "Explainer Studio",
    kind: "Generative media",
    year: "2026",
    tagline: "A cartoon studio that fits on one GPU.",
    problem:
      "Turning a news topic into a narrated, animated explainer usually takes a team. Explainer Studio does research, script, voice, characters, animation and mixing on a single local GPU, with a human approval gate before anything is produced.",
    how: [
      "Research from news feeds and Wikipedia, then a script and storyboard from a local LLM with schema-checked JSON",
      "A designed narrator voice cloned per line, word timings and lip-sync visemes for every sentence",
      "Characters, backgrounds and hero shots from local image and video models, reused across episodes",
      "Remotion animation, automatic quality checks that redo only failed scenes, and an ffmpeg master",
    ],
    metrics: [
      { value: "3–10 min", label: "animated episodes from a single topic" },
      { value: "1 GPU", label: "models loaded one at a time, no paid APIs" },
      { value: "Human gate", label: "script review before production" },
    ],
    stack: ["Qwen3", "TTS", "Whisper", "Image & video diffusion", "ComfyUI", "Remotion", "ffmpeg", "Python"],
    repo: "https://github.com/joecodeai/explainer-studio",
    image: "/projects/explainer.svg",
    imageAlt: "Explainer Studio pipeline in six steps: research, script with human review, voice, characters, animation and mastering",
    accent: "#ffd23f",
  },
];

export const archive = [
  {
    name: "EMGHandNet",
    what: "Hand gestures from forearm muscle signals: CNN + BiLSTM on Ninapro DB2, 50 classes, 87.1% test accuracy.",
    tags: ["Research", "TensorFlow", "Signals"],
    repo: "https://github.com/joecodeai/EMGHandNet",
    year: "2024",
  },
  {
    name: "Location Tracking",
    what: "Geolocating street landmarks with YOLO11, GPS bearings and ORB / OpenCLIP image matching.",
    tags: ["Vision", "YOLO11", "GPS"],
    repo: "https://github.com/joecodeai/Location_tracking",
    year: "2024",
  },
  {
    name: "3D Generator",
    what: "From an edge sketch to depth and colour with a two-head U-Net, rebuilt as a 3D point cloud.",
    tags: ["Vision", "PyTorch", "Open3D"],
    repo: "https://github.com/joecodeai/3D_Generator",
    year: "2024",
  },
  {
    name: "Handwriting",
    what: "Reading handwritten text lines from the IAM dataset with a CNN + BiLSTM.",
    tags: ["OCR", "TensorFlow"],
    repo: "https://github.com/joecodeai/Handwriting",
    year: "2024",
  },
];

// Tools, grouped, with the projects that prove them.
export const skills: { group: string; note: string; items: { name: string; used: string[] }[] }[] = [
  {
    group: "See",
    note: "Computer vision",
    items: [
      { name: "PyTorch", used: ["streamsight", "work"] },
      { name: "YOLO", used: ["streamsight", "work"] },
      { name: "OpenCV", used: ["streamsight", "work"] },
      { name: "DeepStream", used: ["streamsight", "work"] },
      { name: "TensorRT", used: ["streamsight", "work"] },
      { name: "ONNX", used: ["streamsight", "work"] },
      { name: "GStreamer", used: ["streamsight", "work"] },
      { name: "OpenVINO", used: ["streamsight"] },
      { name: "Milvus", used: ["streamsight", "work"] },
      { name: "VLMs", used: ["work"] },
    ],
  },
  {
    group: "Read",
    note: "Language models",
    items: [
      { name: "Llama 3 fine-tuning", used: ["work"] },
      { name: "Qwen", used: ["ledgerline", "explainer-studio"] },
      { name: "RAG", used: ["ledgerline", "work"] },
      { name: "Agents & tool calling", used: ["ledgerline", "work"] },
      { name: "LoRA / PEFT", used: ["ledgerline"] },
      { name: "MCP", used: ["ledgerline"] },
      { name: "LangChain", used: ["work"] },
      { name: "Hugging Face", used: ["ledgerline", "work"] },
      { name: "Evals & guardrails", used: ["ledgerline"] },
      { name: "TTS & Whisper", used: ["explainer-studio"] },
    ],
  },
  {
    group: "Build",
    note: "Software & data",
    items: [
      { name: "Python", used: ["streamsight", "ledgerline", "explainer-studio", "work"] },
      { name: "FastAPI", used: ["streamsight", "ledgerline", "work"] },
      { name: "PostgreSQL", used: ["streamsight", "ledgerline", "work"] },
      { name: "Redis", used: ["ledgerline", "work"] },
      { name: "TypeScript", used: ["ledgerline", "explainer-studio"] },
      { name: "Next.js", used: ["ledgerline"] },
      { name: "Streamlit", used: ["work"] },
      { name: "C++", used: ["streamsight"] },
    ],
  },
  {
    group: "Run",
    note: "MLOps & infrastructure",
    items: [
      { name: "Docker", used: ["streamsight", "ledgerline", "work"] },
      { name: "Kubernetes", used: ["streamsight", "ledgerline"] },
      { name: "Helm", used: ["ledgerline"] },
      { name: "Terraform", used: ["ledgerline"] },
      { name: "GitHub Actions", used: ["streamsight", "ledgerline"] },
      { name: "Prometheus & Grafana", used: ["streamsight", "ledgerline"] },
      { name: "OpenTelemetry", used: ["ledgerline"] },
      { name: "Linux", used: ["streamsight", "ledgerline", "explainer-studio", "work"] },
    ],
  },
];

export const proofs = [
  { id: "work", label: "Day job" },
  { id: "streamsight", label: "StreamSight" },
  { id: "ledgerline", label: "Ledgerline" },
  { id: "explainer-studio", label: "Explainer Studio" },
];

export const journey = [
  {
    when: "2020",
    until: "2022",
    title: "B.Tech, Computer & Electronics Engineering",
    org: "Christ University, Bangalore",
    body: "First two years of engineering, with a specialisation in AI, machine learning and data science.",
  },
  {
    when: "2022",
    until: "2024",
    title: "B.Tech, Electronics Engineering",
    org: "Kyungpook National University, Daegu, South Korea",
    body: "Transferred to Korea to complete the degree: a new country, a new language, the same circuits.",
  },
  {
    when: "2023",
    until: "2024",
    title: "AI Research Intern",
    org: "Kyungpook National University",
    body: "Cleaned raw 12-channel surface-EMG recordings and built a CNN + BiLSTM that recognises 50 hand movements with 87.1% test accuracy.",
  },
  {
    when: "2024",
    until: "Now",
    title: "AI Engineer",
    org: "Crimson Energy Experts, Kochi",
    body: "One of five AI engineers on a twelve-person computer vision team. Real-time video analytics on NVIDIA DeepStream across live camera streams; a fine-tuned Llama 3 and a RAG system on Redis, deployed fully on-premise; FastAPI services with CI/CD; and, as sole developer, the Streamlit platform and PostgreSQL design that bring our AI systems into one interface.",
  },
  {
    when: "2025",
    until: "2027",
    title: "M.Tech, AI & Data Science",
    org: "BITS Pilani",
    body: "Studying alongside a full-time role. Expected August 2027.",
  },
  {
    when: "2026",
    until: "",
    title: "Building in public",
    org: "github.com/joecodeai",
    body: "StreamSight, Ledgerline and Explainer Studio: real systems with real benchmarks, open for anyone to read and run.",
  },
];

export const beyond = [
  {
    title: "Two countries, one degree",
    body: "Half of my engineering degree happened in Daegu. Living in Korea taught me to work in a team where nobody shares a first language, and to explain things simply.",
    tag: "Daegu, 2022–24",
  },
  {
    title: "I write cartoon comedy",
    body: "Explainer Studio has a show bible, recurring characters and written rules for which jokes land and which sound cringe. Teaching a pipeline to be funny is harder than teaching it to see.",
    tag: "Side project",
  },
  {
    title: "Night school, day job",
    body: "Full-time engineering by day, an M.Tech by night. Most of what I learn in class gets tested on real GPUs the next morning.",
    tag: "BITS Pilani",
  },
];
