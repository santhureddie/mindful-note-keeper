# 📝 Mindful Note Keeper
Mindful Note Keeper is a modern, minimalist note-taking web application designed to help users capture thoughts, ideas, and tasks with ease. Built with a focus on simplicity and responsiveness, it ensures a seamless user experience across devices.

## 🚀 Live Demo
Experience the application live at: https://santhureddie.github.io/mindful-note-keeper/

## 🛠️ Technologies Used
- **React:** Front-end library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static typing.
- **Vite:** Next-generation frontend tooling for fast development.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Supabase:** Backend-as-a-Service providing authentication and database services.

## 📁 Project Structure
```


mindful-note-keeper/
├── .github/             # GitHub workflows
├── public/              # Static assets
├── src/                 # Source code
├── supabase/            # Supabase configuration and migrations
├── .gitignore           # Git ignore rules
├── README.md            # Project documentation
├── bun.lockb            # Bun package manager lock file
├── components.json      # Component configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # Entry HTML file
├── package-lock.json    # NPM lock file
├── package.json         # Project metadata and dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.app.json    # TypeScript app configuration
├── tsconfig.json        # Base TypeScript configuration
├── tsconfig.node.json   # TypeScript Node.js configuration
└── vite.config.ts       # Vite configuration
```
## ⚙️ Getting Started
To set up and run the project locally:

### Prerequisites
- **Node.js:** Ensure you have Node.js installed. Download it from https://nodejs.org/.
- **Bun:** This project uses Bun as the package manager. Install it from https://bun.sh/.

### Installation
#### Clone the repository:
```
git clone https://github.com/santhureddie/mindful-note-keeper.git
cd mindful-note-keeper
```
#### Install dependencies:
```
bun install
```
#### Set up environment variables:

Create a .env file in the root directory and add the necessary environment variables. 

Refer to the Supabase documentation for required variables.

#### Start the development server:
```
bun run dev
```
The application will be available at http://localhost:5173/ by default.

## 🧩 Features
- **User Authentication:** Secure login and registration using Supabase.
- **Responsive Design:** Optimized for various devices and screen sizes.
- **Real-time Updates:** Live note synchronization across sessions.
- **Minimalist UI:** Clean and distraction-free interface for focused note-taking.
- **Dark Mode:** Toggle between light and dark themes for comfortable viewing.

## 📦 Deployment
The application is deployed using GitHub Pages. To deploy your own version:

### Build the application:
```
bun run build
```
### Deploy to GitHub Pages:

Ensure the homepage field in your package.json is set to your GitHub Pages URL, e.g., https://yourusername.github.io/mindful-note-keeper/.

### Then, push the dist folder to the gh-pages branch:
```
git subtree push --prefix dist origin gh-pages
```
Note: For custom domain support, consider deploying with platforms like Netlify or Vercel.

## 📄 License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

## 👨‍💻 Author
 Santhosh Kumar Reddy Jampana
 
 [GitHub Profile](https://github.com/santhureddie)
