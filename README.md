# IdeaVault - Full-Stack Application

IdeaVault is an innovative platform where users can share their new ideas, view trending ideas, and engage in discussions through comments.

## 🚀 Overview
This project is built using the **MERN Stack** (MongoDB, Express.js, Next.js, Node.js). It features JWT-based secure authentication and real-time data management.

## 🛠 Tech Stack
- **Frontend:** Next.js, Tailwind CSS, HeroUI, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Jose (JWT Verification)
- **Deployment:** [Insert your live link URL here]

## 📋 API Endpoints

### Ideas API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/ideas` | Get all ideas (includes search and filter) |
| `GET` | `/trendingIdea` | List of top 6 trending ideas |
| `GET` | `/trendingIdea/:id` | Get details of a specific idea |
| `POST` | `/trendingIdea` | Add a new idea (Protected) |
| `GET` | `/my-ideas/:email` | Get user's own ideas (Protected) |
| `PATCH` | `/my-ideas/:email/:id` | Update an existing idea |
| `DELETE` | `/my-ideas/:email/:id` | Delete an idea |

### Comments API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/all-comments/:ideaId` | Get all comments for a specific idea |
| `POST` | `/add-comment` | Post a new comment |
| `PATCH` | `/all-comments/:commentId` | Update a comment |
| `DELETE` | `/all-comments/:id` | Delete a comment |

## ⚙️ Environment Variables
To run this project locally, set up the following variables in your `.env` file:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
CLIENT_URL=your_frontend_url


📦 How to Run Locally
Clone the repository:

Bash
git clone [https://github.com/moajjem441/ideavault-client-server.git](https://github.com/moajjem441/ideavault-client-server.git)
Navigate into the folder:

Bash
cd ideavault-client-server
Install dependencies:

Bash
npm install
Configure your .env file.

Start the server:

Bash
npm start


👤 Author
[Moajjem Hossain]

https://github.com/moajjem441

[https://www.linkedin.com/in/moajjem-hossain-]

If you find this project helpful, please give it a star! ⭐


---

### Next steps:
1. Replace `[Your Name]` and `[Insert your live link URL here]` with your actual information.
2. Save the file.
3. Open your terminal and run these commands to push the update:
   ```bash
   git add README.md
   git commit -m "Add professional README"
   git push origin main