## Project Blogs API :computer:

API and database for producing content for a blog, using Node.js with the Sequelize package for implemeting CRUD operations on posts. The endpoints that were developed are connected to the database according to the principles of REST. The relationships between users and posts (login), and between posts and categories, were also implemented.

## :hammer_and_wrench: Tools

:green_circle: Javascript

:large_blue_circle: Node.js
<br>

:large_blue_circle: Sequelize
<br>

:large_blue_circle: MySQL
<br>

:large_blue_circle: JWT authentication
<br>

## :wrench:  Setup

Clone the repository:

```
git clone git@github.com:crisnabto/BlogsAPI.git
```

<details>
  <summary><strong>🐋 Running on Docker vs Locally</strong></summary><br />
  
  ## On Docker

  > :information_source: Run the `node` service with the command `docker-compose up -d`.
  
  - These services will initialize a container named `blogs_api`.
  
  - From here you can run the `trybers_and_dragons` container via CLI or open it in VS Code..
  
  > :information_source: Use the command `docker exec -it blogs_api bash`.

  - It will give you access to the interactive terminal of the container created by compose, which is running in the background.

  > :information_source:  Install dependencies [**If any**] with `npm install` 
    
  - **⚠ Attention:** If you choose to use Docker, **ALL** commands available in `package.json` (npm start, npm test, npm run dev, ...) must be executed **INSIDE** the container, i.e., in the terminal that appears after executing the `docker exec` command mentioned above. 
  
---
  
  ## Without Docker
  
  > Install dependencies [**If any**] with `npm install

  ✨ **Tip:** To run the project in this way, you must have `Node` installed on your computer.

  ✨ **Tip:** The project expects the `Node` version used to be 16.

  <br/>
</details>

