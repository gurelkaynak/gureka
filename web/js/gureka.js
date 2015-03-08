

/*var Posts = React.createClass({*/

/*});*/

var Post = React.createClass({
    render: function(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.children}</p>
            </div>
        );
    }
});

var Blog = React.createClass({
    getInitialState: function() {
        return {
            posts: []
        }
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            console.log(result)
            this.setState({
                posts: result
            });
            this.render();
        }.bind(this));
    },
    render: function() {

        var posts = this.state.posts.map(function (post){
            return (
                <Post title={post.title}>
                    {post.text}
                </Post>
            );
        });

        return (
            <div id="posts">
                {posts}
            </div>
        );
    }
});

React.render(
  <Blog source="http://127.0.0.1:8000/.json" />,
  document.getElementById('main')
);

