
/*var Posts = React.createClass({*/

/*});*/

var Post = React.createClass({
    render: function(){

        var classString = 'col-md-8 post';

        return (
            <div className={classString}>
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
        $.ajax({
            url: this.props.source,
            dataType: 'json',
            success: function(data) {
                this.setState({posts: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.source, status, err.toString());
            }.bind(this)
        });
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
  <Blog source="http://127.0.0.1:8000/?format=json" />,
  document.getElementById('main')
);

