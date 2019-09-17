interface IUser extends Document {
    email: string;
    password: string;
}

/*
    Register
    Endpoint: "/register"
    Method: POST
    Request body should contain an object of type IUser
*/

/*
    Email verification
    Endpoint: "/verify/:token"
    Method: PUT
*/

/*
    Login
    Endpoint: "/login"
    Method: POST
    Request body should contain an object of type IUser
    Returns x-auth-token in header
*/

/*
    Password recovery page
    Endpoint: "/forgot"
    Method: GET
    Renders a page containing a form for recovering a lost password
*/

/*
    Password recovery
    Step 1st - generate token and send e-mail
    Endpoint: "/forgot/:email"
    Method: PUT
*/

/*
    Password recovery
    Step 2nd - verify token and update password
    Endpoint: "/forgot/:token"
    Method: PUT
*/