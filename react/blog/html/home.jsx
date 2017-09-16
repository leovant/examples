var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

class AddPost extends React.Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.addPost = this.addPost.bind(this);

    this.state = {
      title: '',
      subject: ''
    };
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubjectChange(e) {
    this.setState({ subject: e.target.value });
  }

  addPost() {
    axios
      .post('/posts', {
        title: this.state.title,
        subject: this.state.subject
      })
      .then(function(response) {
        console.log('Response from server: ', response);
        hashHistory.push('/');
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="col-md-5">
        <div className="form-area">
          <form role="form">
            <br styles="clear:both" />
            <div className="form-group">
              <input
                type="text"
                onChange={this.handleTitleChange}
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                type="textarea"
                onChange={this.handleSubjectChange}
                className="form-control"
                id="subject"
                placeholder="Subject"
                maxlength="140"
                rows="7"
              />
            </div>
            <button
              type="button"
              onClick={this.addPost}
              id="submit"
              name="submit"
              className="btn btn-primary pull-right"
            >
              Add Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

class ShowPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    var self = this;

    axios
      .get('/posts')
      .then(function(response) {
        self.setState({ posts: response.data });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="list-group">
        {this.state.posts.map(function(post, index) {
          return (
            <a href="#" key={index} className="list-group-item">
              <h4 className="list-group-item-heading">{post.title}</h4>
              <p className="list-group-item-text">{post.subject}</p>
            </a>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={ShowPost} path="/" />
    <Route component={AddPost} path="/addPost" />
  </Router>,
  document.getElementById('app')
);
