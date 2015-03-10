var blogJS = function(context){

    // if the function is called without being called as a constructor,
    // then call as a constructor for us.
    if (this.__proto__.constructor !== blogJS) {
        return new blogJS(context);
    }

    this.context = context;

    this.init = function(domain, api_source){
        /*
         *
         * General blog parameters
         *
         * */
        var blogParams = {
            'name': "Gürel",
            'middlename': "Remzi",
            'lastname': "Kaynak",
            'api_source': function () { 
                return api_source;
            }
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

                if(this.props.hasPrev){
                    prev = <a id="pagination-prev" href={domain  + '?page=' + this.props.prev}>Daha Yeni</a>;
                }
                if(this.props.hasNext){
                    next = <a id="pagination-next" href={domain + '?page=' + this.props.next}>Daha Eski</a>;
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
                    prev: 1,
                    next: 1,
                    hasNext: false,
                    hasPrev: false,
                }
            },
            ajaxData: function(url){
                $.ajax({
                    url: url,
                    dataType: 'json',
                    success: function(data) {
                        if(this.isMounted()){
                            this.setState({
                                posts: data.results, 
                                prev: data.previous_page_number, 
                                next: data.next_page_number,
                                hasNext: data.has_next,
                                hasPrev: data.has_prev
                            });
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
                        <Pagination prev={this.state.prev} next={this.state.next} hasNext={this.state.hasNext} hasPrev={this.state.hasPrev} />
                    </div>
                );
            }
        });

        React.render(
          <Blog source={blogParams['api_source']()} />,
          document.getElementById('main')
        );
    }
};
