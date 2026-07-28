import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CAREERS = [
  { id: "java-fullstack",      icon: "☕", label: "Java Full Stack Developer",   color: "#f59e0b" },
  { id: "web-developer",       icon: "🌐", label: "Web Developer",                color: "#3b82f6" },
  { id: "software-developer",  icon: "💻", label: "Software Developer",           color: "#6366f1" },
  { id: "devops",              icon: "⚙️", label: "DevOps Engineer",              color: "#10b981" },
  { id: "data-science",        icon: "📊", label: "Data Scientist",               color: "#8b5cf6" },
  { id: "data-analyst",        icon: "📈", label: "Data Analyst",                 color: "#f97316" },
  { id: "android",             icon: "📱", label: "Android Developer",            color: "#22c55e" },
  { id: "ml-engineer",         icon: "🤖", label: "ML / AI Engineer",             color: "#ec4899" },
  { id: "cloud",               icon: "☁️", label: "Cloud Engineer (AWS/GCP)",     color: "#06b6d4" },
  { id: "react-frontend",      icon: "⚛️", label: "React Frontend Developer",     color: "#38bdf8" },
  { id: "python-backend",      icon: "🐍", label: "Python Backend Developer",     color: "#facc15" },
  { id: "cybersecurity",       icon: "🔒", label: "Cybersecurity Engineer",       color: "#f87171" },
  { id: "blockchain",          icon: "⛓️", label: "Blockchain Developer",         color: "#a78bfa" },
  { id: "flutter",             icon: "🦋", label: "Flutter / Mobile Developer",   color: "#34d399" },
];

