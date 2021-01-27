function header() {
    var dom = document.getElementById('root');
    var header = document.createElement('div');
    header.innerText = 'header';
    dom.appendChild(header)
}

// ESModules
// export default header

// cmd
module.exports = header;