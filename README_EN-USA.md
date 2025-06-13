# DioraEDU

**DioraEDU** is an innovative educational platform designed to streamline and enhance teaching and learning processes. It provides accessible tools for students, teachers, and educational institutions. While it doesn't yet incorporate artificial intelligence, the project is built with future technological expansion in mind.

## 🚀 Overview

DioraEDU aims to:

* Centralize educational tools in a single, user-friendly platform.
* Offer an intuitive and responsive interface for all user types.
* Provide a solid technical foundation for future integrations and features.

## 🧩 Key Features

* User registration and authentication with role-based access (student, teacher, institution).
* Course, class, content, and activity management.
* Student performance tracking and feedback tools for teachers.
* Internal communication and organization among institutional members.

## 🛠️ Technologies Used

* **Frontend:** [Next.js (App Router)](https://nextjs.org/) with TypeScript and TailwindCSS.
* **Backend:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) and [Prisma ORM](https://www.prisma.io/).
* **Database:** MySQL.
* **ORM:** Prisma.
* **Environment:** Node.js 18+, npm or yarn.

---

## 📦 Requirements

* Node.js v18 or later
* MySQL Server
* Package Manager (npm or yarn)

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vitorverg97/DIORA_EDU_OFICIAL.git
cd DIORA_EDU_OFICIAL
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure the Database

1. Ensure MySQL is running on your machine.
2. Create the database:

```sql
CREATE DATABASE dioraedu;
```

3. Create a `.env` file in the root of the project and add:

```env
DATABASE_URL="mysql://root:your_password@localhost:3306/dioraedu"
JWT_SECRET="NikVergara_crazyK9"
```

4. Run Prisma setup commands:

```bash
npx prisma generate
npx prisma db push
```

> **Note:** You can optionally execute the provided `script.sql` file to populate the database with initial data.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

---

## 🧪 How to Use

1. **Login:**

   * Go to `/login` and enter your provided credentials.

2. **Manage Courses, Classes, and Activities:**

   * Use the dashboard depending on your role (student, teacher, or institution).

3. **Create and Manage Content:**

   * Teachers and institutions can add content, links, and file uploads.

4. **Complete Activities:**

   * Students can answer activities and receive automatic or teacher-provided feedback.

5. **Track Student Performance:**

   * Teachers can view performance metrics through personalized dashboards.

---

## 🌱 Future Improvements

* AI-based features for personalized learning experiences.
* Integration with third-party platforms like Google Classroom and Microsoft Teams.
* Activity recommendation engine based on user profiles.
* Certificate generation and custom report modules.

---

## 🤝 Contributing

We welcome all contributions!

1. Fork the repository.
2. Create a feature branch:
   `git checkout -b my-feature`.
3. Make your changes.
4. Submit a Pull Request explaining your updates.

---

## 📚 References

* [Next.js App Router Documentation](https://nextjs.org/docs/app)
* [Prisma ORM](https://www.prisma.io/docs)
* [Express.js](https://expressjs.com/)
* [MySQL Documentation](https://dev.mysql.com/doc/)

