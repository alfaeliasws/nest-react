# Documentation Readme

* Create Database First using SQL command inside create_database
* Move .env.nest.example to nest folder and change the file name to .env
  * If you choose to use the same .env credentials here are the spec of what is inside the env:
    * Database: MySQL
    * Username: Root
    * Password: 
    * DB Port: 3306
    * DB Name: nest_react
* ```npm i``` for all the dependencies to be installed
* Migrate first to your own database (I am using prisma) by using this command ```npx prisma migrate dev```
* For react app (front end) I am using vite and the env is in this same doc (.env.react.example) just rename it to .env
* PORT usage:
  * nest (build): 3000
  * react-vite: 5173
  * mysql: 3306
* All the API spec written in this doc folder
* There are faker database sql that is present for the dummy data that could be used for testing
* There are unit tests to for backend, but I make it so every test run it would wipe out the DB first to ensure data to be right
  * I recommend to use test suite separately by using this command:
    ```npm test -- admin.spec.ts``` and ```npm test -- headliner.spec.ts```
    * Using both of them in normal ```npm test``` will make the test failed (mostly because of the order of delete and create admin/headline due to primary constraint)
* Important Credentials that you can use
  * Admin login
    * username: test
    * password: test
    * token (if-needed): cede6fd1-3645-4ed0-950d-ae50bf65590c
* For headliners you can play it around (2 fields and it is not constrained by any topics), for the faker mainly I put programming world headline
* The Relation in this database is admin to headline and vice versa as it is describe in prisma schema
* Actually I want to make report/log app but for it to be more general so everyone can understand, I just make it as a headliner app, the reason is -- as we need to see what is consumed by people right now -- it is because so many demand of headline news portal in social media right now
* The UI I make it simple using ShadCN-Tailwind so it is easy to understand
* The Challange is using NestJS which I have been long not using, and the real challange is the communication between API that should be checked (I found sometimes Nest JS doesn't receive my JSON body well)
* It may need more improvement, but I have worked on it more than 15 hours, so I appreciate if we could communicate better in the future



