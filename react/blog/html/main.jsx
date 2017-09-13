var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    signIn() {
        axios.post('/signin', { email: this.state.email, password: this.state.password })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <form className="form-signin">
                    <h2 className="form-signin-heading"> Please sign in </h2>
                    <label for="inputEmail" className="sr-only"> Email address</label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        onChange={this.handleEmailChange}
                        required autofocus />
                    <label for="inputPassword" className="sr-only"> Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.handlePasswordChange}
                        required />
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.signIn}>
                        Sign in
                </button>
                </form>
                <div>
                    <Link to="/signup">{'Sign Up'}</Link>
                </div>
            </div>
        );
    }
}

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.state = {
            name: "",
            email: "",
            password: ""
        };
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    signUp() {
        axios.post('/signup', { name: this.state.name, email: this.state.email, password: this.state.password })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign up</h2>
                    <label for="inputName" className="sr-only">Name</label>
                    <input
                        type="name"
                        onChange={this.handleNameChange}
                        id="inputName"
                        className="form-control"
                        placeholder="Name"
                        required autofocus />
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input
                        type="email"
                        onChange={this.handleEmailChange}
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required />
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input
                        type="password"
                        onChange={this.handlePasswordChange}
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required />

                    <button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="button">
                        Sign up
                    </button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={Signin} path="/"></Route>
        <Route component={Signup} path="/signup"></Route>
    </Router>,
    document.getElementById('app')
);