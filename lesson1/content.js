function content() {
    var dom = document.getElementById('root');
    var content = document.createElement('div');
    content.innerText = 'content';
    dom.appendChild(content)
}

//ESModule
// export default content

// cmd
module.exports = content;