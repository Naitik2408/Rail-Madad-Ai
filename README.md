# Rail-Madad-AI

**AI-powered complaint management system for Indian Railways**  
Automates categorization, prioritization, and routing of passenger grievances using text, image, and video analysis. The system also integrates with WhatsApp via n8n for user-friendly complaint submission and future AI-based automation.

---

## 🚀 Project Overview

Rail Madad is a vital platform for passengers to report issues and seek assistance during train journeys. Currently, the process is manual and slow. **Rail-Madad-AI** aims to enhance this system by:

- Automatically categorizing complaints (coach cleanliness, damage, staff behavior, etc.)  
- Prioritizing urgent issues  
- Extracting text from images and videos using OCR  
- Providing instant feedback via AI-powered chatbots  
- Integrating WhatsApp for easy complaint submission  
- Predicting recurring issues to support proactive maintenance  
- Displaying complaints and analytics in a web dashboard

---

## 📂 Repo Structure

```
rail-madad-ai/
├── backend/           # API and AI logic (FastAPI / Node.js)
├── frontend/          # React + Tailwind dashboard
├── n8n-workflows/     # WhatsApp automation workflows (JSON)
├── dataset/           # Sample datasets for testing
├── docs/              # Documentation & diagrams
├── README.md          # Project overview (this file)
└── .gitignore         # Git ignore rules
```



---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** FastAPI / Node.js (Express)  
- **Database:** MongoDB (Atlas free tier)  
- **AI/ML:** Pretrained models (Hugging Face / TensorFlow / PyTorch), OCR (Tesseract)  
- **Automation:** n8n workflows for WhatsApp integration  
- **Deployment:** Vercel (frontend), Render/Railway (backend)

---

## 📅 Week 3 Progress (Current)

Since we’ve just started the development, **Week 3 focuses on static frontend pages** to demonstrate the UI:

1. **Home Page** – Welcome screen for passengers.  
2. **Complaint Form Page** – Static form with Name, Complaint Type, Description, and File Upload (no backend yet).  
3. **Admin Dashboard** – Dummy table showing sample complaints (static JSON).  

> These pages are deployed on **Vercel** and visible to mentors for initial progress review.

---

## 🏗 Next Steps (Week 4 Onwards)

- Week 4: Setup backend API (complaint submission + MongoDB) and deploy on Render/Railway  
- Week 5: Connect frontend → backend for end-to-end text complaints  
- Week 6: Add image upload and OCR extraction  
- Week 7: Implement AI-based complaint categorization  
- Week 8: Integrate WhatsApp complaints via n8n  
- Week 9: Build analytics dashboard for admin  
- Week 10: Testing, bug fixes, documentation, and final demo

---

## 📄 Documentation

- `docs/problem_statement.md` – Detailed problem description  
- `docs/weekly_progress.md` – Weekly updates for mentor  
- `docs/architecture.png` – System architecture diagram  

---

## 📌 Notes

- This project is fully **student-friendly and free**, using free tiers for MongoDB, Vercel, Render, and WhatsApp Cloud API.  
- Static pages are used initially to show progress. Functional backend and AI modules will be added incrementally.
