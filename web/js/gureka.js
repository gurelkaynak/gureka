
/*var Post = React.createClass({*/
/*getInitialState: function() {*/
/*return {*/
/*title: '', */
/*body: ''    */
/*};*/
/*},*/

/*render: function(){*/
/*return (*/
/*<div>ho ho </div>*/
/*);*/
/*}*/
/*});*/

/*var Posts = React.createClass({*/

/*});*/

var Blog = React.createClass({
        /*componentDidMount: function() {*/
        /*$.get(this.props.source, function(result) {*/
    /*var lastGist = result[0];*/
    /*if (this.isMounted()) {*/
    /*this.setState({*/
    /*username: lastGist.owner.login,*/
    /*lastGistUrl: lastGist.html_url*/
    /*});*/
    /*}*/
    /*}.bind(this));*/
        /*},*/
    render: function() {
        return (
            <div>
               <h1>Hello Wooooo</h1>
            </div>
        );
    }
});

React.render(
  <Blog />,
  document.getElementById('main')
);
