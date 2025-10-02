# Weekly Progress Report: Week 3

**Project:** Rail-Madad-AI  
**Week:** 3  
**Duration:** [Insert Week Dates]

---

## ✅ Progress Summary

This week, we focused on **frontend development** to show initial progress to mentors. Since backend and AI modules are still in planning, all pages currently use **static/dummy data**.  

**Achievements:**

1. **Home Page**
   - Created a welcome page for passengers.
   - Designed a clean UI with Tailwind CSS.
   - Static content includes project overview and navigation to other pages.

2. **Complaint Form Page**
   - Built a static form to collect complaints.
   - Form fields include:
     - Name
     - Complaint Type (dropdown)
     - Description (textarea)
     - File Upload (for images/videos)
   - Currently **no backend integration**, data submission is not functional yet.

3. **Admin Dashboard Page**
   - Created a static dashboard to display sample complaints.
   - Sample table shows complaint ID, passenger name, type, and status.
   - Designed layout to prepare for future integration with real-time backend data.

4. **Folder and Repo Setup**
   - Finalized GitHub repo structure:
     ```
     rail-madad-ai/
     │── backend/
     │── frontend/
     │── n8n-workflows/
     │── dataset/
     │── docs/
     │── README.md
     │── .gitignore
     ```
   - Uploaded initial frontend code and placeholder files for backend, n8n workflows, dataset, and documentation.

---

## 📌 Next Week Goals (Week 4)

1. Setup **backend API** for complaint submission (text only) using FastAPI or Node.js.  
2. Connect backend to **MongoDB** (Atlas free tier).  
3. Prepare endpoints for:
   - Submitting complaints  
   - Fetching complaints for admin dashboard  
4. Begin documentation of API structure in `docs/`.  

---

## 📄 Notes

- Static pages are used to demonstrate UI progress.  
- Functional backend and AI-based complaint handling will be developed in the upcoming weeks.  
- Focus on ensuring clean, modular code to allow seamless integration with AI models and WhatsApp workflows later.
