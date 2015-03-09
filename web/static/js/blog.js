/*
 *
 * General blog parameters
 *
 * */
var blogParams = {
    'name': "Gürel",
    'middlename': "Remzi",
    'lastname': "Kaynak",
    'api_source': "http://localhost:8000/api/post_list/?format=json"
};

//bootstrap classes
var bsClasses = {
    'container': 'container',
    'row': 'row',
    'text-muted': 'text-muted',
    'post-date': 'small',
    'post': 'col-md-8 col-sm-8 post'
};

/*
 *
 * Single blog post object
 *
 */
var Post = React.createClass({
    render: function(){

        var converter = new Showdown.converter();

        rawContent = converter.makeHtml(this.props.children.toString());
        return (
            <div className={bsClasses['post']}>
                <h1>{this.props.title}</h1>
                <p dangerouslySetInnerHTML={{__html: rawContent}}></p>
                <p className={bsClasses['post-date']}>{this.props.date}</p>
            </div>
        );
    }
});

var Pagination = React.createClass({
    render: function(){

        var prev;
        var next;

        if(this.props.prev){
            prev = <a id='pagination-prev' onClick={this.props.prevEvent} href='#'>Daha Yeni</a>;
        }
        if(this.props.next){
            next = <a id='pagination-next' onClick={this.props.nextEvent} href='#'>Daha Eski</a>;
        }

        return (
            <p>
                {prev} {next}
            </p>
        );
    }
});

/*
 *
 * Main blog object
 *
 * state: 
 *      posts: blog post array
 * props:
 *      source: api url
 *
 */
var Blog = React.createClass({
    getInitialState: function() {
        return {
            posts: [],
            prev: null,
            next: null
        }
    },
    ajaxData: function(url){
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                if(this.isMounted()){
                    this.setState({posts: data.results, prev: data.previous, next: data.next});
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.ajaxData(this.props.source);
    },
    handleNext: function(e) {
        e.preventDefault();
        this.ajaxData(this.state.next);
    },
    handlePrev: function(e) {
        e.preventDefault();
        this.ajaxData(this.state.prev);
    },
    render: function() {
        var posts = this.state.posts.map(function (post){
            date = new Date(post.created_date);
            dmyStr = date.toLocaleDateString();
            timeStr = date.toLocaleTimeString();

            str = dmyStr + " " + timeStr;
            return (
                <Post date={str} title={post.title}>
                    {post.text}
                </Post>
            );
        });

        return (
            <div className={bsClasses['container']}>
                <h1>{[blogParams['name'] + " ", <span className={bsClasses['text-muted']}>{blogParams['middlename']}</span>, " " + blogParams['lastname'] + " Blog"]}</h1>
                <hr />
                <div className={bsClasses['row']}>
                    <div id="posts">
                        {posts}
                    </div>
                </div>
                <Pagination prevEvent={this.handlePrev.bind(this)} nextEvent={this.handleNext.bind(this)} />
            </div>
        );
    }
});

React.render(
  <Blog source={blogParams['api_source']} />,
  document.getElementById('main')
);