const ROADMAPS = {
  "software-developer": {
    title: "Software Developer",
    icon: "💻",
    color: "#6366f1",
    steps: [
      { phase: "Phase 1 — Programming Fundamentals", emoji: "📚", techs: [
        { name: "C / C++ Basics", emoji: "🔧", topics: ["Variables & Data Types","Operators & Expressions","Conditionals & Loops","Functions & Recursion","Arrays & Strings","Pointers & Memory","Structs & Unions","File I/O"] },
        { name: "Data Structures & Algorithms", emoji: "🧠", topics: ["Arrays & Linked Lists","Stacks & Queues","Trees (BST, AVL)","Graphs (BFS, DFS)","Hashing & Hash Maps","Sorting (Quick, Merge, Heap)","Searching (Binary Search)","Dynamic Programming","Greedy Algorithms","Time & Space Complexity (Big-O)"] },
      ]},
      { phase: "Phase 2 — Object Oriented Programming", emoji: "🏗️", techs: [
        { name: "OOP Concepts", emoji: "🏗️", topics: ["Classes & Objects","Encapsulation","Abstraction","Inheritance","Polymorphism","Interfaces & Abstract Classes","Design Principles (SOLID)","Design Patterns (Singleton, Factory, Observer, Strategy)"] },
        { name: "Java or Python (Pick One)", emoji: "⚙️", topics: ["Syntax & Standard Library","Collections Framework","Exception Handling","File Handling","Multithreading / Concurrency","Unit Testing (JUnit / pytest)","Build Tools (Maven/Gradle / pip)"] },
      ]},
      { phase: "Phase 3 — Database", emoji: "🗃️", techs: [
        { name: "SQL", emoji: "🗃️", topics: ["DDL & DML Commands","SELECT & WHERE","Joins (INNER, LEFT, OUTER)","GROUP BY & HAVING","Subqueries","Indexes","Transactions (ACID)","Normalization (1NF-3NF)","Stored Procedures & Triggers"] },
        { name: "NoSQL Basics", emoji: "🍃", topics: ["What is NoSQL?","MongoDB — Documents & Collections","CRUD in MongoDB","Redis — Key-Value Cache","When to use SQL vs NoSQL"] },
      ]},
      { phase: "Phase 4 — Software Engineering Practices", emoji: "⚒️", techs: [
        { name: "Version Control — Git", emoji: "🔀", topics: ["Git Init, Add, Commit","Branching & Merging","Rebase vs Merge","Pull Requests & Code Review","Git Flow / Trunk-Based Development","GitHub / GitLab"] },
        { name: "Software Development Life Cycle", emoji: "🔄", topics: ["Requirements Gathering","System Design (HLD & LLD)","Agile & Scrum","Jira / Trello (Task Management)","Code Review Best Practices","Documentation (Javadoc, Docstrings)","Clean Code Principles"] },
        { name: "Testing", emoji: "🧪", topics: ["Unit Testing","Integration Testing","Test Driven Development (TDD)","Mocking & Stubs","Code Coverage","Selenium (UI Testing)","Postman (API Testing)"] },
      ]},
      { phase: "Phase 5 — System Design", emoji: "🏛️", techs: [
        { name: "High Level Design (HLD)", emoji: "🏛️", topics: ["Monolith vs Microservices","Load Balancing","Caching (Redis, Memcached)","Message Queues (Kafka, RabbitMQ)","CDN","Database Sharding & Replication","CAP Theorem","Rate Limiting","API Gateway"] },
        { name: "Low Level Design (LLD)", emoji: "📐", topics: ["Class Diagrams & UML","Design Patterns in Practice","SOLID Principles Applied","Schema Design","Concurrency & Thread Safety","Memory Management"] },
      ]},
      { phase: "Phase 6 — Cloud & Deployment", emoji: "🚀", techs: [
        { name: "Cloud Basics", emoji: "☁️", topics: ["AWS EC2 & S3","Heroku / Render (Easy Deploy)","Docker Fundamentals","CI/CD Pipelines (GitHub Actions)","Environment Variables & Secrets","Monitoring & Logging"] },
      ]},
    ]
  },

  "data-analyst": {
    title: "Data Analyst",
    icon: "📈",
    color: "#f97316",
    steps: [
      { phase: "Phase 1 — Excel & Spreadsheets", emoji: "📋", techs: [
        { name: "Microsoft Excel / Google Sheets", emoji: "📋", topics: ["Formulas & Functions (SUM, VLOOKUP, IF)","Pivot Tables","Charts & Graphs","Conditional Formatting","Data Validation","XLOOKUP & INDEX/MATCH","Power Query Basics","Macros Intro"] },
      ]},
      { phase: "Phase 2 — SQL for Data Analysis", emoji: "🗃️", techs: [
        { name: "SQL", emoji: "🗃️", topics: ["SELECT, WHERE, ORDER BY","GROUP BY & HAVING","Aggregate Functions (COUNT, SUM, AVG, MAX, MIN)","JOINs (INNER, LEFT, RIGHT, FULL)","Subqueries & CTEs","Window Functions (ROW_NUMBER, RANK, LAG, LEAD)","String & Date Functions","Query Optimization","MySQL / PostgreSQL / BigQuery"] },
      ]},
      { phase: "Phase 3 — Python for Data Analysis", emoji: "🐍", techs: [
        { name: "Python Basics", emoji: "🐍", topics: ["Variables, Lists, Dicts","Loops & Functions","File Reading (CSV, JSON)","List Comprehensions","Error Handling"] },
        { name: "Pandas & NumPy", emoji: "🧮", topics: ["Series & DataFrames","Reading CSV/Excel/JSON","Data Cleaning (dropna, fillna)","Filtering & Sorting","GroupBy & Aggregation","Merging & Joining DataFrames","Date/Time Handling","NumPy Arrays & Operations"] },
      ]},
      { phase: "Phase 4 — Data Visualization", emoji: "📊", techs: [
        { name: "Python Visualization", emoji: "📊", topics: ["Matplotlib — Line, Bar, Scatter, Pie","Seaborn — Heatmaps, Box Plots, Pair Plots","Plotly — Interactive Charts","Choosing the Right Chart Type","Storytelling with Data"] },
        { name: "BI Tools", emoji: "🖥️", topics: ["Power BI — Reports & Dashboards","Tableau — Worksheets & Stories","Google Looker Studio","DAX Basics (Power BI)","Publishing & Sharing Dashboards"] },
      ]},
      { phase: "Phase 5 — Statistics & Analytics", emoji: "📐", techs: [
        { name: "Statistics", emoji: "📐", topics: ["Mean, Median, Mode","Variance & Standard Deviation","Normal Distribution","Correlation & Covariance","Hypothesis Testing (t-test, chi-square)","p-value & Confidence Intervals","A/B Testing","Regression Analysis (Linear)"] },
      ]},
      { phase: "Phase 6 — Tools & Portfolio", emoji: "🚀", techs: [
        { name: "Tools", emoji: "🛠️", topics: ["Jupyter Notebook","Google Colab","Git & GitHub","Kaggle Datasets & Competitions","API Data Extraction","Web Scraping (BeautifulSoup, Requests)"] },
        { name: "Portfolio Projects", emoji: "📁", topics: ["COVID-19 Data Dashboard","Sales Performance Analysis","Customer Churn Analysis","HR Analytics Dashboard","Stock Market Trend Analysis","E-commerce Funnel Analysis","Upload to GitHub & Kaggle"] },
      ]},
    ]
  },

  "java-fullstack": {
    title: "Java Full Stack Developer",
    icon: "☕",
    color: "#f59e0b",
    steps: [
      {
        phase: "Phase 1 — Web Basics",
        emoji: "🎨",
        techs: [
          { name: "HTML5", emoji: "🏗️", topics: ["HTML Elements & Tags","Semantic HTML","Forms & Validation","Tables, Lists","SEO Meta Tags","Accessibility (ARIA)"] },
          { name: "CSS3",  emoji: "🎨", topics: ["Box Model","Flexbox","CSS Grid","Animations & Transitions","Responsive Design","Media Queries","CSS Variables"] },
          { name: "JavaScript", emoji: "⚡", topics: ["Variables & Data Types","Functions & Scope","DOM Manipulation","Events","Fetch API / AJAX","Promises & Async/Await","ES6+ Features","Local Storage"] },
        ]
      },
      {
        phase: "Phase 2 — Java Core",
        emoji: "☕",
        techs: [
          { name: "Java", emoji: "☕", topics: ["JDK Setup & Hello World","Data Types & Variables","Operators & Control Flow","OOP — Classes & Objects","Inheritance & Polymorphism","Abstraction & Interfaces","Exception Handling","Collections (List, Map, Set)","Generics","File I/O","Multithreading","Lambda Expressions","Stream API","JDBC (Database Connectivity)"] },
        ]
      },
      {
        phase: "Phase 3 — Backend (Spring)",
        emoji: "🌱",
        techs: [
          { name: "Spring Boot", emoji: "🌱", topics: ["Spring Core & IoC","Dependency Injection","Spring MVC","REST APIs","Spring Data JPA","Spring Security","JWT Authentication","Exception Handling (GlobalExceptionHandler)","Spring Boot Testing","Actuator & Monitoring"] },
          { name: "Hibernate / JPA", emoji: "🗄️", topics: ["Entity Mapping","CRUD Operations","Relationships (OneToMany, ManyToMany)","JPQL Queries","Lazy vs Eager Loading","Transactions"] },
        ]
      },
      {
        phase: "Phase 4 — Database",
        emoji: "🗃️",
        techs: [
          { name: "MySQL / PostgreSQL", emoji: "🗃️", topics: ["DDL — CREATE, ALTER, DROP","DML — SELECT, INSERT, UPDATE, DELETE","Joins (INNER, LEFT, RIGHT)","Indexes & Performance","Stored Procedures","Transactions & ACID","Normalization"] },
        ]
      },
      {
        phase: "Phase 5 — Frontend Framework",
        emoji: "⚛️",
        techs: [
          { name: "React.js", emoji: "⚛️", topics: ["Components & JSX","Props & State","Hooks (useState, useEffect, useContext)","React Router","Axios / Fetch","Redux Toolkit (State Management)","Component Lifecycle","Error Boundaries","Performance Optimization"] },
        ]
      },
      {
        phase: "Phase 6 — Tools & Deployment",
        emoji: "🚀",
        techs: [
          { name: "Git & GitHub", emoji: "🔀", topics: ["Init, Clone, Add, Commit","Branching & Merging","Pull Requests","Resolving Conflicts","GitHub Actions (CI/CD)"] },
          { name: "Docker", emoji: "🐳", topics: ["Docker Images & Containers","Dockerfile","docker-compose","Volumes & Networking","Pushing to Docker Hub"] },
          { name: "AWS Basics", emoji: "☁️", topics: ["EC2 — Deploy Spring Boot","RDS — Managed MySQL","S3 — File Storage","Elastic Beanstalk","Route 53 (Domain)"] },
        ]
      },
    ]
  },

  "web-developer": {
    title: "Web Developer",
    icon: "🌐",
    color: "#3b82f6",
    steps: [
      { phase: "Phase 1 — HTML & CSS", emoji: "🎨", techs: [
        { name: "HTML5", emoji: "🏗️", topics: ["Document Structure","Semantic Elements","Forms & Input Types","Media Embedding","SEO Meta Tags","Accessibility"] },
        { name: "CSS3", emoji: "🎨", topics: ["Selectors & Specificity","Flexbox Layout","CSS Grid","Animations","Responsive Design","CSS Preprocessors (SASS)","Tailwind CSS Basics"] },
      ]},
      { phase: "Phase 2 — JavaScript", emoji: "⚡", techs: [
        { name: "JavaScript", emoji: "⚡", topics: ["Variables, Data Types","Functions & Closures","DOM Manipulation","Events & Listeners","Fetch API","Promises / async-await","ES6+ (Arrow Functions, Spread, Destructuring)","Modules (import/export)"] },
      ]},
      { phase: "Phase 3 — Frontend Framework", emoji: "⚛️", techs: [
        { name: "React.js", emoji: "⚛️", topics: ["JSX & Components","Props & State","Hooks","React Router","Context API","Redux","Axios","Vite Setup"] },
      ]},
      { phase: "Phase 4 — Backend", emoji: "🖥️", techs: [
        { name: "Node.js & Express", emoji: "🟢", topics: ["Node.js Basics","npm & Packages","Express Setup","REST APIs","Middleware","CORS","Authentication (JWT)","Error Handling"] },
        { name: "MongoDB", emoji: "🍃", topics: ["Collections & Documents","CRUD Operations","Mongoose ODM","Schema Design","Aggregation Pipeline","Indexing"] },
      ]},
      { phase: "Phase 5 — Deployment", emoji: "🚀", techs: [
        { name: "Deployment Tools", emoji: "🚀", topics: ["Git & GitHub","Netlify / Vercel (Frontend)","Render / Railway (Backend)","Domain & HTTPS","Environment Variables","CI/CD Basics"] },
      ]},
    ]
  },

  "devops": {
    title: "DevOps Engineer",
    icon: "⚙️",
    color: "#10b981",
    steps: [
      { phase: "Phase 1 — Linux & Scripting", emoji: "🐧", techs: [
        { name: "Linux", emoji: "🐧", topics: ["File System & Navigation","File Permissions","Process Management","Package Management (apt/yum)","Shell Scripting (Bash)","Cron Jobs","SSH & Remote Access"] },
      ]},
      { phase: "Phase 2 — Version Control", emoji: "🔀", techs: [
        { name: "Git & GitHub", emoji: "🔀", topics: ["Branching Strategy","Git Flow","Pull Requests & Code Review","Git Hooks","GitHub Actions"] },
      ]},
      { phase: "Phase 3 — Containerization", emoji: "🐳", techs: [
        { name: "Docker", emoji: "🐳", topics: ["Containers vs VMs","Docker Images","Dockerfile","docker-compose","Volumes & Networks","Docker Registry","Multi-stage Builds"] },
        { name: "Kubernetes", emoji: "☸️", topics: ["Pods & Deployments","Services & Ingress","ConfigMaps & Secrets","Helm Charts","HPA — Auto Scaling","Namespaces","kubectl CLI"] },
      ]},
      { phase: "Phase 4 — CI/CD", emoji: "♾️", techs: [
        { name: "CI/CD Pipelines", emoji: "♾️", topics: ["GitHub Actions","Jenkins","GitLab CI","Pipeline Stages (Build, Test, Deploy)","Artifact Management","Blue-Green Deployments","Canary Releases"] },
      ]},
      { phase: "Phase 5 — Cloud & IaC", emoji: "☁️", techs: [
        { name: "AWS / GCP / Azure", emoji: "☁️", topics: ["EC2, VPC, S3","IAM Roles & Policies","RDS & DynamoDB","EKS (Kubernetes on AWS)","CloudWatch Monitoring","Lambda (Serverless)"] },
        { name: "Terraform", emoji: "🔧", topics: ["Infrastructure as Code Concepts","Providers & Resources","State Management","Modules","Workspaces","Terraform Cloud"] },
      ]},
      { phase: "Phase 6 — Monitoring", emoji: "📈", techs: [
        { name: "Monitoring & Observability", emoji: "📈", topics: ["Prometheus & Grafana","ELK Stack (Elasticsearch, Logstash, Kibana)","Alerting Rules","Log Aggregation","Distributed Tracing (Jaeger)"] },
      ]},
    ]
  },

  "data-science": {
    title: "Data Scientist",
    icon: "📊",
    color: "#8b5cf6",
    steps: [
      { phase: "Phase 1 — Python", emoji: "🐍", techs: [
        { name: "Python", emoji: "🐍", topics: ["Data Types & Collections","Functions & Modules","File Handling","List Comprehensions","OOP Basics","Virtual Environments","pip & conda"] },
      ]},
      { phase: "Phase 2 — Math & Stats", emoji: "📐", techs: [
        { name: "Mathematics", emoji: "📐", topics: ["Linear Algebra (Vectors, Matrices)","Calculus (Derivatives, Gradients)","Probability & Distributions","Statistics (Mean, Variance, Std Dev)","Hypothesis Testing","Bayesian Thinking"] },
      ]},
      { phase: "Phase 3 — Data Libraries", emoji: "📦", techs: [
        { name: "NumPy & Pandas", emoji: "🧮", topics: ["Arrays & Operations","DataFrames","Data Cleaning","Merging & Grouping","Handling Missing Values","Time Series Data"] },
        { name: "Matplotlib & Seaborn", emoji: "📊", topics: ["Line & Bar Charts","Scatter Plots","Heatmaps","Distribution Plots","Customizing Figures"] },
      ]},
      { phase: "Phase 4 — Machine Learning", emoji: "🤖", techs: [
        { name: "Scikit-Learn", emoji: "🤖", topics: ["Supervised Learning (Regression, Classification)","Unsupervised Learning (Clustering)","Model Evaluation Metrics","Cross Validation","Feature Engineering","Hyperparameter Tuning (GridSearchCV)","Pipelines"] },
      ]},
      { phase: "Phase 5 — Deep Learning & Tools", emoji: "🧠", techs: [
        { name: "TensorFlow / PyTorch", emoji: "🧠", topics: ["Neural Networks Basics","Activation Functions","Backpropagation","CNNs — Image Recognition","RNNs / LSTMs — Sequence Data","Transfer Learning","Model Saving & Loading"] },
        { name: "SQL & Databases", emoji: "🗃️", topics: ["SELECT & Aggregations","Joins","Window Functions","Query Optimization","BigQuery / Redshift"] },
      ]},
    ]
  },

  "android": {
    title: "Android Developer",
    icon: "📱",
    color: "#22c55e",
    steps: [
      { phase: "Phase 1 — Java / Kotlin", emoji: "🔤", techs: [
        { name: "Kotlin", emoji: "🔤", topics: ["Variables & Data Types","Functions & Lambdas","Classes & Objects","Coroutines","Extension Functions","Null Safety","Collections"] },
      ]},
      { phase: "Phase 2 — Android Basics", emoji: "📱", techs: [
        { name: "Android SDK", emoji: "📱", topics: ["Activities & Fragments","Intents","Layouts (XML & Compose)","RecyclerView","ViewBinding","Permissions","Lifecycle","Navigation Component"] },
      ]},
      { phase: "Phase 3 — Jetpack & Architecture", emoji: "🏗️", techs: [
        { name: "Jetpack Compose", emoji: "🎨", topics: ["Composable Functions","State Management","Themes & Styling","Lists","Navigation","Animations"] },
        { name: "MVVM Architecture", emoji: "🏗️", topics: ["ViewModel","LiveData / StateFlow","Repository Pattern","Dependency Injection (Hilt)","Room Database"] },
      ]},
      { phase: "Phase 4 — Networking & Firebase", emoji: "🔥", techs: [
        { name: "Retrofit & APIs", emoji: "🌐", topics: ["REST API Integration","Retrofit Setup","Gson / Moshi Parsing","Coroutines with Retrofit","Error Handling"] },
        { name: "Firebase", emoji: "🔥", topics: ["Authentication","Firestore Database","Realtime Database","Firebase Storage","Push Notifications (FCM)","Crashlytics"] },
      ]},
      { phase: "Phase 5 — Publishing", emoji: "🚀", techs: [
        { name: "Play Store Deployment", emoji: "🚀", topics: ["App Signing","Build Variants","ProGuard / R8","Google Play Console","App Bundle (AAB)","Store Listing Optimization"] },
      ]},
    ]
  },

  "ml-engineer": {
    title: "ML / AI Engineer",
    icon: "🤖",
    color: "#ec4899",
    steps: [
      { phase: "Phase 1 — Python & Math", emoji: "🐍", techs: [
        { name: "Python", emoji: "🐍", topics: ["Python Basics","NumPy","Pandas","Matplotlib","Statistics","Linear Algebra","Calculus"] },
      ]},
      { phase: "Phase 2 — Machine Learning", emoji: "🤖", techs: [
        { name: "Classical ML", emoji: "🤖", topics: ["Regression","Classification","SVM","Decision Trees","Random Forest","KNN","Naive Bayes","Model Evaluation","Feature Engineering"] },
      ]},
      { phase: "Phase 3 — Deep Learning", emoji: "🧠", techs: [
        { name: "Deep Learning", emoji: "🧠", topics: ["Neural Networks","CNNs","RNNs / LSTMs","Transformers (Attention)","BERT / GPT Architecture","Transfer Learning","GANs"] },
      ]},
      { phase: "Phase 4 — NLP & Computer Vision", emoji: "🔬", techs: [
        { name: "NLP", emoji: "💬", topics: ["Text Preprocessing","Tokenization","Word Embeddings","Sentiment Analysis","Named Entity Recognition","Language Models","LangChain / RAG"] },
        { name: "Computer Vision", emoji: "👁️", topics: ["Image Processing (OpenCV)","Object Detection (YOLO)","Image Segmentation","Image Classification","Pose Estimation"] },
      ]},
      { phase: "Phase 5 — MLOps", emoji: "⚙️", techs: [
        { name: "MLOps", emoji: "⚙️", topics: ["Model Versioning (MLflow)","Model Serving (FastAPI, TorchServe)","Docker for ML","CI/CD for ML Pipelines","Monitoring (Evidently AI)","Data Versioning (DVC)","Cloud ML (AWS SageMaker, Vertex AI)"] },
      ]},
    ]
  },

  "cloud": {
    title: "Cloud Engineer (AWS/GCP)",
    icon: "☁️",
    color: "#06b6d4",
    steps: [
      { phase: "Phase 1 — Networking Basics", emoji: "🌐", techs: [
        { name: "Networking", emoji: "🌐", topics: ["IP Addressing & Subnets","TCP/IP Model","DNS & DHCP","HTTP/HTTPS","Load Balancing","Firewalls & NAT","VPN"] },
      ]},
      { phase: "Phase 2 — Linux & Scripting", emoji: "🐧", techs: [
        { name: "Linux & Bash", emoji: "🐧", topics: ["Shell Commands","File Permissions","Bash Scripting","Cron Jobs","SSH & SCP","Package Management"] },
      ]},
      { phase: "Phase 3 — AWS Core", emoji: "☁️", techs: [
        { name: "AWS", emoji: "☁️", topics: ["IAM (Users, Roles, Policies)","EC2 & Auto Scaling","S3 & Glacier","VPC & Security Groups","RDS & Aurora","Lambda (Serverless)","CloudFront (CDN)","Route 53","ECS & EKS","CloudWatch & CloudTrail"] },
      ]},
      { phase: "Phase 4 — IaC & DevOps", emoji: "🔧", techs: [
        { name: "Terraform", emoji: "🔧", topics: ["HCL Syntax","Providers","State Management","Modules","Remote State (S3)","Workspaces"] },
        { name: "Docker & Kubernetes", emoji: "🐳", topics: ["Dockerizing Apps","ECS on AWS","EKS Cluster Setup","Helm Charts","kubectl"] },
      ]},
      { phase: "Phase 5 — Certifications", emoji: "🏆", techs: [
        { name: "AWS Certifications", emoji: "🏆", topics: ["Cloud Practitioner (Entry)","Solutions Architect Associate","Developer Associate","SysOps Administrator","Solutions Architect Professional"] },
      ]},
    ]
  },

  "react-frontend": {
    title: "React Frontend Developer",
    icon: "⚛️",
    color: "#38bdf8",
    steps: [
      { phase: "Phase 1 — Web Foundations", emoji: "🎨", techs: [
        { name: "HTML & CSS", emoji: "🎨", topics: ["Semantic HTML","Flexbox & Grid","Responsive Design","CSS Variables","Animations","SASS/SCSS Basics"] },
        { name: "JavaScript ES6+", emoji: "⚡", topics: ["Arrow Functions","Destructuring","Spread/Rest","Modules","Promises","async/await","Map/Filter/Reduce","DOM APIs"] },
      ]},
      { phase: "Phase 2 — React Core", emoji: "⚛️", techs: [
        { name: "React.js", emoji: "⚛️", topics: ["Components & JSX","Props & PropTypes","State with useState","Side Effects with useEffect","useRef & useCallback","useMemo","Custom Hooks","Context API","React Router v6","Code Splitting & lazy()"] },
      ]},
      { phase: "Phase 3 — State Management", emoji: "🗄️", techs: [
        { name: "Redux Toolkit", emoji: "🗄️", topics: ["Store & Slices","Actions & Reducers","createAsyncThunk","RTK Query","Middleware","DevTools"] },
        { name: "Other Libraries", emoji: "📦", topics: ["Zustand","Jotai","React Query (TanStack)","SWR"] },
      ]},
      { phase: "Phase 4 — UI & Tooling", emoji: "🛠️", techs: [
        { name: "UI Libraries", emoji: "🎨", topics: ["Tailwind CSS","MUI / Ant Design","Framer Motion (Animations)","React Hook Form","Zod (Validation)"] },
        { name: "Build Tools", emoji: "🛠️", topics: ["Vite","Webpack Basics","ESLint & Prettier","TypeScript with React","Jest & React Testing Library"] },
      ]},
      { phase: "Phase 5 — Deployment", emoji: "🚀", techs: [
        { name: "Deployment", emoji: "🚀", topics: ["Vercel / Netlify","Environment Variables","CI/CD with GitHub Actions","Performance (Lighthouse)","SEO & Meta Tags","PWA Basics"] },
      ]},
    ]
  },

  "python-backend": {
    title: "Python Backend Developer",
    icon: "🐍",
    color: "#facc15",
    steps: [
      { phase: "Phase 1 — Python Core", emoji: "🐍", techs: [
        { name: "Python", emoji: "🐍", topics: ["Data Types & Collections","OOP — Classes, Inheritance","File I/O","Error Handling","Decorators","Generators","Context Managers","Modules & Packages","Virtual Environments"] },
      ]},
      { phase: "Phase 2 — Web Framework", emoji: "🌐", techs: [
        { name: "FastAPI / Django", emoji: "🚀", topics: ["FastAPI Setup & Routing","Pydantic Models","Dependency Injection","OAuth2 / JWT Auth","Background Tasks","Django ORM","Django REST Framework","Admin Panel"] },
      ]},
      { phase: "Phase 3 — Databases", emoji: "🗃️", techs: [
        { name: "SQL & NoSQL", emoji: "🗃️", topics: ["PostgreSQL — SQLAlchemy / psycopg2","MySQL","SQLite","MongoDB — PyMongo","Redis (Caching)","Elasticsearch"] },
      ]},
      { phase: "Phase 4 — APIs & Security", emoji: "🔐", techs: [
        { name: "API Best Practices", emoji: "🔐", topics: ["REST API Design","GraphQL (Graphene)","Rate Limiting","CORS Handling","Input Validation","JWT & Session Auth","API Versioning","Swagger / OpenAPI Docs"] },
      ]},
      { phase: "Phase 5 — DevOps & Deployment", emoji: "🚀", techs: [
        { name: "Deployment", emoji: "🚀", topics: ["Docker & docker-compose","Gunicorn / Uvicorn","Nginx Reverse Proxy","AWS EC2 / Render","GitHub Actions CI/CD","Celery (Task Queue)","RabbitMQ / Redis Queue"] },
      ]},
    ]
  },

  "cybersecurity": {
    title: "Cybersecurity Engineer",
    icon: "🔒",
    color: "#f87171",
    steps: [
      { phase: "Phase 1 — Networking & OS", emoji: "🌐", techs: [
        { name: "Networking Fundamentals", emoji: "🌐", topics: ["OSI & TCP/IP Models","IP Addressing & Subnetting","DNS, DHCP, HTTP/S","Firewalls & IDS/IPS","Packet Analysis (Wireshark)","VPN & Tunneling"] },
        { name: "Linux & Windows", emoji: "🐧", topics: ["Linux Command Line","File Permissions & Users","Active Directory (Windows)","Registry & Services","PowerShell Scripting","Bash Scripting"] },
      ]},
      { phase: "Phase 2 — Security Concepts", emoji: "🔒", techs: [
        { name: "Security Fundamentals", emoji: "🔒", topics: ["CIA Triad","Authentication & Authorization","Cryptography (Symmetric, Asymmetric)","Public Key Infrastructure","OWASP Top 10","Threat Modeling","Security Frameworks (NIST, ISO 27001)"] },
      ]},
      { phase: "Phase 3 — Ethical Hacking", emoji: "🕵️", techs: [
        { name: "Penetration Testing", emoji: "🕵️", topics: ["Reconnaissance (OSINT)","Scanning (Nmap, Nessus)","Exploitation (Metasploit)","Web App Hacking (Burp Suite)","SQL Injection","XSS & CSRF","Privilege Escalation","Post Exploitation"] },
      ]},
      { phase: "Phase 4 — SOC & Defense", emoji: "🛡️", techs: [
        { name: "Blue Team / SOC", emoji: "🛡️", topics: ["SIEM (Splunk, QRadar)","Log Analysis","Incident Response","Malware Analysis","Digital Forensics","Threat Intelligence","Vulnerability Management"] },
      ]},
      { phase: "Phase 5 — Certifications", emoji: "🏆", techs: [
        { name: "Certifications", emoji: "🏆", topics: ["CompTIA Security+","CEH (Certified Ethical Hacker)","OSCP (Offensive Security)","CISSP","CompTIA CySA+","AWS Security Specialty"] },
      ]},
    ]
  },

  "blockchain": {
    title: "Blockchain Developer",
    icon: "⛓️",
    color: "#a78bfa",
    steps: [
      { phase: "Phase 1 — Programming", emoji: "💻", techs: [
        { name: "JavaScript / Python", emoji: "💻", topics: ["JavaScript ES6+","Node.js Basics","Python Fundamentals","OOP Concepts","REST APIs","Async Programming"] },
      ]},
      { phase: "Phase 2 — Blockchain Basics", emoji: "⛓️", techs: [
        { name: "Blockchain Concepts", emoji: "⛓️", topics: ["What is Blockchain","Distributed Ledger","Consensus Mechanisms (PoW, PoS)","Cryptography Basics","Hash Functions","Wallets & Keys","Transactions & Blocks","Bitcoin vs Ethereum"] },
      ]},
      { phase: "Phase 3 — Smart Contracts", emoji: "📝", techs: [
        { name: "Solidity", emoji: "📝", topics: ["Solidity Syntax","Data Types & Variables","Functions & Modifiers","Events & Errors","Inheritance","Mappings & Arrays","ERC-20 Token Standard","ERC-721 (NFT)","Security Best Practices"] },
      ]},
      { phase: "Phase 4 — Web3 Development", emoji: "🌐", techs: [
        { name: "Web3 Tools", emoji: "🌐", topics: ["Hardhat / Truffle (Dev Framework)","Remix IDE","Ethers.js / Web3.js","MetaMask Integration","IPFS (Decentralized Storage)","The Graph (Data Indexing)","Moralis / Alchemy APIs"] },
      ]},
      { phase: "Phase 5 — DeFi & NFTs", emoji: "💎", techs: [
        { name: "DeFi & NFT Projects", emoji: "💎", topics: ["Uniswap / DEX Architecture","Lending Protocols","NFT Marketplaces","DAOs","Layer 2 (Polygon, Arbitrum)","Cross-Chain Bridges","On-chain Analytics"] },
      ]},
    ]
  },

  "flutter": {
    title: "Flutter / Mobile Developer",
    icon: "🦋",
    color: "#34d399",
    steps: [
      { phase: "Phase 1 — Dart Language", emoji: "🎯", techs: [
        { name: "Dart", emoji: "🎯", topics: ["Variables & Data Types","Functions & Closures","OOP — Classes & Mixins","Async / await & Futures","Streams","Null Safety","Collections (List, Map, Set)"] },
      ]},
      { phase: "Phase 2 — Flutter UI", emoji: "🦋", techs: [
        { name: "Flutter Widgets", emoji: "🦋", topics: ["Stateless & Stateful Widgets","Layouts (Row, Column, Stack)","Container & Padding","ListView & GridView","Navigation & Routes","Material & Cupertino Widgets","Custom Painting","Animations (AnimatedContainer, Hero)"] },
      ]},
      { phase: "Phase 3 — State Management", emoji: "🗄️", techs: [
        { name: "State Management", emoji: "🗄️", topics: ["setState Basics","Provider","Riverpod","BLoC Pattern","GetX","InheritedWidget"] },
      ]},
      { phase: "Phase 4 — Backend Integration", emoji: "🔌", techs: [
        { name: "Networking & Storage", emoji: "🔌", topics: ["HTTP / Dio Package","REST API Calls","JSON Parsing","SharedPreferences","SQLite (sqflite)","Firebase Auth & Firestore","Push Notifications (FCM)"] },
      ]},
      { phase: "Phase 5 — Publishing", emoji: "🚀", techs: [
        { name: "App Publishing", emoji: "🚀", topics: ["Android Build & Signing","iOS Build (Xcode, Certificates)","Google Play Store","Apple App Store","CI/CD with Codemagic / Fastlane","Flavor Environments (dev/prod)"] },
      ]},
    ]
  },
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function CareerRoadmap() {
  const [selected, setSelected] = useState(null);
  const [expandedTechs, setExpandedTechs] = useState({});

  const roadmap = selected ? ROADMAPS[selected] : null;

  const toggleTech = (key) => {
    setExpandedTechs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBack = () => {
    setSelected(null);
    setExpandedTechs({});
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content" style={{ flex: 1, overflowY: "auto", padding: "28px 32px", minHeight: "calc(100vh - 64px)" }}>

          {/* ── CAREER SELECTION SCREEN ── */}
          {!selected && (
            <>
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ color: "inherit", fontSize: "26px", fontWeight: 800, margin: 0 }}>🗺️ Career Roadmap</h1>
                <p style={{ color: "#6b7280", marginTop: "6px", fontSize: "14px" }}>
                  Choose a career path below to view a step-by-step learning roadmap.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "16px" }}>
                {CAREERS.map((career) => (
                  <button
                    key={career.id}
                    onClick={() => setSelected(career.id)}
                    className="roadmap-card-item"
                    style={{
                      border: `1.5px solid ${career.color}33`,
                      borderRadius: "14px",
                      padding: "22px 18px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${career.color}18`;
                      e.currentTarget.style.borderColor = career.color;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = undefined;
                      e.currentTarget.style.borderColor = `${career.color}33`;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>{career.icon}</span>
                    <span style={{ color: "inherit", fontWeight: 700, fontSize: "14px", lineHeight: 1.3 }}>{career.label}</span>
                    <span style={{ color: career.color, fontSize: "12px", fontWeight: 600 }}>View Roadmap →</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── ROADMAP DETAIL SCREEN ── */}
          {selected && roadmap && (
            <>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
                <button
                  onClick={handleBack}
                  className="roadmap-back-btn"
                  style={{ border: "none", borderRadius: "8px", padding: "8px 14px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
                >
                  ← Back
                </button>
                <div>
                  <h1 style={{ color: "inherit", fontSize: "22px", fontWeight: 800, margin: 0 }}>
                    {roadmap.icon} {roadmap.title}
                  </h1>
                  <p style={{ color: "#6b7280", margin: "4px 0 0", fontSize: "13px" }}>
                    Click on any technology to see all topics inside it.
                  </p>
                </div>
              </div>

              {/* Phases */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {roadmap.steps.map((step, si) => (
                  <div key={si}>
                    {/* Phase Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                      <div style={{
                        background: roadmap.color,
                        color: "white",
                        borderRadius: "50%",
                        width: "28px", height: "28px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", fontWeight: 800, flexShrink: 0
                      }}>{si + 1}</div>
                      <h2 style={{ color: "inherit", margin: 0, fontSize: "15px", fontWeight: 700 }}>
                        {step.emoji} {step.phase}
                      </h2>
                      <div className="roadmap-divider" style={{ flex: 1, height: "1px" }} />
                    </div>

                    {/* Technology Cards */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", paddingLeft: "38px" }}>
                      {step.techs.map((tech, ti) => {
                        const key = `${si}-${ti}`;
                        const isOpen = !!expandedTechs[key];
                        return (
                          <div
                            key={ti}
                            className="roadmap-tech-card"
                            style={{
                              background: isOpen ? `${roadmap.color}18` : undefined,
                              border: `1.5px solid ${isOpen ? roadmap.color : "rgba(255,255,255,0.1)"}`,
                              borderRadius: "12px",
                              overflow: "hidden",
                              minWidth: "220px",
                              flex: "1 1 220px",
                              maxWidth: "340px",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {/* Tech Header Button */}
                            <button
                              onClick={() => toggleTech(key)}
                              style={{
                                width: "100%",
                                background: "transparent",
                                border: "none",
                                padding: "14px 16px",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontSize: "20px" }}>{tech.emoji}</span>
                                <span style={{ color: "inherit", fontWeight: 700, fontSize: "14px" }}>{tech.name}</span>
                                <span style={{
                                  background: `${roadmap.color}33`,
                                  color: roadmap.color,
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  padding: "2px 7px",
                                  borderRadius: "20px"
                                }}>{tech.topics.length} topics</span>
                              </div>
                              <span style={{ color: roadmap.color, fontSize: "18px", fontWeight: 700, lineHeight: 1 }}>
                                {isOpen ? "−" : "+"}
                              </span>
                            </button>

                            {/* Topics List */}
                            {isOpen && (
                              <div style={{ borderTop: `1px solid ${roadmap.color}33`, padding: "12px 16px 14px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                  {tech.topics.map((topic, idx) => (
                                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                                      <span style={{
                                        background: roadmap.color,
                                        color: "white",
                                        borderRadius: "50%",
                                        width: "18px", height: "18px",
                                        fontSize: "10px", fontWeight: 700,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0, marginTop: "1px"
                                      }}>{idx + 1}</span>
                                      <span style={{ color: "inherit", opacity: 0.85, fontSize: "13px", lineHeight: 1.4 }}>{topic}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div style={{
                marginTop: "40px",
                background: `${roadmap.color}12`,
                border: `1px solid ${roadmap.color}44`,
                borderRadius: "14px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <span style={{ fontSize: "32px" }}>🎯</span>
                <div>
                  <div style={{ color: "inherit", fontWeight: 700, fontSize: "15px" }}>Ready to start your journey?</div>
                  <div style={{ color: "inherit", opacity: 0.75, fontSize: "13px", marginTop: "4px" }}>
                    Use the <strong style={{ color: roadmap.color }}>Skill Gap Analysis</strong> tool to find what you already know and what to learn next.
                  </div>
                </div>
                <button
                  onClick={() => window.location.href = "/skill-gap"}
                  style={{
                    marginLeft: "auto",
                    background: roadmap.color,
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  Analyse My Skills →
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}