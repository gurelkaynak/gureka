'use strict';

var blogJS = function blogJS(context) {

    // if the function is called without being called as a constructor,
    // then call as a constructor for us.
    if (this.__proto__.constructor !== blogJS) {
        return new blogJS(context);
    }

    this.context = context;

    this.init = function (domain, _api_source) {
        /*
         *
         * General blog parameters
         *
         * */
        var blogParams = {
            'name': "Gürel",
            'middlename': "Remzi",
            'lastname': "Kaynak",
            'api_source': function api_source() {
                return _api_source;
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
            displayName: 'Post',

            render: function render() {

                var converter = new Showdown.converter();

                rawContent = converter.makeHtml(this.props.children.toString());
                return React.createElement(
                    'div',
                    { className: bsClasses['post'] },
                    React.createElement(
                        'h1',
                        null,
                        this.props.title
                    ),
                    React.createElement('p', { dangerouslySetInnerHTML: { __html: rawContent } }),
                    React.createElement(
                        'p',
                        { className: bsClasses['post-date'] },
                        this.props.date
                    )
                );
            }
        });

        var Pagination = React.createClass({
            displayName: 'Pagination',

            render: function render() {

                var prev;
                var next;

                if (this.props.hasPrev) {
                    prev = React.createElement(
                        'a',
                        { id: 'pagination-prev', href: domain + '?page=' + this.props.prev },
                        'Daha Yeni'
                    );
                }
                if (this.props.hasNext) {
                    next = React.createElement(
                        'a',
                        { id: 'pagination-next', href: domain + '?page=' + this.props.next },
                        'Daha Eski'
                    );
                }

                return React.createElement(
                    'p',
                    null,
                    prev,
                    ' ',
                    next
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
            displayName: 'Blog',

            getInitialState: function getInitialState() {
                return {
                    posts: [],
                    prev: 1,
                    next: 1,
                    hasNext: false,
                    hasPrev: false
                };
            },
            ajaxData: function ajaxData(url) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    success: (function (data) {
                        if (this.isMounted()) {
                            if (data.results) {
                                this.setState({
                                    posts: data.results,
                                    prev: data.previous_page_number,
                                    next: data.next_page_number,
                                    hasNext: data.has_next,
                                    hasPrev: data.has_prev
                                });
                            } else {
                                this.setState({
                                    posts: [data]
                                });
                            }
                        }
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(url, status, err.toString());
                    }).bind(this)
                });
            },
            componentDidMount: function componentDidMount() {
                this.ajaxData(this.props.source);
            },
            render: function render() {
                var posts = this.state.posts.map(function (post) {
                    date = new Date(post.created_date);
                    dmyStr = date.toLocaleDateString();
                    timeStr = date.toLocaleTimeString();

                    str = dmyStr + " " + timeStr;
                    return React.createElement(
                        Post,
                        { date: str, title: post.title },
                        post.text
                    );
                });

                return React.createElement(
                    'div',
                    { className: bsClasses['container'] },
                    React.createElement(
                        'h1',
                        null,
                        [blogParams['name'] + " ", React.createElement(
                            'span',
                            { className: bsClasses['text-muted'] },
                            blogParams['middlename']
                        ), " " + blogParams['lastname'] + " Blog"]
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { className: bsClasses['row'] },
                        React.createElement(
                            'div',
                            { id: 'posts' },
                            posts
                        )
                    ),
                    React.createElement(Pagination, { prev: this.state.prev, next: this.state.next, hasNext: this.state.hasNext, hasPrev: this.state.hasPrev })
                );
            }
        });

        React.render(React.createElement(Blog, { source: blogParams['api_source']() }), document.getElementById('blog'));
    };
};