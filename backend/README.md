# **Medium-Like Application**

A scalable, full-stack application inspired by Medium, built using modern web technologies.

---

## **Tech Stack**

- **Frontend**: [React](https://reactjs.org/)  
- **Backend**: [Cloudflare Workers](https://developers.cloudflare.com/workers/)  
- **Validation**: [Zod](https://zod.dev/) (schema validation and type inference for frontend types)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **ORM**: [Prisma](https://www.prisma.io/) (with connection pooling)  
- **Database**: [PostgreSQL](https://www.postgresql.org/)  
- **Authentication**: [JWT](https://jwt.io/)  

---

## **Getting Started**

Follow the steps below to set up and run the application locally:

### **Prerequisites**
Ensure the following are installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- PostgreSQL database

---

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name


2. Install dependencies:
   ```bash
   npm install

3. Set up environment variables: Create a .env file in the root directory and configure the following:
   DATABASE_URL=your-database-url
   JWT_SECRET=your-jwt-secret

### **Features**
- **User Authentication**: Secure login and signup using JWT.
- **Content Management**: Create, read, update, and delete articles.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Scalable Architecture**:  Built on modern cloud technologies for high performance.


### **Running the Application**
   Development Mode
   To start the application locally:
   ```bash 
   npm run dev

