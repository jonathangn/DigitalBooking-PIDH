# Digital Booking - Front end

_Digital Booking is a web application where you can find different suppliers for your vacation or work trips, in many locations. It allows you to view and learn more about the place, check availability based on previous reservations, create an account with email confirmation, and book. As an administrator you can create new products._

<img src="https://github.com/jonathangn/jonathangn/blob/main/images/digital-booking/Screenshot_1.png" align="middle" style="float: center"/>

## Available Scripts

In the project directory, you can run:

| `npm start` | `npm test` |
| --- | --- |
| Runs the app in the dev mode.\ Open [http://localhost:3000](http://localhost:3000) to view it in your browser. | Launches the test runner in the interactive watch mode.\ See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.|

<table align="center">
<tr> 
<td>
 
 ## Run it on local

_To run the project you will need install all the dependencies of the project_

  ```sh
  npm i
  ```
  ```sh
  npm start
  ```

 <img src="https://github.com/jonathangn/jonathangn/blob/main/images/digital-booking/Screenshot_7.png"/> 
 
_The Frontend was made using the **React library**, which allows you to create reusable components at a good pace. The organization of folders allowed to maintain a clean and organized workspace, facilitating the work on each task throughout the sprints, the web application will be able to scale without any difficulty. Code integration is fast and seamless._
 
 </td><td><img src="https://github.com/jonathangn/jonathangn/blob/main/images/digital-booking/Screenshot_8.png"/><img src="https://github.com/jonathangn/jonathangn/blob/main/images/digital-booking/Screenshot_10.png"/>

 
## Environment 

This project was made with Java, Springboot, MySQL, JavaScript, React JS, Amazon EC2 y S3 and the DevOps were executed from GitLab. This application was made from scratch and now is avaible at Heroku [**here**](https://pi-digital-booking-fe.herokuapp.com).
 
Regarding the technical part, the logic was developed using the JSX Syntax, CSS and Sass. External libraries were used looking to add recurring functionality standards. Among them is SweetAlerts, Formik, Data-fns, Axios, JWT, Jest, LeafLet and others.

 </td>
</tr>
 </table>

## Project Structure

| Test | Components | Context | FuncionesJS | Helpers | Pages | Routing |
| -- | -- | -- | -- | -- | -- | -- | 

- The ***Tests*** were made with Jest and React Testing Library, fulfilling the coverage of the Frontend.
- ***Components*** It houses reusable components. Right there, a Layout renderers header and footer on pages.
- ***Context*** It allows certain pages to be rendered to which they have access, according to the user's role.
- ***Functions*** It includes functions that are reused in different pages of the project.
- ***Helpers*** Contains the API's URL created with java and deployed in AWS, now in Heroku.
- ***Pages*** Contains seven pages mandatory of the digital product and an additional _NotFound_ 
- ***Routing*** Contains all the navigation routes of the application developed with **React Router Dom**.

The reading of the token coming from the Backend was configured to render pages according to the user's role (unassigned, registered user and administrator) without affecting the UX, animations were also added in the cards and buttons.

<img src="https://github.com/jonathangn/jonathangn/blob/main/images/digital-booking/Screenshot_11.png"/>

